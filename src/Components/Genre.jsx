import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Flex,
  Grid,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import HomeShowItem from './HomeShowItem';
import { fetchGenreListData } from '../Actions';
import FavouriteNotification from './FavouriteNotification';
import discoveryPlusApi from '../Api';

function Genre() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const genreId = useParams().genreId;
  const genreShowListData = useSelector(state => state.genreShowListData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(genreShowListData[genreId])) {
      dispatch(fetchGenreListData(genreId));
    }
  }, [dispatch, genreId, genreShowListData]);

  const userData = useSelector(state => state.userProfile);
  const [favouritesContent, setFavouritesContent] = useState({});
  const [updatePending, setUpdatePending] = useState(false);
  const [displayFavouriteNotification, setDisplayFavouriteNotification] =
    useState({ show: false, operation: '' });

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const { data } = await discoveryPlusApi(`/users/${userData.id}`);
        // console.log(data);
        setFavouritesContent(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isEmpty(userData)) {
      fetchFavourites();
    }
  }, [userData]);

  const checkIsFavouriteShow = useCallback(
    showId => {
      return favouritesContent['favourite_shows'].some(
        item => item.id === showId
      );
    },
    [favouritesContent]
  );

  useEffect(() => {
    const updateUserFavourites = () => {
      discoveryPlusApi
        .delete(`/users/${userData['id']}`)
        .then(response => {
          if (response.status === 200) {
            return discoveryPlusApi.post('/users', favouritesContent);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setUpdatePending(false));
    };

    if (updatePending) {
      updateUserFavourites();
    }
  }, [userData, favouritesContent, updatePending]);

  useEffect(() => {
    const timeout = setTimeout(
      () => setDisplayFavouriteNotification({ show: false, operation: '' }),
      1200
    );

    return () => clearTimeout(timeout);
  }, [displayFavouriteNotification]);

  const toggleFavouriteShow = useCallback(
    showId => {
      if (isEmpty(userData)) return;

      const alreadyFavourited = favouritesContent['favourite_shows'].some(
        item => item.id === showId
      );

      if (alreadyFavourited) {
        // Remove from favourites
        setFavouritesContent(prevState => {
          return {
            ...prevState,
            favourite_shows: prevState.favourite_shows.filter(
              item => item.id !== showId
            ),
          };
        });

        // Toggle remove from favourite notification
        setDisplayFavouriteNotification({ show: true, operation: 'remove' });
      } else {
        // Add to favourites
        const favouriteShow = genreShowListData[genreId].find(
          item => item.id === showId
        );

        setFavouritesContent(prevState => {
          return {
            ...prevState,
            favourite_shows: [...prevState.favourite_shows, favouriteShow],
          };
        });

        // Toggle add to favourite notification
        setDisplayFavouriteNotification({ show: true, operation: 'add' });
      }

      setUpdatePending(true);
    },
    [genreId, genreShowListData, favouritesContent, userData]
  );

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingTop={isMobile ? '60px' : '20px'}
    >
      {/* Add/Remove Favourite notification */}
      {displayFavouriteNotification['show'] && (
        <FavouriteNotification
          operation={displayFavouriteNotification['operation']}
        />
      )}

      <Text fontSize="22px" fontWeight="500" lineHeight="1.1" paddingX="20px">
        Shows
      </Text>

      {isEmpty(genreShowListData[genreId]) ? (
        <Flex
          minWidth="100vw"
          height="400px"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" speed="0.56s" />
        </Flex>
      ) : (
        <Grid
          width="100%"
          height="100%"
          paddingY="10px"
          paddingX={isMobile ? '12px' : '30px'}
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap={isMobile ? '12px' : '16px'}
          gridRowGap={isMobile ? '12px' : '18px'}
        >
          {genreShowListData[genreId].map((showData, index) => (
            <Link to={`/show/${showData.id}`} as={ReactRouterLink} key={index}>
              <HomeShowItem
                {...showData}
                isFavourite={
                  isEmpty(favouritesContent)
                    ? false
                    : checkIsFavouriteShow(showData['id'])
                }
                toggleFavouriteShow={toggleFavouriteShow}
                isChannelPageMobileView={true}
              />
            </Link>
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default Genre;

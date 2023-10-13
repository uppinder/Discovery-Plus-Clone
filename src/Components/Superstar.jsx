import React, { useCallback, useEffect, useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchSuperstarData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowItem from './ShowItem';
import discoveryPlusApi from '../Api';
import FavouriteNotification from './FavouriteNotification';

function Superstar() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { pathname } = useLocation();
  const superstarId = pathname.split('/').at(-1);

  const superstarData = useSelector(state => state.superstars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(superstarData[superstarId]) && !isEmpty(superstarId)) {
      dispatch(fetchSuperstarData(superstarId));
    }
  }, [dispatch, superstarData, superstarId]);

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

  const checkIsFavouriteEpisode = useCallback(
    episodeId => {
      return favouritesContent['favourite_episodes'].some(
        item => item.id === episodeId
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

  const toggleFavouriteEpisode = episodeId => {
    if (isEmpty(userData)) return;

    const alreadyFavourited = favouritesContent['favourite_episodes'].some(
      item => item.id === episodeId
    );

    if (alreadyFavourited) {
      // Remove from favourites
      setFavouritesContent(prevState => {
        return {
          ...prevState,
          favourite_episodes: prevState.favourite_episodes.filter(
            item => item.id !== episodeId
          ),
        };
      });

      // Toggle remove from favourite notification
      setDisplayFavouriteNotification({ show: true, operation: 'remove' });
    } else {
      // Add to favourites
      const favouriteEpisode = superstarData[superstarId].find(
        item => item.id === episodeId
      );

      setFavouritesContent(prevState => {
        return {
          ...prevState,
          favourite_episodes: [
            ...prevState.favourite_episodes,
            favouriteEpisode,
          ],
        };
      });

      // Toggle add to favourite notification
      setDisplayFavouriteNotification({ show: true, operation: 'add' });
    }

    setUpdatePending(true);
  };

  if (superstarId === 'fukrey-boys') {
    return (
      <Flex>
        <Image
          src="https://ap2-prod-images.disco-api.com/2021/02/10/ee6a9b9e-f306-471a-b9bc-ec60f876a863.png?bf=0&f=jpg&p=true&q=85&w=900"
          objectPosition="center top"
          width="100%"
        />
      </Flex>
    );
  } else if (isEmpty(superstarData[superstarId])) {
    return (
      <Flex
        minWidth="100vw"
        height="400px"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" speed="0.56s" />
      </Flex>
    );
  } else {
    return (
      <Flex
        width="100%"
        flexDirection="column"
        paddingX="15px"
        paddingY={isMobile ? '0px' : '20px'}
        marginBottom={isMobile ? '0px' : '25px'}
        gap={isMobile ? '5px' : '20px'}
      >
        {/* Add/Remove Favourite notification */}
        {displayFavouriteNotification['show'] && (
          <FavouriteNotification
            operation={displayFavouriteNotification['operation']}
          />
        )}

        <Text
          fontSize="20px"
          fontWeight="500"
          lineHeight="1.1"
          textTransform="capitalize"
        >
          {superstarId.split('-').join(' ') + ' videos'}
        </Text>
        <Grid
          width="100%"
          height="100%"
          paddingX={isMobile ? '0px' : '10px'}
          gridTemplateColumns={{
            base: 'repeat(1, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap="12px"
          gridRowGap={isMobile ? '0px' : '85px'}
        >
          {superstarData[superstarId].map((episodeData, id) => (
            <Link
              key={id}
              as={ReactRouterLink}
              to={`/video/${superstarId}/${episodeData.id}`}
              position="relative"
              height={isMobile ? null : '190px'}
              _hover={{ textDecoration: 'none' }}
            >
              <ShowItem
                {...episodeData}
                isFavourite={
                  isEmpty(favouritesContent)
                    ? false
                    : checkIsFavouriteEpisode(episodeData['id'])
                }
                toggleFavouriteEpisode={toggleFavouriteEpisode}
                isShowPageMobileView={isMobile}
                timeOverlay={true}
              />
            </Link>
          ))}
        </Grid>
      </Flex>
    );
  }
}

export default Superstar;

import React, { useCallback, useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchHomeData } from '../Actions';

import {
  Flex,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';
import GenreCarousel from './GenreCarousel';
import FavouriteNotification from './FavouriteNotification';
import discoveryPlusApi from '../Api';

function Home() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const homeData = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(homeData)) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, homeData]);

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

  const toggleFavouriteShow = showId => {
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
      const homeShowList = homeData['homeShowLists'].find(homeShowListData => {
        return homeData[homeShowListData['id']].find(
          item => item.id === showId
        );
      });

      const favouriteShow = homeData[homeShowList['id']].find(
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
  };

  if (isEmpty(homeData)) {
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
      <Flex minWidth="100vw" flexDirection="column">
        {/* Add/Remove Favourite notification */}
        {displayFavouriteNotification['show'] && (
          <FavouriteNotification
            operation={displayFavouriteNotification['operation']}
          />
        )}

        <ShowCarousel carouselData={homeData['homeCarouselShowsList']} />
        <GenreCarousel genreDataList={homeData['homeGenreList']} />

        {homeData['homeShowLists'].map((homeShowListData, _) => (
          <Flex
            key={homeShowListData['id']}
            width="100%"
            flexDirection="column"
            paddingTop={isMobile ? '0px' : '22px'}
            paddingBottom={isMobile ? '0px' : '22px'}
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              paddingBottom={isMobile ? '8px' : '12px'}
              paddingLeft={isMobile ? '10px' : '16px'}
              paddingRight={isMobile ? '15px' : '24px'}
            >
              <Text
                fontSize={isMobile ? '18px' : '22px'}
                fontWeight="600"
                lineHeight="1.4"
              >
                {homeShowListData['title']}
              </Text>
              <Link
                to={`/collection-view-all?id=${homeShowListData['id']}`}
                as={ReactRouterLink}
                color="#838991"
                fontSize={isMobile ? '16px' : '18px'}
                _hover={{ textDecoration: 'none', color: 'white' }}
              >
                View All
              </Link>
            </Flex>

            {isMobile ? (
              <Flex
                width="100%"
                height="100%"
                paddingX="10px"
                gap="10px"
                overflowY="hidden"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '0', // Adjust the width as needed
                  },
                }}
              >
                {homeData[homeShowListData['id']].map((showData, _) => (
                  <Link
                    key={showData['id']}
                    to={`/show/${showData['id']}`}
                    as={ReactRouterLink}
                    position="relative"
                    minWidth={
                      homeShowListData['showCardOrientation'] === 'horizontal'
                        ? '160px'
                        : '105px'
                    }
                    height={
                      homeShowListData['showCardOrientation'] === 'horizontal'
                        ? '100px'
                        : '140px'
                    }
                  >
                    {homeShowListData['showCardOrientation'] ===
                    'horizontal' ? (
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
                    ) : (
                      <HomeShowItemVertical
                        {...showData}
                        isFavourite={
                          isEmpty(favouritesContent)
                            ? false
                            : checkIsFavouriteShow(showData['id'])
                        }
                        toggleFavouriteShow={toggleFavouriteShow}
                      />
                    )}
                  </Link>
                ))}
              </Flex>
            ) : (
              <Flex width="100%" height="100%" paddingX="20px" gap="10px">
                {homeData[homeShowListData['id']]
                  .slice(
                    0,
                    homeShowListData['showCardOrientation'] === 'horizontal'
                      ? 4
                      : 6
                  )
                  .map((showData, _) => (
                    <Link
                      key={showData['id']}
                      to={`/show/${showData['id']}`}
                      as={ReactRouterLink}
                      position="relative"
                      width="100%"
                    >
                      {homeShowListData['showCardOrientation'] ===
                      'horizontal' ? (
                        <HomeShowItem
                          {...showData}
                          isFavourite={
                            isEmpty(favouritesContent)
                              ? false
                              : checkIsFavouriteShow(showData['id'])
                          }
                          toggleFavouriteShow={toggleFavouriteShow}
                        />
                      ) : (
                        <HomeShowItemVertical
                          {...showData}
                          isFavourite={
                            isEmpty(favouritesContent)
                              ? false
                              : checkIsFavouriteShow(showData['id'])
                          }
                          toggleFavouriteShow={toggleFavouriteShow}
                        />
                      )}
                    </Link>
                  ))}
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    );
  }
}

export default Home;

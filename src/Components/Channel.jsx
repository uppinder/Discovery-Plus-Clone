import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannelListData, updateChannelCarouselData } from '../Actions';

import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import {
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import channelImage from '../Assets/Images/channel_image.svg';
import HomeShowItem from './HomeShowItem';
import ChannelCarousel from './ChannelCarousel';
import discoveryPlusApi from '../Api';
import FavouriteNotification from './FavouriteNotification';

function Channel() {
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const channelIdPattern = new RegExp('^/channel/[A-Za-z0-9-_]+$');
  const isChannelPage = channelIdPattern.test(location.pathname);
  const isChannelPageMobileView = isChannelPage && isMobile;

  const channelId = useParams().channelId;
  const channelCarouselData = useSelector(state => state.channelCarouselData);
  const channelShowListData = useSelector(state => state.channelShowListData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateChannelCarouselData(channelId));
    if (isEmpty(channelShowListData[channelId])) {
      dispatch(fetchChannelListData(channelId));
    }
  }, [dispatch, channelId, channelShowListData]);

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
      const favouriteShow = channelShowListData[channelId].find(
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

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      paddingTop={isChannelPageMobileView ? '0px' : '20px'}
      paddingBottom="20px"
    >
      {/* Add/Remove Favourite notification */}
      {displayFavouriteNotification['show'] && (
        <FavouriteNotification
          operation={displayFavouriteNotification['operation']}
        />
      )}

      <Flex
        flexDirection="column"
        width={isChannelPageMobileView ? '100%' : '80%'}
        backgroundColor={isChannelPageMobileView ? '#121317' : '#1a1c21'}
        gap={isChannelPageMobileView ? '12px' : '20px'}
        position={isChannelPageMobileView ? 'sticky' : null}
        top={isChannelPageMobileView ? '0' : null}
        zIndex={isChannelPageMobileView ? '9' : null}
      >
        <Flex
          width="100%"
          height={isChannelPageMobileView ? '300px' : '600px'}
          backgroundColor="black"
          justifyContent={isChannelPageMobileView ? 'center' : 'center'}
          alignItems="center"
        >
          <Flex gap="10px">
            {!isChannelPageMobileView && (
              <Image
                src={channelImage}
                height={isChannelPageMobileView ? '200px' : '280px'}
              />
            )}
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems={isChannelPageMobileView ? 'center' : null}
              gap="12px"
              width="100%"
            >
              <Text
                fontWeight="600"
                fontSize={isChannelPageMobileView ? '20px' : '24px'}
                textAlign={isChannelPageMobileView ? 'center' : null}
              >
                You will need to be a premium member to watch this video.
              </Text>
              <Link
                to="/go-premium-web"
                as={ReactRouterLink}
                backgroundColor="rgb(39, 137, 255)"
                width="fit-content"
                padding="10px 20px"
                borderRadius="10px"
                fontWeight="500"
                fontSize="15px"
                _hover={{ textDecoration: 'none', color: 'black' }}
              >
                GO PREMIUM
              </Link>
            </Flex>
          </Flex>
        </Flex>

        <Text
          fontSize="24px"
          fontWeight="500"
          lineHeight="1.1"
          paddingX={isChannelPageMobileView ? '6px' : '0'}
        >
          {channelCarouselData[0]['title']}
        </Text>

        {isChannelPageMobileView && <Divider width="95%" marginX="auto" />}

        {isChannelPageMobileView && (
          <Flex
            width="100vw"
            paddingX="10px"
            overflowX="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {channelCarouselData.map((channelItem, index) => (
              <Link
                key={index}
                to={`/channel/${channelItem.id}`}
                as={ReactRouterLink}
                position="relative"
                minWidth="80px"
                paddingBottom="20px"
                borderBottom={index === 0 ? '4px solid #2175d9' : null}
              >
                <Flex height="100%" flexDirection="column" alignItems="center">
                  <Image
                    src={channelItem.thumbnailMobile}
                    width="70px"
                    height="70px"
                  />
                </Flex>
              </Link>
            ))}
          </Flex>
        )}
      </Flex>

      {!isChannelPageMobileView && (
        <ChannelCarousel channelCarouselData={channelCarouselData} />
      )}

      <Flex
        width="100%"
        flexDirection="column"
        marginTop="20px"
        paddingX="1%"
        gap="12px"
      >
        <Text fontSize="20px" fontWeight="600" lineHeight="1.1">
          {channelCarouselData[0]['title']} Shows
        </Text>

        {isEmpty(channelShowListData[channelId]) ? (
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
            paddingX={isChannelPageMobileView ? '5px' : '20px'}
            gridTemplateColumns={{
              base: 'repeat(2, minmax(0, 100%))',
              lg: 'repeat(3, minmax(0, 100%))',
              xl: 'repeat(4, minmax(0, 100%))',
            }}
            gridColumnGap={isChannelPageMobileView ? '13px' : '16px'}
            gridRowGap={isChannelPageMobileView ? '10px' : '20px'}
          >
            {channelShowListData[channelId].map((showData, index) => (
              <Link
                key={index}
                to={`/show/${showData.id}`}
                as={ReactRouterLink}
                position="relative"
              >
                <HomeShowItem
                  {...showData}
                  isFavourite={
                    isEmpty(favouritesContent)
                      ? false
                      : checkIsFavouriteShow(showData['id'])
                  }
                  toggleFavouriteShow={toggleFavouriteShow}
                  isChannelPageMobileView={isChannelPageMobileView}
                />
              </Link>
            ))}
          </Grid>
        )}
      </Flex>
    </Flex>
  );
}

export default Channel;

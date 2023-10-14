import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import discoveryPlusApi from '../Api';

import {
  Flex,
  Grid,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowItem from './ShowItem';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react';

import noContentDesktop from '../Assets/Images/favourites_none.svg';
import noContentMobile from '../Assets/Images/favourite_no_mobile.svg';

const NoContent = ({ section = '' }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="15px"
    >
      {isMobile ? (
        <>
          <Image src={noContentMobile} />
          <Text fontWeight="500" textAlign="center">
            Shows, Episodes and Shorts that you liked can be found here.
          </Text>
        </>
      ) : (
        <>
          <Image src={noContentDesktop} marginTop="50px" />
          <Text fontWeight="500" textAlign="center" marginBottom="50px">
            Find all the {section} that you have liked at one place.
          </Text>
        </>
      )}
    </Flex>
  );
};

function Favourites() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const navigate = useNavigate();
  const userData = useSelector(state => state.userProfile);
  const [favouritesContent, setFavouritesContent] = useState({});
  const [updatePending, setUpdatePending] = useState(false);

  useEffect(() => {
    if (isEmpty(userData)) {
      navigate('/login');
    }
  }, [navigate, userData]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const { data } = await discoveryPlusApi(`/users/${userData.id}`);
        // console.log(data);
        setFavouritesContent(data);
      } catch (error) {
        if (error.response.status === 404) {
          navigate('/home');
        } else {
          console.log(error);
        }
      }
    };

    if (!isEmpty(userData)) {
      fetchFavourites();
    }
  }, [navigate, userData]);

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

  const removeFavouriteEpisode = episodeId => {
    setFavouritesContent(prevState => {
      return {
        ...prevState,
        favourite_episodes: prevState.favourite_episodes.filter(
          item => item.id !== episodeId
        ),
      };
    });

    setUpdatePending(true);
  };

  const removeFavouriteShow = showId => {
    setFavouritesContent(prevState => {
      return {
        ...prevState,
        favourite_shows: prevState.favourite_shows.filter(
          item => item.id !== showId
        ),
      };
    });

    setUpdatePending(true);
  };

  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      paddingX={isMobile ? '0px' : '40px'}
      paddingTop="24px"
      gap="20px"
    >
      {!isMobile && (
        <Text color="#d6dce4" fontSize="24px" fontWeight="500">
          Favourites
        </Text>
      )}

      <Tabs align="start" isFitted={isMobile}>
        <TabList
          width="100%"
          color="#9ba1a9"
          border="transparent"
          gap="24px"
          borderBottom="1px solid #282d33"
          paddingBottom="1px"
          backgroundColor="#1a1c21"
          position={isMobile ? 'fixed' : null}
          top={isMobile ? '80px' : null}
          zIndex={isMobile ? '9' : null}
        >
          <Tab
            paddingX="0"
            fontSize="18px"
            fontWeight="700"
            _selected={{
              borderColor: 'white',
              color: 'white',
            }}
            _hover={{ color: 'white' }}
          >
            Episodes
          </Tab>
          <Tab
            paddingX="0"
            fontSize="18px"
            fontWeight="700"
            _selected={{
              borderColor: 'white',
              color: 'white',
            }}
            _hover={{ color: 'white' }}
          >
            Shows
          </Tab>
          <Tab
            paddingX="0"
            fontSize="18px"
            fontWeight="700"
            _selected={{
              borderColor: 'white',
              color: 'white',
            }}
            _hover={{ color: 'white' }}
          >
            Shorts
          </Tab>
        </TabList>

        <TabPanels paddingTop={isMobile ? '30px' : '20px'}>
          {/* Episodes */}
          <TabPanel paddingX={isMobile ? '6px' : '0'}>
            {isEmpty(favouritesContent) ? (
              <Flex
                minWidth="100vw"
                height="400px"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size="xl" speed="0.56s" />
              </Flex>
            ) : isEmpty(favouritesContent['favourite_episodes']) ? (
              <NoContent section={'Episodes'} />
            ) : (
              <Grid
                width="100%"
                height="100%"
                gridTemplateColumns={{
                  base: 'repeat(1, minmax(0, 100%))',
                  md: 'repeat(3, minmax(0, 100%))',
                  lg: 'repeat(4, minmax(0, 100%))',
                  xl: 'repeat(5, minmax(0, 100%))',
                }}
                gridColumnGap="10px"
                gridRowGap={isMobile ? '2px' : '48px'}
              >
                {favouritesContent['favourite_episodes'].map(
                  (episodeData, index) => (
                    <Flex key={index} position="relative">
                      <Link
                        to={
                          episodeData['id'].startsWith('/videos/')
                            ? episodeData['id'].replace('/videos/', '/video/')
                            : `/video/${episodeData['showId']}/${episodeData['id']}`
                        }
                        as={ReactRouterLink}
                        key={index}
                        position="relative"
                        height={isMobile ? null : '190px'}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <ShowItem
                          {...episodeData}
                          isFavourite={true}
                          isShowPageMobileView={isMobile}
                          timeOverlay={true}
                          removefromFavourites={removeFavouriteEpisode}
                        />
                      </Link>
                      {isMobile && (
                        <Menu>
                          <MenuButton
                            size={20}
                            as={IconButton}
                            icon={
                              <DotsThreeOutlineVertical
                                size={24}
                                color="#9b9b9b"
                                weight="fill"
                              />
                            }
                            variant="unstyled"
                            position="absolute"
                            top="6px"
                            right="0"
                          />
                          <MenuList
                            backgroundColor="#121317"
                            minWidth="120px"
                            borderRadius="0px"
                            paddingY="4px"
                          >
                            <MenuItem
                              backgroundColor="#121317"
                              fontSize="14px"
                              onClick={() =>
                                removeFavouriteEpisode(episodeData['id'])
                              }
                            >
                              Remove from Favourite
                            </MenuItem>
                            <MenuItem backgroundColor="#121317" fontSize="14px">
                              Share
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      )}
                    </Flex>
                  )
                )}
              </Grid>
            )}
          </TabPanel>

          {/* Shows */}
          <TabPanel paddingX={isMobile ? '6px' : '0'}>
            {isEmpty(favouritesContent) ? (
              <Flex
                minWidth="100vw"
                height="400px"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner size="xl" speed="0.56s" />
              </Flex>
            ) : isEmpty(favouritesContent['favourite_shows']) ? (
              <NoContent section={'Shows'} />
            ) : (
              <Grid
                width="100%"
                height="100%"
                gridTemplateColumns={{
                  base: 'repeat(1, minmax(0, 100%))',
                  md: 'repeat(3, minmax(0, 100%))',
                  lg: 'repeat(4, minmax(0, 100%))',
                  xl: 'repeat(5, minmax(0, 100%))',
                }}
                gridColumnGap="10px"
                gridRowGap={isMobile ? '2px' : '48px'}
              >
                {favouritesContent['favourite_shows'].map((showData, index) => (
                  <Flex key={index} position="relative">
                    <Link
                      key={index}
                      to={`/show/${showData['id']}`}
                      as={ReactRouterLink}
                      position="relative"
                      height={isMobile ? null : '190px'}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <ShowItem
                        {...showData}
                        isFavourite={true}
                        isShowPageMobileView={isMobile}
                        timeOverlay={true}
                        removefromFavourites={removeFavouriteShow}
                      />
                    </Link>
                    {isMobile && (
                      <Menu>
                        <MenuButton
                          size={20}
                          as={IconButton}
                          icon={
                            <DotsThreeOutlineVertical
                              size={24}
                              color="#9b9b9b"
                              weight="fill"
                            />
                          }
                          variant="unstyled"
                          position="absolute"
                          top="6px"
                          right="0"
                        />
                        <MenuList
                          backgroundColor="#121317"
                          minWidth="120px"
                          borderRadius="0px"
                          paddingY="4px"
                        >
                          <MenuItem
                            backgroundColor="#121317"
                            fontSize="14px"
                            onClick={() => removeFavouriteShow(showData['id'])}
                          >
                            Remove from Favourite
                          </MenuItem>
                          <MenuItem backgroundColor="#121317" fontSize="14px">
                            Share
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </Flex>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Shorts */}
          <TabPanel paddingX="0">
            <NoContent section={'Shorts'} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Favourites;

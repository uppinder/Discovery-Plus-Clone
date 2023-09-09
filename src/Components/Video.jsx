import {
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import showImage from '../Assets/Images/show_image.jpeg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import { DotOutline, Heart, Play, ShareNetwork } from '@phosphor-icons/react';
import ShowItem from './ShowItem';
import HomeShowItem from './HomeShowItem';

const HoverableButton = ({ iconType, text, isShowPageMobileView = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      gap="6px"
      width={isShowPageMobileView ? '50%' : null}
      height="fit-content"
      justifyContent="center"
      alignItems="center"
      borderRadius="4px"
      border={`1px solid ${
        isHovered ? '#d6dce4' : isShowPageMobileView ? '#383e47' : '#9ba1a9'
      }`}
      padding="8px 36px"
      cursor="pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconType === 'heart' && (
        <Heart size={20} color={isHovered ? 'white' : '#9ba1a9'} />
      )}
      {iconType === 'share' && (
        <ShareNetwork size={20} color={isHovered ? 'white' : '#9ba1a9'} />
      )}
      <Text
        color={isHovered ? 'white' : '#9ba1a9'}
        fontSize="14px"
        lineHeight="1.33"
      >
        {text}
      </Text>
    </Flex>
  );
};

function Video() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const location = useLocation();
  const showIdPattern = new RegExp('^/video/[A-Za-z0-9-_]+/[A-Za-z0-9-_]+$');
  const isShowPage = showIdPattern.test(location.pathname);
  const isShowPageMobileView = isShowPage && isMobile;

  const handleTabsChange = index => {
    console.log(index);
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Flex
        marginY="1%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={isMobile ? '100%' : '80%'}
      >
        {/* Thumbnail */}
        <Image
          src={showImage}
          borderRadius={isShowPageMobileView ? '0px' : '10px'}
          //   position={isShowPageMobileView ? 'fixed' : null}
          //   top={isShowPageMobileView ? '0' : null}
          //   zIndex={isShowPageMobileView ? '100' : null}
        />

        {/* Description */}
        <Flex
          width="100%"
          marginY="14px"
          justifyContent="space-between"
          paddingX={isShowPageMobileView ? '14px' : '0px'}
        >
          {/* Left side */}
          <Flex flexDirection="column" gap="12px" flex="1">
            <Flex alignItems="center" gap="12px">
              {!isShowPageMobileView && (
                <Image src={premiumIcon} width="30px" height="30px" />
              )}
              <Text
                fontSize={isShowPageMobileView ? '18px' : '28px'}
                color="white"
                fontWeight="600"
              >
                The Rockies
              </Text>
            </Flex>

            <Flex>
              <Flex alignItems="center" gap="6px">
                {isShowPageMobileView && (
                  <Image src={premiumIcon} width="24px" height="24px" />
                )}
                <Text color="#bfc5cd" fontWeight="500" fontSize="14px">
                  Man vs. Wild
                </Text>
              </Flex>
              <Flex alignItems="center">
                <DotOutline color="#838991" weight="fill" />
                <Text color="#bfc5cd" fontWeight="500" fontSize="14px">
                  S1 E1
                </Text>
              </Flex>
            </Flex>

            <Flex width="100%" flexDirection="column" gap="12px">
              <Text
                order={isShowPageMobileView ? '1' : '2'}
                color="#9ba1a9"
                lineHeight="1.43"
                fontWeight="500"
                fontSize={isShowPageMobileView ? '12px' : '15px'}
              >
                Bear Grylls shows how to survive the toughest and most remote
                environments.
              </Text>
            </Flex>

            {isShowPageMobileView && (
              <Flex gap="10px">
                <HoverableButton
                  iconType="heart"
                  text={'Favourite'}
                  isShowPageMobileView={true}
                />
                <HoverableButton
                  iconType="share"
                  text={'Share'}
                  isShowPageMobileView={true}
                />
              </Flex>
            )}

            <Text
              color="#9ba1a9"
              lineHeight="1.43"
              fontWeight="500"
              fontSize={isShowPageMobileView ? '12px' : '15px'}
            >
              Age Rating : UA-13+ | Contains : Frightening Scenes
            </Text>
          </Flex>

          {/* Right side */}
          {!isMobile && (
            <Flex
              flex="1"
              alignItems="flex-end"
              flexDirection="column"
              gap="15px"
            >
              <Flex gap="10px">
                <HoverableButton iconType="heart" text={'Favourite'} />
                <HoverableButton iconType="share" text={'Share'} />
              </Flex>
            </Flex>
          )}
        </Flex>

        <Divider />
        {/* Episodes */}

        <Flex width="100%">
          <Tabs align="start" isFitted={isShowPageMobileView}>
            <TabList
              color="#9ba1a9"
              border="transparent"
              gap="24px"
              //   position={isShowPageMobileView ? 'sticky' : null}
              //   top={isShowPageMobileView ? '0' : null}
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
                Shorts
              </Tab>
            </TabList>

            <TabPanels width="100%">
              <TabPanel
                paddingLeft="4px"
                paddingTop="15px"
                paddingRight="4px"
                paddingBottom="0px"
              >
                <Tabs variant="unstyled" isLazy onChange={handleTabsChange}>
                  <TabList
                    color="#838991"
                    gap="10px"
                    paddingLeft={isShowPageMobileView ? '8px' : '0'}
                    // position={isShowPageMobileView ? 'sticky' : null}
                    // top={isShowPageMobileView ? '0' : null}
                  >
                    <Tab
                      fontWeight="500"
                      padding="3px 6px"
                      fontSize="14px"
                      _selected={{
                        color: 'white',
                        bg: `${isShowPageMobileView ? '#262931' : '#545a62'}`,
                        borderRadius: '2px',
                      }}
                      _hover={{ color: 'white' }}
                    >
                      Season 1
                    </Tab>
                    <Tab
                      fontWeight="500"
                      padding="3px 6px"
                      fontSize="14px"
                      _selected={{
                        color: 'white',
                        bg: `${isShowPageMobileView ? '#262931' : '#545a62'}`,
                        borderRadius: '2px',
                      }}
                      _hover={{ color: 'white' }}
                    >
                      Season 2
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel paddingX={isShowPageMobileView ? '6px' : '0'}>
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
                        gridRowGap={isShowPageMobileView ? '2px' : '16px'}
                      >
                        {Array(15)
                          .fill(null)
                          .map((_, index) => (
                            <Link
                              key={index}
                              position="relative"
                              height={isShowPageMobileView ? null : '190px'}
                              _hover={{ textDecoration: 'none' }}
                            >
                              <ShowItem
                                isShowPageMobileView={isShowPageMobileView}
                              />
                            </Link>
                          ))}
                      </Grid>
                    </TabPanel>
                    <TabPanel paddingX="0">Season 2</TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>

              <TabPanel paddingX="0">Shorts</TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>

      {/* Shows you love */}
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '0px' : '22px'}
        paddingBottom={isMobile ? '0px' : '22px'}
      >
        <Flex
          width="100%"
          justifyContent="space-between"
          paddingBottom={isMobile ? '6px' : '12px'}
          paddingLeft={isMobile ? '10px' : '16px'}
          paddingRight={isMobile ? '15px' : '24px'}
        >
          <Text
            fontSize={isMobile ? '20px' : '22px'}
            fontWeight="600"
            lineHeight="1.4"
          >
            You May Also Like
          </Text>
          <Link
            color="#838991"
            fontSize="18px"
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
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <Link
                  key={index}
                  position="relative"
                  minWidth="160px"
                  height="100px"
                >
                  <HomeShowItem />
                </Link>
              ))}
          </Flex>
        ) : (
          <Grid
            width="100%"
            height="100%"
            paddingX="20px"
            gridTemplateColumns="repeat(4, minmax(0, 100%))"
            gridColumnGap="10px"
          >
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Link key={index} position="relative">
                  <HomeShowItem />
                </Link>
              ))}
          </Grid>
        )}
      </Flex>
    </Flex>
  );
}

export default Video;

// fixed position of thumbnail
// Sticky positioning of tabs

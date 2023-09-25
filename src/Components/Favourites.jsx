import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Flex,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import HomeShowItem from './HomeShowItem';

function Favourites() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const handleTabsChange = index => {
    console.log(index);
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

      <Tabs align="start" isFitted={isMobile} onChange={handleTabsChange}>
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
            Shorts
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
        </TabList>

        <TabPanels paddingTop={isMobile ? '30px' : '20px'}>
          {/* Episodes */}
          <TabPanel paddingX={isMobile ? '6px' : '0'}>
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
              gridRowGap={isMobile ? '2px' : '16px'}
            >
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <Flex key={index} position="relative">
                    <Link
                      to="/video/man-vs-wild/the-rockies"
                      as={ReactRouterLink}
                      key={index}
                      position="relative"
                      height={isMobile ? null : '190px'}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <ShowItem
                        isFavourite={true}
                        isShowPageMobileView={isMobile}
                        timeOverlay={true}
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
                          <MenuItem backgroundColor="#121317" fontSize="14px">
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
          </TabPanel>

          {/* Shorts */}
          <TabPanel paddingX={isMobile ? '6px' : '0'}>
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
              gridRowGap={isMobile ? '2px' : '16px'}
            >
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <Flex key={index} position="relative">
                    <Link
                      to="/video/man-vs-wild/the-rockies"
                      as={ReactRouterLink}
                      key={index}
                      position="relative"
                      height={isMobile ? null : '190px'}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <ShowItem
                        isFavourite={true}
                        isShowPageMobileView={isMobile}
                        timeOverlay={true}
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
                          <MenuItem backgroundColor="#121317" fontSize="14px">
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
          </TabPanel>

          {/* Shows */}
          <TabPanel paddingX="0">
            <Grid
              width="100%"
              height="100%"
              paddingX="20px"
              gridTemplateColumns={{
                base: 'repeat(1, minmax(0, 100%))',
                md: 'repeat(3, minmax(0, 100%))',
                lg: 'repeat(4, minmax(0, 100%))',
                xl: 'repeat(5, minmax(0, 100%))',
              }}
              gridColumnGap="10px"
              gridRowGap="15px"
            >
              {Array(8)
                .fill(null)
                .map((_, index) => (
                  <Flex key={index} position="relative">
                    <Link position="relative">
                      <HomeShowItem
                        isFavourite={true}
                        isFavouriteMobileView={true}
                        isChannelPageMobileView={true}
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
                              color="#fff"
                              weight="fill"
                            />
                          }
                          variant="unstyled"
                          position="absolute"
                          top="6px"
                          right="2px"
                        />
                        <MenuList
                          backgroundColor="#121317"
                          minWidth="120px"
                          borderRadius="0px"
                          paddingY="4px"
                        >
                          <MenuItem backgroundColor="#121317" fontSize="14px">
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Favourites;

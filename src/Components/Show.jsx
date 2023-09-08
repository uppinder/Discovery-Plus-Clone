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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import showImage from '../Assets/Images/show_image.jpeg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import { DotOutline, Heart, Play, ShareNetwork } from '@phosphor-icons/react';
import HomeShowItem from './HomeShowItem';

const HoverableButton = ({ iconType, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      height="fit-content"
      alignItems="center"
      gap="6px"
      border={`1px solid ${isHovered ? '#d6dce4' : '#9ba1a9'}`}
      borderRadius="4px"
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

function Show() {
  const location = useLocation();

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
        width="75%"
      >
        {/* Thumbnail */}
        <Image src={showImage} borderRadius="10px" />

        {/* Description */}
        <Flex width="100%" marginY="14px" justifyContent="space-between">
          {/* Left side */}
          <Flex flexDirection="column" gap="12px" flex="1">
            <Flex alignItems="center" gap="12px">
              <Image src={premiumIcon} width="30px" height="30px" />
              <Text fontSize="28px" color="white" fontWeight="600">
                Man vs. Wild
              </Text>
            </Flex>

            <Flex>
              <Flex alignItems="center">
                <DotOutline color="#838991" weight="fill" />
                <Text color="#bfc5cd" fontWeight="500" fontSize="14px">
                  Adventure
                </Text>
              </Flex>
              <Flex alignItems="center">
                <DotOutline color="#838991" weight="fill" />
                <Text color="#bfc5cd" fontWeight="500" fontSize="14px">
                  Survival
                </Text>
              </Flex>
            </Flex>

            <Flex
              width="fit-content"
              height="40px"
              borderRadius="4px"
              backgroundColor="#2175d9"
              justifyContent="center"
              alignItems="center"
              gap="5px"
              padding="10px 12px"
              cursor="pointer"
            >
              <Play size={18} color="white" weight="fill" />
              <Text color="white" fontWeight="700" lineHeight="1.2">
                Watch Now
              </Text>
            </Flex>

            <Text
              color="#9ba1a9"
              lineHeight="1.43"
              fontWeight="500"
              fontSize="15px"
            >
              Bear Grylls shows how to survive the toughest and most remote
              environments.
            </Text>

            <Text
              color="#9ba1a9"
              lineHeight="1.43"
              fontWeight="500"
              fontSize="15px"
            >
              Age Rating : UA-13+ | Contains : Frightening Scenes
            </Text>
          </Flex>

          {/* Right side */}
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

            <Flex gap="5px" alignItems="center" flexDirection="column">
              <Text color="#bfc5cd" fontSize="14px">
                Languages
              </Text>
              <Flex
                justifyContent="center"
                flexWrap="wrap"
                gap="5px"
                width="90%"
              >
                {[
                  'Telugu',
                  'Bengali',
                  'Malayalam',
                  'Hindi',
                  'Marathi',
                  'Kannada',
                  'English',
                  'Tamil',
                ].map((lang, idx) => (
                  <Text key={idx} color="#9ba1a9" fontSize="12px">
                    {lang}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Divider />
        {/* Episodes */}

        <Flex width="100%">
          <Tabs align="start">
            <TabList color="#9ba1a9" border="transparent" gap="24px">
              <Tab
                paddingX="0"
                fontSize="18px"
                fontWeight="700"
                _selected={{ borderColor: 'white', color: 'white' }}
                _hover={{ color: 'white' }}
              >
                Episodes
              </Tab>
              <Tab
                paddingX="0"
                fontSize="18px"
                fontWeight="700"
                _selected={{ borderColor: 'white', color: 'white' }}
                _hover={{ color: 'white' }}
              >
                Shorts
              </Tab>
            </TabList>

            <TabPanels width="100%">
              <TabPanel paddingLeft="4px" paddingTop="15px">
                <Tabs variant="unstyled" isLazy onChange={handleTabsChange}>
                  <TabList color="#838991" gap="10px">
                    <Tab
                      fontWeight="500"
                      padding="3px 6px"
                      fontSize="14px"
                      _selected={{
                        color: 'white',
                        bg: '#545a62',
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
                        bg: '#545a62',
                        borderRadius: '2px',
                      }}
                      _hover={{ color: 'white' }}
                    >
                      Season 2
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel paddingX="0">
                      <Grid
                        width="100%"
                        height="100%"
                        gridTemplateColumns="repeat(5, minmax(0, 100%))"
                        gridTemplateRows=""
                        gap="10px"
                      >
                        {Array(14)
                          .fill(null)
                          .map((_, index) => (
                            <Link key={index} position="relative">
                              <HomeShowItem />
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
    </Flex>
  );
}

export default Show;

// 1. HomeShowItem ki jagah create custom for this page
// 2. Responsive grid
// 3. Video page

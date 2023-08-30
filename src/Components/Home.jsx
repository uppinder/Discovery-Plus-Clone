import { Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import MainCarousel from './MainCarousel';

import showThumbnail from '../Assets/Images/shows_test_1.jpeg';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';

function Home() {
  return (
    <Flex minWidth="100vw" flexDirection="column">
      <MainCarousel />

      {/* Shows you love */}
      <Flex width="100%" flexDirection="column" paddingY="22px">
        <Flex
          width="100%"
          justifyContent="space-between"
          paddingBottom="12px"
          paddingLeft="16px"
          paddingRight="24px"
        >
          <Text fontSize="22px" fontWeight="600" lineHeight="1.4">
            Shows You Love
          </Text>
          <Link
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>

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
              <Link position="relative">
                <Image src={showThumbnail} borderRadius="6px" />

                <Image
                  src={premiumIcon}
                  position="absolute"
                  top="1.5%"
                  left="1%"
                />

                <Flex
                  position="absolute"
                  width="100%"
                  height="100%"
                  top="0"
                  left="0"
                  zIndex="10"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image src={playButtonImage} height="60px" width="60px" />
                </Flex>

                <Flex
                  position="absolute"
                  height="24px"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="#2175d9"
                  borderRadius="3px"
                  padding="2px 12px"
                  bottom="4%"
                  left="25%"
                >
                  <Text fontSize="16px" fontWeight="500">
                    New Episodes
                  </Text>
                </Flex>
              </Link>
            ))}
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Home;

// 1. When hovered over, the 'New Episodes' overlay should disappear. Additionally, upon hovering, the play button and show description overlays should appear.
// 2. On mobile screens, all shows should appear in the grid and they should be scrollable.

import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import showThumbnail from '../Assets/Images/shows_test_1.jpeg';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import HomeShowItemHoverableIcon from './HomeShowItemHoverableIcon';

function HomeShowItem() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Image src={showThumbnail} borderRadius="6px" />

      {/* Premium Icon Overlay*/}
      <Image src={premiumIcon} position="absolute" top="1.5%" left="1%" />

      {/* New Episodes Overlay */}
      <Flex
        display={isHovered ? 'none' : 'flex'}
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

      {/* Play Button Overlay*/}
      <Flex
        display={isHovered ? 'flex' : 'none'}
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        left="0"
        zIndex="10"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={playButtonImage}
          height={{ base: '40px', xl: '60px' }}
          width={{ base: '40px', xl: '60px' }}
        />
      </Flex>

      {/* Bottom Text Overlay */}
      <Flex
        display={isHovered ? 'flex' : 'none'}
        position="absolute"
        height="100%"
        width="100%"
        top="0"
        left="0"
        backgroundImage="linear-gradient(to top, #121317, rgba(18, 19, 23, 0.7) 43%, rgba(18, 19, 23, 0))"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          width="90%"
          paddingX="10px"
          paddingBottom="10px"
          lineHeight="1.2"
          position="relative"
        >
          <Text fontSize="16px" fontWeight="600">
            Little Singham
          </Text>
          <Flex alignItems="center">
            <Text
              color="#838991"
              fontSize="16px"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              A nine-year-old boy battles evil villains that are out to create
              chaos.
            </Text>
          </Flex>
          <HomeShowItemHoverableIcon />
        </Flex>
      </Flex>
    </Box>
  );
}

export default HomeShowItem;

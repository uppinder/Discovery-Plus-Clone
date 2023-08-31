import React, { useState } from 'react';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import showThumbnailVertical from '../Assets/Images/shows_vertical_test_1.jpeg';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import HomeShowItemHoverableIcon from './HomeShowItemHoverableIcon';

function HomeShowItemVertical() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Image
        src={showThumbnailVertical}
        borderRadius={isMobile ? '1px' : '4px'}
      />

      {/* Premium Icon Overlay*/}
      <Image src={premiumIcon} position="absolute" top="1.5%" left="1%" />

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
          <Text
            fontSize="16px"
            fontWeight="600"
            overflow="hidden"
            textOverflow="ellipsis"
            maxH="2.4em" // 1.2em * 2 lines
          >
            Raja Rasoi Aur Anya Kahaaniyan
          </Text>
          <Flex alignItems="center">
            <Text
              color="#838991"
              fontSize="16px"
              overflow="hidden"
              textOverflow="ellipsis"
              maxH="2.4em" // 1.2em * 2 lines
            >
              Explore the history and flavors of regional Indian cuisine.
            </Text>
          </Flex>
          <HomeShowItemHoverableIcon />
        </Flex>
      </Flex>
    </Box>
  );
}

export default HomeShowItemVertical;

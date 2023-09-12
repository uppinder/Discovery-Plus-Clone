import React, { useState } from 'react';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import showThumbnail from '../Assets/Images/shows_test_1.jpeg';

import videoOverlayIcon from '../Assets/Images/mindblown_video_icon.svg';

function MindblownListItem({ isMindblownPageMobileView = false }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      position="relative"
    >
      <Image src={showThumbnail} borderRadius="10px" />

      {/* New Episodes Overlay */}
      <Flex
        position="absolute"
        justifyContent="center"
        alignItems="center"
        gap="5px"
        right="12px"
        bottom="7px"
        zIndex="5"
      >
        <Image src={videoOverlayIcon} />
        <Text fontSize="15px" fontWeight="500">
          3 Videos
        </Text>
      </Flex>

      <Flex
        position="absolute"
        height="100%"
        width="100%"
        top="0"
        left="0"
        backgroundImage="linear-gradient(to bottom,rgba(0, 0, 0, 0) 77%,rgba(0, 0, 0, 0.8) 99%)"
        borderRadius="10px"
      ></Flex>

      {/* Bottom Text Overlay */}
      <Flex
        position="absolute"
        height="100%"
        width="100%"
        top="0"
        left="0"
        backgroundImage={
          isHovered
            ? 'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.8))'
            : null
        }
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          width="70%"
          paddingX="10px"
          paddingBottom="10px"
          lineHeight="1.2"
          position="relative"
        >
          <Text fontSize="16px" fontWeight="600">
            Little Singham
          </Text>
          <Flex alignItems="center" display={isHovered ? 'flex' : 'none'}>
            <Text
              color="#838991"
              fontSize="16px"
              lineHeight="1.2em"
              css={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // Number of lines to show
                maxHeight: '2.8em', // You can adjust this value for your design
              }}
            >
              A nine-year-old boy battles evil villains that are out to create
              chaos.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default MindblownListItem;

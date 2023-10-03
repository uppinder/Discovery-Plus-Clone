import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import videoOverlayIcon from '../Assets/Images/mindblown_video_icon.svg';

function MindblownListItem({
  title = '',
  desc = '',
  thumbnail = '',
  videoCount = '',
}) {
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
      <Image src={thumbnail} borderRadius="10px" />

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
          {videoCount}
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
            {title}
          </Text>
          <Flex alignItems="center" display={isHovered ? 'flex' : 'none'}>
            <Text
              color="#838991"
              fontSize="14px"
              fontWeight="500"
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
              {desc}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default MindblownListItem;

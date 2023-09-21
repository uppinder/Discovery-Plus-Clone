import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import channelThumbnailDesktop from '../Assets/Images/channel_carousel_image.jpeg';
import liveIcon from '../Assets/Images/live_icon.svg';

function ChannelCarouselItem({ first }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box
      position="relative"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      width="fit-content"
    >
      <Image
        src={channelThumbnailDesktop}
        minWidth="150px"
        height="190px"
        border={first ? '3px solid #2175d9' : null}
        borderRadius="10px"
      />

      {isHovered && (
        <Box
          position="absolute"
          height="100%"
          width="100%"
          top="0"
          left="0"
          backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0.18) 100%, #000000)"
          zIndex="2"
          borderRadius="10px"
        ></Box>
      )}

      {isHovered && (
        <Image
          src={liveIcon}
          position="absolute"
          bottom={first ? '10px' : '6px'}
          right="5px"
          width="64px"
          height="21px"
          zIndex="3"
        />
      )}
    </Box>
  );
}

export default ChannelCarouselItem;

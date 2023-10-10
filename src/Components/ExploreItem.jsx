import { Box, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

function ExploreItem({ thumbnail }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={thumbnail}
        width="100%"
        height="288px"
        objectFit="cover"
        borderRadius="5px"
      />

      {isHovered && (
        <Box
          position="absolute"
          height="100%"
          width="100%"
          top="0"
          left="0"
          backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 100%, #000000)"
          zIndex="2"
        ></Box>
      )}
    </Box>
  );
}

export default ExploreItem;

import React, { useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

function GenreCarouselItem({ genreName = '', genreImageUrl = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box
      position="relative"
      height="100%"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Image
        src={genreImageUrl}
        objectFit="cover"
        height="100%"
        width="auto"
        borderRadius="10px"
      />

      <Box
        width="100%"
        className="swiper-genre-text"
        position="absolute"
        bottom={isHovered ? '28%' : '3%'}
        zIndex="10"
      >
        <Text marginLeft="29%" fontSize="18px" fontWeight="700">
          {genreName}
        </Text>
      </Box>
    </Box>
  );
}

export default GenreCarouselItem;

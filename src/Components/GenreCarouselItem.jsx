import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import genreThumbnailDesktop from '../Assets/Images/genre_image_desktop.jpeg';

function GenreCarouselItem() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box height="100%" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Image
        src={genreThumbnailDesktop}
        objectFit="cover"
        height="100%"
        width="auto"
        borderRadius="10px"
      />

      <Text
        className="swiper-genre-text"
        position="absolute"
        left="35%"
        bottom={isHovered ? '28%' : '3%'}
        fontSize="18px"
        fontWeight="700"
        zIndex="10"
      >
        History
      </Text>
    </Box>
  );
}

export default GenreCarouselItem;

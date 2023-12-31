import { Flex } from '@chakra-ui/react';
import { Heart } from '@phosphor-icons/react';
import React, { useState } from 'react';

function HomeShowItemHoverableIcon({
  id = '',
  isFavourite = false,
  toggleFavouriteShow = null,
  toggleFavouriteEpisode = null,
  removefromFavourites = null,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Flex
      position="absolute"
      right="-8%"
      zIndex="5"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={e => {
        e.preventDefault();

        // console.log('click');

        if (toggleFavouriteShow) toggleFavouriteShow(id);
        if (toggleFavouriteEpisode) toggleFavouriteEpisode(id);
        if (removefromFavourites) removefromFavourites(id);
      }}
    >
      <Heart
        size="24px"
        right="0"
        bottom="0"
        color="white"
        weight={isHovered || isFavourite ? 'fill' : null}
      />
    </Flex>
  );
}

export default HomeShowItemHoverableIcon;

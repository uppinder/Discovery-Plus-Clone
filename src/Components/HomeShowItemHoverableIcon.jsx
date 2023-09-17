import { Flex } from '@chakra-ui/react';
import { Heart } from '@phosphor-icons/react';
import React, { useState } from 'react';

function HomeShowItemHoverableIcon() {
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
    >
      <Heart
        size="24px"
        right="0"
        bottom="0"
        color="white"
        weight={isHovered ? 'fill' : null}
      />
    </Flex>
  );
}

export default HomeShowItemHoverableIcon;

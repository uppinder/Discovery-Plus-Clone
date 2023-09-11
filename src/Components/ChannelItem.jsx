import { Box, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

import liveIcon from '../Assets/Images/live_icon.svg';

function ChannelItem({ thumbnail }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Box
      position="relative"
      backgroundColor="#000"
      borderRadius="10px"
      height="118px"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Image src={thumbnail} width="100%" height="100%" objectFit="cover" />

      {/* Live overlay */}
      {isHovered && (
        <Image
          src={liveIcon}
          position="absolute"
          top="5px"
          right="5px"
          width="48px"
          height="17px"
        />
      )}
    </Box>
  );
}

export default ChannelItem;

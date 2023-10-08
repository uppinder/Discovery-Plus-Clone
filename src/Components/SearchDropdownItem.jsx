import React, { useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';

function SearchDropdownItem({
  title = '',
  desc = '',
  thumbnail = '',
  isPremium = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Flex
      flexDirection="row"
      width="100%"
      gap="8px"
      height="88px"
      paddingLeft="10px"
      paddingY="6px"
      justifyContent="center"
      alignItems="center"
      backgroundColor={isHovered ? '#262931' : null}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Box position="relative">
        <Image
          src={thumbnail}
          minWidth="115px"
          height="70px"
          objectFit="cover"
        />

        {isPremium && (
          <Image
            src={premiumIcon}
            position="absolute"
            top="0"
            left="0"
            width="18px"
            height="18px"
          />
        )}

        {/* Play Button Overlay*/}
        {isHovered && (
          <Flex
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
            zIndex="7"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={playButtonImage} height="26px" width="26px" />
          </Flex>
        )}
      </Box>

      <Flex flexDirection="column" height="72px" gap="5px" position="relative">
        <Text fontSize="14px" fontWeight="500" lineHeight="1">
          {title}
        </Text>
        <Flex alignItems="center" width="90%">
          <Text
            fontWeight="500"
            color="#838991"
            fontSize="13px"
            lineHeight="1.3"
            textOverflow="ellipsis"
            letterSpacing="0.10px"
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
  );
}

export default SearchDropdownItem;

import React, { useState } from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

import shortsFullEpIcon from '../Assets/Images/short_play_icon.svg';

import { Heart, ShareNetwork } from '@phosphor-icons/react';

function ShortsCard({
  index,
  title,
  rating,
  shortsImageThumbnail,
  episodeUrl,
}) {
  const [cardHovered, setCardHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  return (
    <Flex
      width="100%"
      paddingTop="15px"
      paddingBottom="20px"
      flexDirection="column"
      backgroundColor={cardHovered ? '#121317' : '#262931'}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <Text marginX="12px" marginBottom="8px" fontWeight="500">
        {title}
      </Text>
      <Text marginX="12px" color="#9ba1a9" fontSize="14px">
        {rating}
      </Text>
      <Image src={shortsImageThumbnail} marginY="12px" />
      <Flex justifyContent="space-between" paddingX="16px" marginTop="6px">
        <Flex gap="6px">
          <Box
            cursor="pointer"
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
          >
            <Heart
              size="24"
              color="white"
              weight={iconHovered ? 'fill' : null}
            />
          </Box>
          <ShareNetwork size="24" color="white" cursor="pointer" />
        </Flex>

        <Link display="flex" gap="8px" _hover={{ textDecoration: 'none' }}>
          <Image
            src={shortsFullEpIcon}
            color="white"
            weight={iconHovered ? 'fill' : null}
          />
          <Text>Full Episode</Text>
        </Link>
      </Flex>
    </Flex>
  );
}

export default ShortsCard;

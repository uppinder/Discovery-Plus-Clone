import React, { useState } from 'react';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import showThumbnail from '../Assets/Images/shows_test_1.jpeg';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import HomeShowItemHoverableIcon from './HomeShowItemHoverableIcon';

function ShowItem({ isShowPageMobileView = false, timeOverlay = false }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  if (isShowPageMobileView) {
    return (
      <Flex
        flexDirection="row"
        width="100%"
        gap="8px"
        height="96px"
        justifyContent="center"
        alignItems="center"
      >
        <Box position="relative">
          <Image
            src={showThumbnail}
            minWidth="128px"
            height="72px"
            objectFit="cover"
          />

          {/* Play Button Overlay*/}
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
            <Image src={playButtonImage} height="24px" width="24px" />
          </Flex>

          {/* Bottom Text Overlay */}
          <Flex
            position="absolute"
            bottom="2px"
            right="2px"
            backgroundColor="#000000"
            opacity="0.65"
            paddingX="3px"
          >
            <Text fontSize="10px">43:32</Text>
          </Flex>
        </Box>

        <Flex
          flexDirection="column"
          height="72px"
          gap="5px"
          position="relative"
        >
          <Text
            fontSize="15px"
            fontWeight={isShowPageMobileView ? '500' : '600'}
            lineHeight="1"
          >
            Little Singham
          </Text>
          <Flex alignItems="center" width="90%">
            <Text
              fontWeight={isShowPageMobileView ? '500' : null}
              color="#838991"
              fontSize="14px"
              lineHeight={isShowPageMobileView ? '1.4em' : '1.2em'}
              textOverflow="ellipsis"
              css={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // Number of lines to show
                maxHeight: `${isShowPageMobileView ? '2.8em' : '2.4em'}`, // You can adjust this value for your design
              }}
            >
              A nine-year-old boy battles evil villains that are out to create
              chaos.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" height="100%" width="100%" gap="5px">
      <Box
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        position="relative"
      >
        <Image
          src={showThumbnail}
          borderRadius={isMobile ? '1px' : '4px'}
          //   height="100%"
          //   width="auto"
          //   objectFit="cover"
        />

        {/* Premium Icon Overlay*/}
        <Image src={premiumIcon} position="absolute" top="1.5%" left="1%" />

        {timeOverlay && (
          <Flex
            position="absolute"
            bottom="4px"
            right="4px"
            backgroundColor="#000000"
            opacity="0.65"
            paddingX="3px"
          >
            <Text fontSize="12px">43:32</Text>
          </Flex>
        )}

        {/* Play Button Overlay*/}
        <Flex
          display={isHovered ? 'flex' : 'none'}
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          left="0"
          zIndex="10"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={playButtonImage}
            height={{ base: '20px', lg: '40px' }}
            width={{ base: '20px', lg: '40px' }}
          />
        </Flex>

        {/* Bottom Text Overlay */}
        <Flex
          display={isHovered ? 'flex' : 'none'}
          position="absolute"
          height="100%"
          width="100%"
          top="0"
          left="0"
          backgroundImage="linear-gradient(to top, #121317, rgba(18, 19, 23, 0.7) 43%, rgba(18, 19, 23, 0))"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-end"
            width="90%"
            paddingX="10px"
            paddingBottom="10px"
            lineHeight="1.2"
            position="relative"
          >
            <HomeShowItemHoverableIcon />
          </Flex>
        </Flex>
      </Box>

      <Text fontSize="15px" fontWeight="600">
        Little Singham
      </Text>
      <Flex alignItems="center" width="90%">
        <Text
          color="#838991"
          fontSize="14px"
          lineHeight="1.2em"
          textOverflow="ellipsis"
          css={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Number of lines to show
            maxHeight: '2.4em', // You can adjust this value for your design
          }}
        >
          A nine-year-old boy battles evil villains that are out to create
          chaos.
        </Text>
      </Flex>
    </Flex>
  );
}

export default ShowItem;

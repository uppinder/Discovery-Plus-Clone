import React from 'react';
import { Box, Flex, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Link, Link as RouterLink } from 'react-router-dom';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';

function MainCarousel() {
  const carouselData = [
    {
      showTitle: 'Running Wild With Bear Grylls',
      showDesc: `Bear takes celebrities to wild locations for the journey of a
            lifetime.`,
      showTags: ["Editor's Pick", 'Must Watch'],
      showImage: require(`../Assets/Images/carousel_image_test.jpeg`),
      showIsPremium: true,
      showHasNewEpisodes: false,
    },
    {
      showTitle: 'Pawn Stars',
      showDesc: `Pawn Stars follows three generations of the Harrison family`,
      showTags: ['All Time Fav', 'Stream Now'],
      showImage: require(`../Assets/Images/carousel_image_test2.jpeg`),
      showIsPremium: true,
      showHasNewEpisodes: true,
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      //   autoplay={{
      //     delay: 3000,
      //     disableOnInteraction: false,
      //   }}
      pagination={{
        clickable: true,
      }}
      navigation={{
        enabled: true,
      }}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="swiper-home-carousel"
    >
      {carouselData.map(showData => (
        <SwiperSlide>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            height="100%"
            flex="35%"
            gap="20px"
            paddingTop="5%"
            paddingLeft="5%"
          >
            <Text fontSize="40px" fontWeight="bold" lineHeight="1.1">
              {showData.showTitle}
            </Text>

            <Text
              fontSize="18px"
              fontWeight="500"
              color="#9ba1a9"
              lineHeight="1.33"
              textOverflow="ellipsis"
            >
              {showData.showDesc}
            </Text>
            <Flex gap="8px">
              {showData.showTags.map(showTag => (
                <Box
                  backgroundColor="rgb(40, 46, 61)"
                  width="fit-content"
                  color="#9ba1a9"
                  fontSize="12px"
                  fontWeight="600"
                  lineHeight="1.4"
                  borderRadius="2px"
                  padding="2.5px 5px"
                >
                  {showTag}
                </Box>
              ))}
            </Flex>

            <Flex alignItems="center">
              <Image
                src={playButtonImage}
                height="70px"
                width="70px"
                opacity="0.8"
                _hover={{ opacity: 1 }}
              />
              <Text
                paddingLeft="18px"
                fontSize="20px"
                fontWeight="500"
                color="white"
                lineHeight="1.6"
              >
                Play
              </Text>
            </Flex>
          </Flex>
          <Flex
            width="100%"
            height="100%"
            flex="65%"
            paddingRight="5%"
            position="relative"
          >
            <Flex
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={showData.showImage}
                borderRadius="10px"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Flex>

            {showData.showIsPremium && (
              <Image
                src={premiumIcon}
                position="absolute"
                top="1.5%"
                left="1%"
              />
            )}
            {showData.showHasNewEpisodes && (
              <Flex
                height="28px"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#2175d9"
                borderRadius="3px"
                padding="2px 12px"
                position="absolute"
                bottom="4%"
                left="40%"
              >
                <Text fontSize="18px" fontWeight="500">
                  New Episodes
                </Text>
              </Flex>
            )}
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainCarousel;

// 1. Image pe click
// 2. premium icon overlay positioning - done
// 3. Responsive

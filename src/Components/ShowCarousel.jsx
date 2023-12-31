import React from 'react';
import {
  Box,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import playButtonImage from '../Assets/Images/play_button.svg';
import premiumIcon from '../Assets/Images/premium_icon.svg';

function ShowCarousel({ kidsPage = false, carouselData = [] }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Swiper
      speed={1000}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
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
      {carouselData.map((showData, idx) => (
        <LinkBox key={idx}>
          <SwiperSlide key={idx}>
            <Flex
              key={idx}
              display={{ base: 'none', md: 'flex' }}
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
              {!kidsPage && (
                <Flex gap="8px">
                  {showData.showTags.map((showTag, idx) => (
                    <Box
                      key={idx}
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
              )}

              <Flex alignItems="center">
                <Image
                  src={playButtonImage}
                  height="70px"
                  width="70px"
                  zIndex="10"
                  cursor="pointer"
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
            <LinkOverlay
              as={RouterLink}
              to={`/show/${showData.showId}`}
              height="100%"
            >
              {isMobile ? (
                <Flex width="100%" height="100%" position="relative">
                  <Image
                    src={showData.showImageUrlMobile}
                    height="100%"
                    width="auto"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    height="100%"
                    width="100%"
                    backgroundImage="linear-gradient(to top, #1a1c21 18%, rgba(17, 19, 22, 0.43) 54%, rgba(0, 0, 0, 0) 90%)"
                  />
                  <Flex
                    position="absolute"
                    bottom="30%"
                    left={kidsPage ? '40%' : '30%'}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="7px"
                  >
                    {!kidsPage && (
                      <Flex gap="8px">
                        {showData.showTags.map((showTag, idx) => (
                          <Box
                            key={idx}
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
                    )}
                    {showData.showWatch && (
                      <Flex
                        alignItems="center"
                        marginBottom="-18px"
                        backgroundImage="linear-gradient(
                            to top,
                            rgba(255, 255, 255, 0.94) 276%,
                            #ebedee 44%
                          )"
                        borderRadius="4px"
                        padding="4px 8px"
                      >
                        <Image
                          src={playButtonImage}
                          height="24px"
                          width="24px"
                        />
                        <Text
                          paddingLeft="8px"
                          fontSize="20px"
                          fontWeight="500"
                          color="#1a1c21"
                          lineHeight="1.4"
                        >
                          Watch
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              ) : (
                <Flex width="95%" height="98%" flex="65%" position="relative">
                  <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={showData.showImageUrl}
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
                      bottom="3%"
                      left="40%"
                    >
                      <Text fontSize="18px" fontWeight="500">
                        New Episodes
                      </Text>
                    </Flex>
                  )}
                </Flex>
              )}
            </LinkOverlay>
          </SwiperSlide>
        </LinkBox>
      ))}
    </Swiper>
  );
}

export default ShowCarousel;

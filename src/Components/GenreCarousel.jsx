import { Flex, Image, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

import genreThumbnail from '../Assets/Images/genre_image.png';
import genreThumbnailOverlay from '../Assets/Images/genre_image_2.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import GenreCarouselItem from './GenreCarouselItem';

function GenreCarousel() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      {isMobile ? (
        <Flex
          top="525px"
          position="absolute"
          zIndex="10"
          width="100vw"
          paddingX="10px"
          overflowX="scroll"
          css={{
            '&::-webkit-scrollbar': {
              width: '0',
            },
          }}
        >
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <Link key={index} position="relative" minWidth="80px">
                <Flex
                  height="100%"
                  flexDirection="column"
                  alignItems="center"
                  gap="5px"
                >
                  <Image
                    src={
                      index % 2 === 0 ? genreThumbnail : genreThumbnailOverlay
                    }
                    width="70px"
                    height="70px"
                  />
                  <Text fontSize="12px" color="#c7c7c7" fontWeight="500">
                    {index % 2 === 0 ? 'Adventure' : 'Free Watch'}
                  </Text>
                </Flex>
              </Link>
            ))}
        </Flex>
      ) : (
        <Swiper
          speed={1500}
          slidesPerView={6}
          slidesPerGroup={6}
          spaceBetween={15}
          navigation={{
            enabled: true,
          }}
          modules={[Navigation]}
          className="swiper-genre-carousel"
        >
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <SwiperSlide key={index} className="swiper-genre-slide">
                <Link
                  height="100%"
                  minWidth="200px"
                  className="swiper-genre-slide-wrapper"
                >
                  <GenreCarouselItem />
                </Link>
              </SwiperSlide>
            ))}
          {/* <SwiperSlide className="swiper-genre-slide-padding"></SwiperSlide> */}
        </Swiper>
      )}
    </>
  );
}

export default GenreCarousel;

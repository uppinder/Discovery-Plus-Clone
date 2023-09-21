import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import genreThumbnail from '../Assets/Images/genre_image.png';
import genreThumbnailOverlay from '../Assets/Images/genre_image_2.png';

import Slider from 'react-slick';
import leftArrow from '../Assets/Images/carousel_left_arrow.svg';
import rightArrow from '../Assets/Images/carousel_right_arrow.svg';
import GenreCarouselItem from './GenreCarouselItem';

function GenreCarousel() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  function CarouselNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
        }}
        onClick={onClick}
      >
        <Image src={rightArrow} />
      </div>
    );
  }

  function CarouselPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
        }}
        onClick={onClick}
      >
        <Image src={leftArrow} position="absolute" left="-5px" />
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 5,
    nextArrow: <CarouselNextArrow />,
    prevArrow: <CarouselPrevArrow />,
    className: 'inner-slider',
    onInit: () => {
      const leftArrowEl = document.querySelector('.slick-prev');
      const nextArrowEl = document.querySelector('.slick-next');
      leftArrowEl.style.opacity = '0';
      nextArrowEl.style.opacity = '1';
    },
    afterChange: index => {
      const leftArrowEl = document.querySelector('.slick-prev');
      const rightArrowEl = document.querySelector('.slick-next');
      if (index === 4) {
        leftArrowEl.style.opacity = '1';
        rightArrowEl.style.opacity = '0';
      } else {
        leftArrowEl.style.opacity = '0';
        rightArrowEl.style.opacity = '1';
      }
    },
  };

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
              <Link
                to="/genre/test"
                as={ReactRouterLink}
                key={index}
                position="relative"
                minWidth="80px"
              >
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
        <Flex width="100%" justifyContent="center" backgroundColor="#121317">
          <Box className="swiper-genre-carousel" width="92%" paddingY="15px">
            <Slider {...settings}>
              {Array(10)
                .fill(null)
                .map((_, id) => (
                  <Link key={id} height="118px">
                    <GenreCarouselItem />
                  </Link>
                ))}
            </Slider>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default GenreCarousel;

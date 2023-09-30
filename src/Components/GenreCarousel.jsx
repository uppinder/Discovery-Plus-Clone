import React, { useEffect } from 'react';
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

function GenreCarousel({
  genreDataList = [
    {
      genreId: 'adventure',
      genreName: 'Adventure',
      genreImageUrl:
        'https://ap2-prod-images.disco-api.com/2021/03/01/2a76ce95-fdcc-492d-b78e-42932a724e0f.jpeg?w=1200&p=true&q=75',
      genreImageUrlMobile:
        'https://ap2-prod-images.disco-api.com/2021/05/24/24992b84-e726-4ef3-a4a7-c26f227bc6c1.png?w=100',
    },
  ],
}) {
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
          {genreDataList.map((genreData, index) => (
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
                  src={genreData.genreImageUrlMobile}
                  width="70px"
                  height="70px"
                />
                <Text fontSize="12px" color="#c7c7c7" fontWeight="500">
                  {genreData.genreName}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      ) : (
        <Flex width="100%" justifyContent="center" backgroundColor="#121317">
          <Box className="swiper-genre-carousel" width="92%" paddingY="15px">
            <Slider {...settings}>
              {genreDataList.map((genreData, id) => (
                <Link key={id} height="118px">
                  <GenreCarouselItem {...genreData} />
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

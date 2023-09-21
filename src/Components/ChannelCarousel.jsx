import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, Flex, Image, Link } from '@chakra-ui/react';

import Slider from 'react-slick';
import leftArrow from '../Assets/Images/carousel_left_arrow.svg';
import rightArrow from '../Assets/Images/carousel_right_arrow.svg';
import ChannelCarouselItem from './ChannelCarouselItem';

function ChannelCarousel() {
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
    speed: 2000,
    slidesToShow: 7,
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
      console.log(index);
      const leftArrowEl = document.querySelector('.slick-prev');
      const rightArrowEl = document.querySelector('.slick-next');
      if (index === 5) {
        leftArrowEl.style.opacity = '1';
        rightArrowEl.style.opacity = '0';
      } else {
        leftArrowEl.style.opacity = '0';
        rightArrowEl.style.opacity = '1';
      }
    },
  };

  return (
    <Flex width="100%" justifyContent="center">
      <Box className="swiper-genre-carousel" width="78%" paddingY="15px">
        <Slider {...settings}>
          {Array(12)
            .fill(null)
            .map((_, id) => (
              <Link key={id} to="/channel/test" as={ReactRouterLink}>
                <ChannelCarouselItem first={id === 0} />
              </Link>
            ))}
        </Slider>
      </Box>
    </Flex>
  );
}

export default ChannelCarousel;

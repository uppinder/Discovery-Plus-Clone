import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import Slider from 'react-slick';
import leftArrow from '../Assets/Images/carousel_left_arrow.svg';
import rightArrow from '../Assets/Images/carousel_right_arrow.svg';
import GenreCarouselItem from './GenreCarouselItem';
import { isEmpty } from 'lodash';

function GenreCarousel({ genreDataList = [] }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [settings, setSettings] = useState({});

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

  useEffect(() => {
    if (!isEmpty(genreDataList)) {
      setSettings({
        infinite: false,
        speed: 1500,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: <CarouselNextArrow />,
        prevArrow: <CarouselPrevArrow />,
        className: 'inner-slider',
        afterChange: index => {
          const leftArrowEl = document.querySelector('.slick-prev');
          const rightArrowEl = document.querySelector('.slick-next');
          if (index === 4) {
            try {
              leftArrowEl.style.opacity = '1';
              rightArrowEl.style.opacity = '0';
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              leftArrowEl.style.opacity = '0';
              rightArrowEl.style.opacity = '1';
            } catch (error) {
              console.log(error);
            }
          }
        },
      });
    }
  }, [genreDataList]);

  return (
    <>
      {isMobile ? (
        <Flex
          top="525px"
          position="absolute"
          zIndex="5"
          width="100vw"
          paddingX="10px"
          overflowX="scroll"
          css={{
            '&::-webkit-scrollbar': {
              width: '0',
            },
          }}
        >
          {genreDataList.map((genreData, id) => (
            <Link
              key={id}
              to={`/genre/${genreData.genreId}`}
              as={ReactRouterLink}
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
                <Link
                  key={id}
                  to={`/genre/${genreData.genreId}`}
                  as={ReactRouterLink}
                  height="118px"
                >
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

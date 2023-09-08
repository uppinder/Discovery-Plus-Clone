import React, { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import discoveryIcon from '../Assets/Images/premium_discovery_icon.png';
import percentageIcon from '../Assets/Images/premium_percentage_icon.svg';

import channelAnimalPlanet from '../Assets/Images/premium_channel_animal_planet.png';
import channelBBC from '../Assets/Images/premium_channel_bbc.png';
import channelDiscovery from '../Assets/Images/premium_channel_discovery.png';
import channelDmax from '../Assets/Images/premium_channel_dmax.png';
import channelEurosport from '../Assets/Images/premium_channel_eurosport.png';
import channelHGTV from '../Assets/Images/premium_channel_hgtv.png';
import channelIP from '../Assets/Images/premium_channel_ip.png';
import channelKids from '../Assets/Images/premium_channel_kids.png';
import channelScience from '../Assets/Images/premium_channel_science.png';
import channelTLC from '../Assets/Images/premium_channel_tlc.png';
import channelTrivia from '../Assets/Images/premium_channel_trivia.png';
import channelTurbo from '../Assets/Images/premium_channel_turbo.png';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import premiumCarouselImage1 from '../Assets/Images/premium_show_carousel_image_1.jpeg';
import premiumCarouselImage2 from '../Assets/Images/premium_show_carousel_image_2.jpeg';
import premiumCarouselImage3 from '../Assets/Images/premium_show_carousel_image_3.jpeg';
import premiumCarouselImage4 from '../Assets/Images/premium_show_carousel_image_4.jpeg';

import premiumImageSomething from '../Assets/Images/premium-image-one.jpeg';
import premiumCrown from '../Assets/Images/premium-crown.svg';
import { Check, PaintBrush, Star, X } from '@phosphor-icons/react';

import premiumQuotesLeft from '../Assets/Images/premium-testimonials-quotes-left.svg';
import premiumQuotesRight from '../Assets/Images/premium-testimonials-quotes-right.svg';

const Testimonial = ({ content, name, numOfStars }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      flex="1"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
      border="2px dashed rgb(56, 62, 71)"
      borderRadius="9px"
    >
      <Flex justifyContent="flex-start" paddingLeft="2%" paddingTop="1%">
        <Image src={premiumQuotesLeft} height="28px" width="23px" />
      </Flex>
      <Text
        color="rgb(191, 197, 205)"
        textAlign="center"
        fontSize="1.3em"
        fontWeight="500"
        fontStyle="italic"
        lineHeight="1.51"
        margin="0 42px 42px"
        css={{
          WebkitLineClamp: isMobile ? 3 : 5, // Limit to 3 lines
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          maxHeight: `${isMobile ? '5em' : '10em'}`, // Adjust this to control the number of lines
        }}
      >
        {content}
      </Text>
      <Flex justifyContent="center" alignItems="center" gap="10px">
        <Text color="rgb(155, 161, 169)" fontSize="18px">
          {name}
        </Text>
        <Flex gap="1px">
          {Array(numOfStars)
            .fill(null)
            .map((_, index) => (
              <Star size={16} color="rgb(255, 164, 36)" weight="fill" />
            ))}
          {Array(5 - numOfStars)
            .fill(null)
            .map((_, index) => (
              <Star size={16} color="rgb(108, 114, 122)" weight="fill" />
            ))}
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end" paddingBottom="1%" paddingRight="2%">
        <Image src={premiumQuotesRight} height="28px" width="23px" />
      </Flex>
    </Flex>
  );
};

const PremiumShowCarouselSlide = ({ slideImage, title, desc }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      minHeight="100%"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      gap="10px"
      paddingX="20px"
    >
      <Flex
        order={isMobile ? null : '1'}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          width={isMobile ? '100%' : '60%'}
          height="100%"
          objectFit="cover"
          borderRadius="6px"
          src={slideImage}
        />
      </Flex>
      <Flex
        width={isMobile ? '100%' : '30%'}
        paddingLeft="10px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize={isMobile ? '18px' : '32px'}
          color="white"
          fontWeight="600"
        >
          {title}
        </Text>
        <Text
          fontSize={isMobile ? '14px' : '16px'}
          color="rgb(214, 220, 228)"
          textAlign="center"
        >
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};

function Premium() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [monthly, toggleSubscription] = useState(false);

  const handleClick = duration => {
    if (duration === 'monthly') {
      toggleSubscription(true);
    } else {
      toggleSubscription(false);
    }
  };

  return (
    <Flex
      height="100%"
      width="100vw"
      flexDirection="column"
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="600px" /* Adjust the container height as needed */
        backgroundImage={
          isMobile
            ? null
            : "url('https://ap2-prod-images.disco-api.com/2022/9/5/462ef1ab-6cd4-4d07-86e0-cda83d91c28d.jpg')"
        }
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative" /* Required for overlay */
      >
        {!isMobile && (
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            background="linear-gradient(rgba(26, 28, 33, 0.72), rgba(26, 28, 33, 0.95))"
          ></Box>
        )}

        <Flex
          zIndex="5"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="30px"
          marginTop={isMobile ? '-60px' : '0px'}
        >
          {!isMobile && <Image src={discoveryIcon} />}

          <Text
            fontSize={isMobile ? '24px' : '32px'}
            fontWeight="600"
            lineHeight="1.38"
            letterSpacing="0.64px"
            width="80%"
            textAlign="center"
          >
            Experience Real Life Entertainment Like Never Before with 40+ Genres
            On Discovery Plus.
          </Text>

          <Flex
            marginTop="20px"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            width="100%"
          >
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              background={
                monthly
                  ? 'linear-gradient(121deg, rgb(33, 117, 217) 2%, rgb(39, 137, 255) 97%)'
                  : 'rgb(84, 90, 98)'
              }
              borderRadius="6px"
              height={monthly ? '150px' : '125px'}
              width={isMobile ? '40%' : '20%'}
              cursor="pointer"
              onClick={() => handleClick('monthly')}
            >
              <Text fontSize="24px" lineHeight="1.33" fontWeight="500">
                Monthly
              </Text>
              <Text fontSize="24px" lineHeight="1.33" fontWeight="500">
                ₹199.00
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              background={
                !monthly
                  ? 'linear-gradient(121deg, rgb(33, 117, 217) 2%, rgb(39, 137, 255) 97%)'
                  : 'rgb(84, 90, 98)'
              }
              borderRadius="6px"
              height={!monthly ? '150px' : '125px'}
              width={isMobile ? '40%' : '20%'}
              cursor="pointer"
              onClick={() => handleClick('annual')}
            >
              <Text
                color="rgb(255, 164, 36)"
                fontSize="12px"
                lineHeight="1.33"
                fontWeight="bold"
              >
                RECOMMENDED
              </Text>
              <Text fontSize="24px" lineHeight="1.33" fontWeight="500">
                Annual
              </Text>
              <Text fontSize="24px" lineHeight="1.33" fontWeight="500">
                ₹399.00
              </Text>
            </Flex>
          </Flex>

          <Flex
            border="1.3px dashed rgb(84, 90, 98)"
            backgroundColor="rgb(26, 28, 33)"
            padding="10px 20px"
            borderRadius="6px"
            alignItems="center"
            cursor="pointer"
            gap="5px"
          >
            <Image src={percentageIcon} height="22px" width="22px" />
            <Text color="rgb(155, 161, 169)" fontSize="16px" lineHeight="1.29">
              Apply Voucher
            </Text>
          </Flex>

          <Flex
            justifyContent="center"
            alignItems="center"
            fontSize="20px"
            width="342px"
            height="52px"
            lineHeight="23px"
            fontWeight="700"
            background="linear-gradient( to top, #2175d9, #2789ff )"
            borderRadius="4px"
            cursor="pointer"
          >
            Subscribe Now
          </Flex>
        </Flex>
      </Box>

      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        marginY={isMobile ? '0px' : '58px'}
        paddingX={isMobile ? '5%' : '0'}
        gap="5px"
      >
        <Image
          src={channelAnimalPlanet}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelBBC}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelDiscovery}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelDmax}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelEurosport}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelHGTV}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelIP}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelKids}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '64px' : '128px'}
          objectFit="cover"
        />
        <Image
          src={channelScience}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelTLC}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelTrivia}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
        <Image
          src={channelTurbo}
          width={isMobile ? '80px' : '128px'}
          height={isMobile ? '56px' : '72px'}
          objectFit="cover"
        />
      </Flex>

      <Flex
        height={isMobile ? '330px' : '500px'}
        width="100vw"
        marginY="45px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          color="white"
          fontSize={isMobile ? '18px' : '32px'}
          fontWeight="700"
        >
          Thousands of Premium Shows
        </Text>
        <Swiper
          loop={true}
          autoplay={{ delay: 1000 }}
          pagination={{ enabled: isMobile }}
          navigation={{ enabled: !isMobile }}
          modules={[Navigation, Pagination, Autoplay]}
          className="swiper-premium-show-carousel"
        >
          <SwiperSlide>
            <PremiumShowCarouselSlide
              slideImage={premiumCarouselImage1}
              title={'American Chopper'}
              desc={`The Teutuls are back and Sr. and Jr. forge ahead with their own
            shops.`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PremiumShowCarouselSlide
              slideImage={premiumCarouselImage2}
              title={'Battle Ops'}
              desc={`India's iconic military operations are deciphered and
            depicted.`}
            />
          </SwiperSlide>

          <SwiperSlide>
            <PremiumShowCarouselSlide
              slideImage={premiumCarouselImage3}
              title={'A Haunting'}
              desc={`Eyewitnesses share their terrifying true tales of the
            paranormal.`}
            />
          </SwiperSlide>

          <SwiperSlide>
            <PremiumShowCarouselSlide
              slideImage={premiumCarouselImage4}
              title={'Say Yes To The Dress India'}
              desc={`16 Indian brides-to-be hunt for their perfect dress with
            family & top talent.`}
            />
          </SwiperSlide>
        </Swiper>
      </Flex>

      <Flex
        width="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="35px"
      >
        <Text
          color="white"
          f
          fontSize={isMobile ? '18px' : '36px'}
          fontWeight="700"
          textAlign="center"
        >
          Get Access To discovery+ Exclusive Originals
        </Text>

        <iframe
          width="80%" // Set the width of your video
          height={isMobile ? '50%' : '550'} // Set the height of your video
          src="https://www.youtube.com/embed/VIDEO_ID_HERE" // Replace with your video's URL or embed code
          title="Embedded Video"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </Flex>

      <Flex
        marginTop={isMobile ? '50px' : '100px'}
        width="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="35px"
      >
        <Text
          color="white"
          fontSize={isMobile ? '18px' : '36px'}
          fontWeight="700"
          textAlign="center"
          width="75%"
        >
          Stream on your preferred devices from Android, iOS to Amazon Fire
          Stick and Android TV, Samsung TV and LG TV
        </Text>
        <Image src={premiumImageSomething} />
      </Flex>

      <Flex
        marginTop={isMobile ? '50px' : '100px'}
        width="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="35px"
      >
        <Text
          color="white"
          fontSize={isMobile ? '18px' : '36px'}
          fontWeight="700"
          textAlign="center"
          width="75%"
        >
          Exclusive Premium Benefits
        </Text>

        <TableContainer>
          <Table variant="simple" className="premium-offer-table">
            <Tbody>
              <Tr height={isMobile ? '48px' : '72px'}>
                <Th paddingX={isMobile ? '1rem' : null}>
                  <Text fontSize={isMobile ? '12px' : '24px'} color="white">
                    Content
                  </Text>
                </Th>
                <Th paddingX={isMobile ? '1rem' : null}>
                  <Text
                    fontSize={isMobile ? '12px' : '24px'}
                    color="rgb(191, 197, 205)"
                  >
                    Free
                  </Text>
                </Th>
                <Th
                  backgroundColor="rgb(18, 19, 23)"
                  borderTopLeftRadius="12px"
                  borderTopRightRadius="12px"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Flex alignItems="center" gap="5px">
                    <Text
                      fontSize={isMobile ? '12px' : '24px'}
                      color="rgb(39, 137, 255)"
                      textTransform="none"
                    >
                      Premium
                    </Text>
                    <Image
                      src={premiumCrown}
                      height={isMobile ? '18px' : '32px'}
                      width={isMobile ? '18px' : '32px'}
                    />
                  </Flex>
                </Th>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Shorts
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    discovery+ Originals
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Unlimited and exclusive {isMobile && <br />} BBC & History
                    Content
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Live TV: India + International
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Best of Kids Shows
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Live Sports
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td backgroundColor="rgb(18, 19, 23)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
              <Tr height={isMobile ? '48px' : '68px'}>
                <Td
                  color="rgb(191, 197, 205)"
                  paddingX={isMobile ? '1rem' : null}
                >
                  <Text fontSize={isMobile ? '12px' : '20px'} fontWeight="600">
                    Ad Free Experience
                  </Text>
                </Td>
                <Td>
                  <Center>
                    <X
                      color="#9BA1A9"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
                <Td background="linear-gradient(360deg, rgba(31, 34, 40, 0) 0%, rgb(18, 19, 23) 80%)">
                  <Center>
                    <Check
                      color="rgb(39, 137, 255)"
                      weight="bold"
                      size={isMobile ? 14 : 21}
                    />
                  </Center>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {!isMobile && (
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap="3%"
          marginTop="50px"
          paddingY="24px"
          backgroundColor="rgb(26, 28, 33)"
        >
          <Flex
            backgroundColor="white"
            borderRadius="3.2px"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            padding="16px"
            width="20%"
            height="240px"
            gap="12px"
          >
            <Text
              color="black"
              fontSize="26px"
              lineHeight="1.13"
              fontWeight="bold"
            >
              ₹ 199/month
            </Text>
            <Text
              color="rgb(84, 90, 98)"
              textAlign="center"
              fontSize="22px"
              fontWeight="500"
              lineHeight="1.3"
              height="114px"
            >
              Unlimited access to the greatest real-life entertainment plus
              exclusives and originals
            </Text>
            <Flex
              width="80%"
              height="40px"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              lineHeight="23px"
              fontWeight="700"
              background="linear-gradient( to top, #2175d9, #2789ff )"
              borderRadius="4px"
              cursor="pointer"
            >
              Subscribe Now
            </Flex>
          </Flex>

          <Flex
            backgroundColor="white"
            borderRadius="3.2px"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            padding="16px"
            width="20%"
            height="240px"
            gap="12px"
          >
            <Text
              color="black"
              fontSize="26px"
              lineHeight="1.13"
              fontWeight="bold"
            >
              ₹ 399/month
            </Text>
            <Text
              color="rgb(84, 90, 98)"
              textAlign="center"
              fontSize="22px"
              fontWeight="500"
              lineHeight="1.3"
              height="114px"
            >
              Unlimited access to all that the monthly plan has to offer with{' '}
              <Text as="b">₹1000 in savings</Text>
            </Text>
            <Flex
              width="80%"
              height="40px"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              lineHeight="23px"
              fontWeight="700"
              background="linear-gradient( to top, #2175d9, #2789ff )"
              borderRadius="4px"
              cursor="pointer"
            >
              Subscribe Now
            </Flex>
          </Flex>
        </Flex>
      )}

      <Flex
        marginTop="64px"
        paddingX="8%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        background="radial-gradient(32% 75% at center top, rgb(56, 62, 71), rgb(26, 28, 33))"
      >
        <Text
          color="white"
          fontSize="32px"
          paddingY="35px"
          lineHeight="1.37"
          fontWeight="700"
        >
          User Testimonials
        </Text>

        {isMobile ? (
          <Flex height="260px" width="100%" position="relative">
            <Swiper
              loop={true}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="swiper-premium-testimonial-carousel"
            >
              <SwiperSlide>
                <Testimonial
                  content={
                    'Very reasonable subscription rate and great content.'
                  }
                  name={'Swara'}
                  numOfStars={5}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Testimonial
                  content={`I don't usually rate an app, but this one deserve 5stars. The variety of shows they have is absolutely amazing, no regrets.`}
                  name={'Vaishakh Singh'}
                  numOfStars={5}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Testimonial
                  content={
                    'Looking at the content offered, I immediately subscribed to the annual plan and am loving each and every content! I’m hooked on to the app!'
                  }
                  name={'Rohit Iyer'}
                  numOfStars={4}
                />
              </SwiperSlide>
            </Swiper>
          </Flex>
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="1%"
            height="340px"
            width="90%"
          >
            <Testimonial
              content={'Very reasonable subscription rate and great content.'}
              name={'Swara'}
              numOfStars={5}
            />
            <Testimonial
              content={`I don't usually rate an app, but this one deserve 5stars. The variety of shows they have is absolutely amazing, no regrets.`}
              name={'Vaishakh Singh'}
              numOfStars={5}
            />
            <Testimonial
              content={
                'Looking at the content offered, I immediately subscribed to the annual plan and am loving each and every content! I’m hooked on to the app!'
              }
              name={'Rohit Iyer'}
              numOfStars={4}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Premium;

// TODO
// Finish premium show carousel - 90% done
// - figure out how to move pagination below swiper container
// - styling in desktop screen (might need siddharth's help)

// In mobile screen:
// 1. Replicate the video player on premium page

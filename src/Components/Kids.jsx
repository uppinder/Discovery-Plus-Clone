import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Flex,
  Grid,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import thumbnailImage from '../Assets/Images/kids_hero_thumbnail.png';
import thumbnailImageMobile from '../Assets/Images/kids_hero_thumbnail_mobile.png';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';

function Kids() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex minWidth="100vw" flexDirection="column">
      <ShowCarousel kidsPage={true} />

      {isMobile ? (
        <Flex
          top="540px"
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
                to="/superstars/test"
                as={ReactRouterLink}
                key={index}
                position="relative"
                minWidth="108px"
              >
                <Flex
                  height="100%"
                  flexDirection="column"
                  alignItems="center"
                  gap="5px"
                >
                  <Image
                    src={thumbnailImageMobile}
                    width="400px"
                    height="108px"
                  />
                </Flex>
              </Link>
            ))}
        </Flex>
      ) : (
        <Flex
          marginTop="20px"
          width="100%"
          flexDirection="column"
          gap="10px"
          paddingX="15px"
        >
          <Text fontSize="22px" fontWeight="700">
            Heroes We Love!
          </Text>
          <Flex
            width="100%"
            paddingX="10px"
            gap="12px"
            overflow="scroll"
            css={{
              '&::-webkit-scrollbar': {
                width: '0',
              },
            }}
          >
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <Link key={index} to="/superstars/test" as={ReactRouterLink}>
                  <Image
                    src={thumbnailImage}
                    borderRadius="10px"
                    minHeight="115px"
                    minWidth="190px"
                  />
                </Link>
              ))}
          </Flex>
        </Flex>
      )}

      {/* Shows you love */}
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '0px' : '15px'}
        paddingBottom={isMobile ? '0px' : '22px'}
      >
        <Flex
          width="100%"
          justifyContent="space-between"
          paddingBottom={isMobile ? '6px' : '12px'}
          paddingLeft={isMobile ? '10px' : '16px'}
          paddingRight={isMobile ? '15px' : '24px'}
        >
          <Text
            fontSize={isMobile ? '20px' : '22px'}
            fontWeight="600"
            lineHeight="1.4"
          >
            Shows You Love
          </Text>
          <Link
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>

        {isMobile ? (
          <Flex
            width="100%"
            height="100%"
            paddingX="10px"
            gap="10px"
            overflowY="hidden"
            css={{
              '&::-webkit-scrollbar': {
                width: '0', // Adjust the width as needed
              },
            }}
          >
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <Link
                  key={index}
                  position="relative"
                  minWidth="160px"
                  height="100px"
                >
                  <HomeShowItem isChannelPageMobileView={true} />
                </Link>
              ))}
          </Flex>
        ) : (
          <Grid
            width="100%"
            height="100%"
            paddingX="20px"
            gridTemplateColumns="repeat(4, minmax(0, 100%))"
            gridColumnGap="10px"
          >
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Link key={index} position="relative">
                  <HomeShowItem />
                </Link>
              ))}
          </Grid>
        )}
      </Flex>

      {/* Must Watch EPIC Shows */}
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '0px' : '22px'}
        paddingBottom={isMobile ? '11px' : '22px'}
      >
        <Flex
          width="100%"
          justifyContent="space-between"
          paddingBottom="12px"
          paddingLeft={isMobile ? '10px' : '16px'}
          paddingRight={isMobile ? '15px' : '24px'}
        >
          <Text
            fontSize={isMobile ? '20px' : '22px'}
            fontWeight="600"
            lineHeight="1.4"
          >
            Must Watch EPIC Shows
          </Text>
          <Link
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>

        {isMobile ? (
          <Flex
            width="100%"
            height="100%"
            paddingX="10px"
            gap="10px"
            overflowY="hidden"
            css={{
              '&::-webkit-scrollbar': {
                width: '0', // Adjust the width as needed
              },
            }}
          >
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <Link
                  key={index}
                  position="relative"
                  minWidth="105px"
                  height="140px"
                >
                  <HomeShowItemVertical />
                </Link>
              ))}
          </Flex>
        ) : (
          <Grid
            width="100%"
            height="100%"
            paddingX="20px"
            gridTemplateColumns="repeat(6, minmax(0, 100%))"
            gridColumnGap="10px"
          >
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Link key={index} position="relative">
                  <HomeShowItemVertical />
                </Link>
              ))}
          </Grid>
        )}
      </Flex>
    </Flex>
  );
}

export default Kids;

import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Flex, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';
import GenreCarousel from './GenreCarousel';

function Home() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex minWidth="100vw" flexDirection="column">
      <ShowCarousel />
      <GenreCarousel />

      {/* Shows you love */}
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '0px' : '22px'}
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
            to="/collection-view-all?title=shows-you-love"
            as={ReactRouterLink}
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
                  <HomeShowItem />
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
            to="/collection-view-all?title=must-watch-epic-shows"
            as={ReactRouterLink}
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

export default Home;

// 1. Home Active link implement
// 2. go-premium-web

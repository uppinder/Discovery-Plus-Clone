import { Flex, Grid, Link, Text } from '@chakra-ui/react';
import React from 'react';
import MainCarousel from './MainCarousel';

import HomeShowItem from './HomeShowItem';

function Home() {
  return (
    <Flex minWidth="100vw" flexDirection="column">
      <MainCarousel />

      {/* Shows you love */}
      <Flex width="100%" flexDirection="column" paddingY="22px">
        <Flex
          width="100%"
          justifyContent="space-between"
          paddingBottom="12px"
          paddingLeft="16px"
          paddingRight="24px"
        >
          <Text fontSize="22px" fontWeight="600" lineHeight="1.4">
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
              <Link position="relative">
                <HomeShowItem />
              </Link>
            ))}
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Home;

// 1. When hovered over, the 'New Episodes' overlay should disappear. Additionally, upon hovering, the play button and show description overlays should appear.
// 2. On mobile screens, all shows should appear in the grid and they should be scrollable.

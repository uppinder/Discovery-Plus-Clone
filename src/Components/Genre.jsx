import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeShowItem from './HomeShowItem';

function Genre() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingTop={isMobile ? '60px' : '20px'}
    >
      <Text fontSize="22px" fontWeight="500" lineHeight="1.1" paddingX="20px">
        Shows
      </Text>

      <Grid
        width="100%"
        height="100%"
        paddingY="10px"
        paddingX={isMobile ? '12px' : '30px'}
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 100%))',
          lg: 'repeat(3, minmax(0, 100%))',
          xl: 'repeat(4, minmax(0, 100%))',
        }}
        gridColumnGap="12px"
        gridRowGap="12px"
      >
        {Array(25)
          .fill(null)
          .map((_, index) => (
            <Link key={index}>
              <HomeShowItem isChannelPageMobileView={true} />
            </Link>
          ))}
      </Grid>
    </Flex>
  );
}

export default Genre;

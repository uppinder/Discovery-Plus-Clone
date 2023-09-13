import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import ShowItem from './ShowItem';

function Superstar() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingX="15px"
      paddingY={isMobile ? '0px' : '20px'}
      gap={isMobile ? '5px' : '20px'}
    >
      <Text fontSize="20px" fontWeight="500" lineHeight="1.1">
        Mr Bean Videos
      </Text>
      <Grid
        width="100%"
        height="100%"
        paddingX={isMobile ? '0px' : '25px'}
        gridTemplateColumns={{
          base: 'repeat(1, minmax(0, 100%))',
          lg: 'repeat(3, minmax(0, 100%))',
          xl: 'repeat(4, minmax(0, 100%))',
        }}
        gridColumnGap="10px"
        gridRowGap={isMobile ? '0px' : '75px'}
      >
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <Link
              key={index}
              as={ReactRouterLink}
              to="/video/man-vs-wild/the-rockies"
              position="relative"
              height={isMobile ? null : '190px'}
              _hover={{ textDecoration: 'none' }}
            >
              <ShowItem isShowPageMobileView={isMobile} timeOverlay={true} />
            </Link>
          ))}
      </Grid>
    </Flex>
  );
}

export default Superstar;

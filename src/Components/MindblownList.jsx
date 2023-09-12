import React from 'react';
import { Flex, Grid, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import MindblownListItem from './MindblownListItem';

function MindblownList() {
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const mindblownIdPattern = new RegExp('^/mindblown$');
  const isMindblownPage = mindblownIdPattern.test(location.pathname);
  const isMindblownPageMobileView = isMindblownPage && isMobile;

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      paddingTop={isMindblownPageMobileView ? '0px' : '40px'}
      paddingBottom="20px"
    >
      <Grid
        width="100%"
        height="100%"
        paddingX={isMindblownPageMobileView ? '15px' : '50px'}
        gridTemplateColumns={{
          base: 'repeat(1, minmax(0, 100%))',
          lg: 'repeat(2, minmax(0, 100%))',
          xl: 'repeat(3, minmax(0, 100%))',
        }}
        gridColumnGap={isMindblownPageMobileView ? '13px' : '20px'}
        gridRowGap={isMindblownPageMobileView ? '15px' : '20px'}
      >
        {Array(19)
          .fill(null)
          .map((_, index) => (
            <Link
              to="/mindblown/test"
              as={ReactRouterLink}
              key={index}
              position="relative"
            >
              <MindblownListItem
                isMindblownPageMobileView={isMindblownPageMobileView}
              />
            </Link>
          ))}
      </Grid>
    </Flex>
  );
}

export default MindblownList;

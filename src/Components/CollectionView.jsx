import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Flex, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react';

import HomeShowItem from './HomeShowItem';

function CollectionView() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState({ q: '', type: '' });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('title')) {
      setTitle(queryParams.get('title'));
    }

    if (queryParams.has('q') && queryParams.has('type')) {
      setSearchQuery({
        q: queryParams.get('q'),
        type: queryParams.get('type'),
      });
    }
  }, [location]);

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingTop={isMobile ? '10px' : '20px'}
    >
      {title === '' ? (
        <>
          <Flex
            alignItems="center"
            gap="10px"
            borderBottom="solid 1px #393e46"
            paddingBottom="15px"
          >
            <Text
              color="#979797"
              fontSize="15px"
              fontWeight="500"
              lineHeight="1.1"
              paddingLeft="20px"
            >
              Showing Results for:{' '}
            </Text>
            <Text
              color="#fff"
              fontSize="15px"
              fontWeight="600"
              lineHeight="1.1"
            >
              {searchQuery.q} {'>'} {searchQuery.type}
            </Text>
          </Flex>
          <Text
            fontSize="22px"
            fontWeight="500"
            lineHeight="1.1"
            paddingTop="15px"
            paddingX="20px"
            textTransform="capitalize"
          >
            {searchQuery.type}
          </Text>
        </>
      ) : (
        <Text fontSize="22px" fontWeight="500" lineHeight="1.1" paddingX="20px">
          {title
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Text>
      )}

      <Grid
        width="100%"
        height="100%"
        paddingY="20px"
        paddingX={isMobile ? '12px' : '30px'}
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 100%))',
          lg: 'repeat(3, minmax(0, 100%))',
          xl: 'repeat(4, minmax(0, 100%))',
        }}
        gridColumnGap={isMobile ? '12px' : '16px'}
        gridRowGap={isMobile ? '12px' : '18px'}
      >
        {Array(25)
          .fill(null)
          .map((_, index) => (
            <Link to="/show/test" as={ReactRouterLink} key={index}>
              <HomeShowItem isChannelPageMobileView={true} />
            </Link>
          ))}
      </Grid>
    </Flex>
  );
}

export default CollectionView;

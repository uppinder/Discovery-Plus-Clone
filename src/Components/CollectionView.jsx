import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchCollectionsData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  Flex,
  Grid,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import HomeShowItem from './HomeShowItem';

function CollectionView() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const location = useLocation();
  const [collectionId, setCollectionId] = useState('');
  const [searchQuery, setSearchQuery] = useState({ q: '', type: '' });

  const collectionData = useSelector(state => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('id')) {
      const collId = queryParams.get('id');
      setCollectionId(collId);
      if (isEmpty(collectionData[collId])) {
        dispatch(fetchCollectionsData({ id: collId }, false));
      }
    }

    // if (queryParams.has('q') && queryParams.has('type')) {
    //   setSearchQuery({
    //     q: queryParams.get('q'),
    //     type: queryParams.get('type'),
    //   });

    //   if (isEmpty(collectionData)) {
    //     dispatch(fetchCollectionsData(searchQuery, true));
    //   }
    // }

    console.log(collectionData);
  }, [dispatch, location, collectionData, collectionId]);

  if (isEmpty(collectionData[collectionId])) {
    return (
      <Flex
        minWidth="100vw"
        height="400px"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" speed="0.56s" />
      </Flex>
    );
  } else {
    return (
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '10px' : '20px'}
      >
        {isEmpty(collectionId) ? (
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
          <Text
            fontSize="22px"
            fontWeight="500"
            lineHeight="1.1"
            paddingX="20px"
          >
            {collectionData[collectionId]['title']}
          </Text>
        )}

        {!isEmpty(collectionData[collectionId]['showList']) && (
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
            {collectionData[collectionId]['showList'].map((showData, id) => (
              <Link to={`/show/${showData.id}`} as={ReactRouterLink} key={id}>
                <HomeShowItem {...showData} isChannelPageMobileView={true} />
              </Link>
            ))}
          </Grid>
        )}
      </Flex>
    );
  }
}

export default CollectionView;

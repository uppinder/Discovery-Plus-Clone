import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Flex,
  Grid,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import HomeShowItem from './HomeShowItem';
import { fetchGenreListData } from '../Actions';

function Genre() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const genreId = useParams().genreId;
  const genreShowListData = useSelector(state => state.genreShowListData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(genreShowListData[genreId])) {
      dispatch(fetchGenreListData(genreId));
    }
  }, [dispatch, genreId, genreShowListData]);

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingTop={isMobile ? '60px' : '20px'}
    >
      <Text fontSize="22px" fontWeight="500" lineHeight="1.1" paddingX="20px">
        Shows
      </Text>

      {isEmpty(genreShowListData[genreId]) ? (
        <Flex
          minWidth="100vw"
          height="400px"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" speed="0.56s" />
        </Flex>
      ) : (
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
          gridColumnGap={isMobile ? '12px' : '16px'}
          gridRowGap={isMobile ? '12px' : '18px'}
        >
          {genreShowListData[genreId].map((showData, index) => (
            <Link to={`/show/${showData.id}`} as={ReactRouterLink} key={index}>
              <HomeShowItem {...showData} isChannelPageMobileView={true} />
            </Link>
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default Genre;

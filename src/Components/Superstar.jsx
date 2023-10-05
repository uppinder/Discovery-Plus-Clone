import React, { useEffect } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchSuperstarData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowItem from './ShowItem';

function Superstar() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { pathname } = useLocation();
  const superstarId = pathname.split('/').at(-1);

  const superstarData = useSelector(state => state.superstars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(superstarData[superstarId]) && !isEmpty(superstarId)) {
      dispatch(fetchSuperstarData(superstarId));
    }
  }, [dispatch, superstarData, superstarId]);

  if (superstarId === 'fukrey-boys') {
    return (
      <Flex>
        <Image
          src="https://ap2-prod-images.disco-api.com/2021/02/10/ee6a9b9e-f306-471a-b9bc-ec60f876a863.png?bf=0&f=jpg&p=true&q=85&w=900"
          objectPosition="center top"
          width="100%"
        />
      </Flex>
    );
  } else if (isEmpty(superstarData[superstarId])) {
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
        paddingX="15px"
        paddingY={isMobile ? '0px' : '20px'}
        marginBottom={isMobile ? '0px' : '25px'}
        gap={isMobile ? '5px' : '20px'}
      >
        <Text
          fontSize="20px"
          fontWeight="500"
          lineHeight="1.1"
          textTransform="capitalize"
        >
          {superstarId.split('-').join(' ') + ' videos'}
        </Text>
        <Grid
          width="100%"
          height="100%"
          paddingX={isMobile ? '0px' : '10px'}
          gridTemplateColumns={{
            base: 'repeat(1, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap="12px"
          gridRowGap={isMobile ? '0px' : '85px'}
        >
          {superstarData[superstarId].map((episode, id) => (
            <Link
              key={id}
              as={ReactRouterLink}
              to={`/video/${superstarId}/${episode.id}`}
              position="relative"
              height={isMobile ? null : '190px'}
              _hover={{ textDecoration: 'none' }}
            >
              <ShowItem
                {...episode}
                isShowPageMobileView={isMobile}
                timeOverlay={true}
              />
            </Link>
          ))}
        </Grid>
      </Flex>
    );
  }
}

export default Superstar;

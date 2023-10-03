import React, { useEffect } from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchMindblownListData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Grid,
  Link,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';

import MindblownListItem from './MindblownListItem';

function MindblownList() {
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const mindblownIdPattern = new RegExp('^/mindblown$');
  const isMindblownPage = mindblownIdPattern.test(location.pathname);
  const isMindblownPageMobileView = isMindblownPage && isMobile;

  const mindblownListData = useSelector(state => state.mindblownList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(mindblownListData)) {
      dispatch(fetchMindblownListData());
    }
  }, [dispatch, mindblownListData]);

  if (isEmpty(mindblownListData)) {
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
          {mindblownListData.map((mindblownData, _) => (
            <Link
              to={`/mindblown/${mindblownData['id']}`}
              as={ReactRouterLink}
              key={mindblownData['id']}
              position="relative"
            >
              <MindblownListItem {...mindblownData} />
            </Link>
          ))}
        </Grid>
      </Flex>
    );
  }
}

export default MindblownList;

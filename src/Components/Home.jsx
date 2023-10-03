import React, { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchHomeData } from '../Actions';

import {
  Flex,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';
import GenreCarousel from './GenreCarousel';

function Home() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const homeData = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(homeData)) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, homeData]);

  if (isEmpty(homeData)) {
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
      <Flex minWidth="100vw" flexDirection="column">
        <ShowCarousel carouselData={homeData['homeCarouselShowsList']} />
        <GenreCarousel genreDataList={homeData['homeGenreList']} />

        {homeData['homeShowLists'].map((homeShowListData, _) => (
          <Flex
            key={homeShowListData['id']}
            width="100%"
            flexDirection="column"
            paddingTop={isMobile ? '0px' : '22px'}
            paddingBottom={isMobile ? '0px' : '22px'}
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              paddingBottom={isMobile ? '8px' : '12px'}
              paddingLeft={isMobile ? '10px' : '16px'}
              paddingRight={isMobile ? '15px' : '24px'}
            >
              <Text
                fontSize={isMobile ? '18px' : '22px'}
                fontWeight="600"
                lineHeight="1.4"
              >
                {homeShowListData['title']}
              </Text>
              <Link
                to={`/collection-view-all?id=${homeShowListData['id']}`}
                as={ReactRouterLink}
                color="#838991"
                fontSize={isMobile ? '16px' : '18px'}
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
                {homeData[homeShowListData['id']].map((showData, _) => (
                  <Link
                    key={showData['id']}
                    to={`/show/${showData['id']}`}
                    as={ReactRouterLink}
                    position="relative"
                    minWidth={
                      homeShowListData['showCardOrientation'] === 'horizontal'
                        ? '160px'
                        : '105px'
                    }
                    height={
                      homeShowListData['showCardOrientation'] === 'horizontal'
                        ? '100px'
                        : '140px'
                    }
                  >
                    {homeShowListData['showCardOrientation'] ===
                    'horizontal' ? (
                      <HomeShowItem
                        {...showData}
                        isChannelPageMobileView={true}
                      />
                    ) : (
                      <HomeShowItemVertical {...showData} />
                    )}
                  </Link>
                ))}
              </Flex>
            ) : (
              <Flex width="100%" height="100%" paddingX="20px" gap="10px">
                {homeData[homeShowListData['id']]
                  .slice(
                    0,
                    homeShowListData['showCardOrientation'] === 'horizontal'
                      ? 4
                      : 6
                  )
                  .map((showData, _) => (
                    <Link
                      key={showData['id']}
                      to={`/show/${showData['id']}`}
                      as={ReactRouterLink}
                      position="relative"
                      width="100%"
                    >
                      {homeShowListData['showCardOrientation'] ===
                      'horizontal' ? (
                        <HomeShowItem {...showData} />
                      ) : (
                        <HomeShowItemVertical {...showData} />
                      )}
                    </Link>
                  ))}
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    );
  }
}

export default Home;

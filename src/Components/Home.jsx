import React, { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchShowList } from '../Actions';

import { Flex, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';
import GenreCarousel from './GenreCarousel';

function Home() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const homeData = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true);
    if (isEmpty(homeData)) {
      dispatch(fetchShowList());
    }

    console.log(homeData);
    // setLoading(false);
  }, [dispatch, homeData]);

  return (
    <Flex minWidth="100vw" flexDirection="column">
      <ShowCarousel carouselData={homeData['homeCarouselShowsList']} />
      <GenreCarousel genreDataList={homeData['homeGenreList']} />

      {!isEmpty(homeData) &&
        homeData['homeShowLists'].map((homeShowListData, id) => (
          <Flex
            key={id}
            width="100%"
            flexDirection="column"
            paddingTop={isMobile ? '0px' : '22px'}
            paddingBottom={isMobile ? '0px' : '22px'}
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              paddingBottom={isMobile ? '6px' : '12px'}
              paddingLeft={isMobile ? '10px' : '16px'}
              paddingRight={isMobile ? '15px' : '24px'}
            >
              <Text
                fontSize={isMobile ? '20px' : '22px'}
                fontWeight="600"
                lineHeight="1.4"
              >
                {homeShowListData['title']}
              </Text>
              <Link
                to={`/collection-view-all?title=${homeShowListData['id']}`}
                as={ReactRouterLink}
                color="#838991"
                fontSize="18px"
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
                {homeShowListData['showList'].map((showData, index) => (
                  <Link
                    key={index}
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
              <Grid
                width="100%"
                height="100%"
                paddingX="20px"
                gridTemplateColumns={
                  homeShowListData['showCardOrientation'] === 'horizontal'
                    ? 'repeat(4, minmax(0, 100%))'
                    : 'repeat(6, minmax(0, 100%))'
                }
                gridColumnGap="10px"
              >
                {homeShowListData['showList']
                  .splice(0, 4)
                  .map((showData, index) => (
                    <Link
                      key={index}
                      to={`/show/${showData['id']}`}
                      as={ReactRouterLink}
                      position="relative"
                    >
                      <HomeShowItem {...showData} />
                    </Link>
                  ))}
              </Grid>
            )}
          </Flex>
        ))}
    </Flex>
  );
}

export default Home;

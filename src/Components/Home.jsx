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

  //   const verticalMetadata = {
  //     title: 'Raja Rasoi Aur Anya Kahaaniyan',
  //     desc: 'Explore the history and flavors of regional Indian cuisine.',
  //     isPremium: true,
  //     thumbnail: 'assets/images/shows_vertical_test_1.jpeg',
  //   };

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
                {Array(8)
                  .fill(
                    isEmpty(homeData)
                      ? {}
                      : homeData['homeShowLists'][0]['showList']
                  )
                  .map((metadata, index) => (
                    <Link
                      key={index}
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
                          {...metadata}
                          isChannelPageMobileView={true}
                        />
                      ) : (
                        <HomeShowItemVertical {...metadata} />
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
                {Array(4)
                  .fill(
                    isEmpty(homeData)
                      ? {}
                      : homeData['homeShowLists'][0]['showList']
                  )
                  .map((metadata, index) => (
                    <Link key={index} position="relative">
                      <HomeShowItem {...metadata} />
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

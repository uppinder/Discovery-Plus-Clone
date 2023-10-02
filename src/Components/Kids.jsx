import React, { useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchKidsData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShowCarousel from './ShowCarousel';

import HomeShowItem from './HomeShowItem';
import HomeShowItemVertical from './HomeShowItemVertical';

function Kids() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const kidsData = useSelector(state => state.kids);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(kidsData)) {
      dispatch(fetchKidsData());
    }

    console.log(kidsData);
  }, [dispatch, kidsData]);

  if (isEmpty(kidsData)) {
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
        <ShowCarousel
          kidsPage={true}
          carouselData={kidsData['kidsCarouselShowsList']}
        />

        {/* Superstar List */}
        {isMobile ? (
          <Flex
            top="540px"
            position="absolute"
            zIndex="5"
            width="100vw"
            paddingX="10px"
            overflowX="scroll"
            css={{
              '&::-webkit-scrollbar': {
                width: '0',
              },
            }}
          >
            {kidsData['kidsSuperstarsList'].map((superstarData, _) => (
              <Link
                key={superstarData['superstarId']}
                to={`/superstars/${superstarData['superstarId']}`}
                as={ReactRouterLink}
                position="relative"
                minWidth="108px"
              >
                <Flex
                  height="100%"
                  flexDirection="column"
                  alignItems="center"
                  gap="5px"
                >
                  <Image
                    src={superstarData['superstarImageUrlMobile']}
                    width="400px"
                    height="108px"
                  />
                </Flex>
              </Link>
            ))}
          </Flex>
        ) : (
          <Flex
            marginTop="20px"
            width="100%"
            flexDirection="column"
            gap="10px"
            paddingX="15px"
          >
            <Text fontSize="22px" fontWeight="700">
              Heroes We Love!
            </Text>
            <Flex
              width="100%"
              paddingX="10px"
              gap="12px"
              overflow="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  width: '0',
                },
              }}
            >
              {kidsData['kidsSuperstarsList'].map((superstarData, _) => (
                <Link
                  key={superstarData['superstarId']}
                  to={`/superstars/${superstarData['superstarId']}`}
                  as={ReactRouterLink}
                >
                  <Image
                    src={superstarData['superstarImageUrl']}
                    borderRadius="10px"
                    minHeight="115px"
                    minWidth="190px"
                  />
                </Link>
              ))}
            </Flex>
          </Flex>
        )}

        {/* Show Lists */}
        {kidsData['kidsShowLists'].map((kidsShowListData, _) => (
          <Flex
            key={kidsShowListData['id']}
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
                {kidsShowListData['title']}
              </Text>
              <Link
                to={`/collection-view-all?id=${kidsShowListData['id']}`}
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
                {kidsData[kidsShowListData['id']].map((showData, _) => (
                  <Link
                    key={showData['id']}
                    to={`/show/${showData['id']}`}
                    as={ReactRouterLink}
                    position="relative"
                    minWidth={
                      kidsShowListData['showCardOrientation'] === 'horizontal'
                        ? '160px'
                        : '105px'
                    }
                    height={
                      kidsShowListData['showCardOrientation'] === 'horizontal'
                        ? '100px'
                        : '140px'
                    }
                  >
                    {kidsShowListData['showCardOrientation'] ===
                    'horizontal' ? (
                      <homeShowItem
                        {...showData}
                        isChannelPageMobileView={true}
                      />
                    ) : (
                      <homeShowItemVertical {...showData} />
                    )}
                  </Link>
                ))}
              </Flex>
            ) : (
              <Flex width="100%" height="100%" paddingX="20px" gap="10px">
                {kidsData[kidsShowListData['id']]
                  .slice(
                    0,
                    kidsShowListData['showCardOrientation'] === 'horizontal'
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
                      {kidsShowListData['showCardOrientation'] ===
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

export default Kids;

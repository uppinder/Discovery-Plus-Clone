import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowData } from '../Actions';

import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import {
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import { DotOutline, Heart, Play, ShareNetwork } from '@phosphor-icons/react';
import ShowItem from './ShowItem';

const HoverableButton = ({ iconType, text, isShowPageMobileView = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      gap="6px"
      width={isShowPageMobileView ? '50%' : null}
      height="fit-content"
      justifyContent="center"
      alignItems="center"
      borderRadius="4px"
      border={`1px solid ${
        isHovered ? '#d6dce4' : isShowPageMobileView ? '#383e47' : '#9ba1a9'
      }`}
      padding="8px 36px"
      cursor="pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconType === 'heart' && (
        <Heart size={20} color={isHovered ? 'white' : '#9ba1a9'} />
      )}
      {iconType === 'share' && (
        <ShareNetwork size={20} color={isHovered ? 'white' : '#9ba1a9'} />
      )}
      <Text
        color={isHovered ? 'white' : '#9ba1a9'}
        fontSize="14px"
        lineHeight="1.33"
      >
        {text}
      </Text>
    </Flex>
  );
};

function Show() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const location = useLocation();
  const showIdPattern = new RegExp('^/show/[A-Za-z0-9-_]+$');
  const isShowPage = showIdPattern.test(location.pathname);
  const isShowPageMobileView = isShowPage && isMobile;

  const showId = useParams().showId;
  const showListData = useSelector(state => state.showListData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(showListData[showId])) {
      dispatch(fetchShowData(showId));
    }

    // console.log(showListData);
  }, [dispatch, showId, showListData]);

  const handleTabsChange = index => {
    console.log(index);
  };

  if (isEmpty(showListData[showId])) {
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
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Flex
          marginY="1%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={isMobile ? '100%' : '80%'}
        >
          {/* Thumbnail */}
          <Image
            src={showListData[showId]['banner']}
            borderRadius={isShowPageMobileView ? '0px' : '10px'}
          />

          {/* Description */}
          <Flex
            width="100%"
            marginY="14px"
            justifyContent="space-between"
            paddingX={isShowPageMobileView ? '14px' : '0px'}
          >
            {/* Left side */}
            <Flex flexDirection="column" gap="12px" flex="1">
              <Flex alignItems="center" gap="12px">
                {!isShowPageMobileView && (
                  <Image src={premiumIcon} width="30px" height="30px" />
                )}
                <Text
                  fontSize={isShowPageMobileView ? '18px' : '28px'}
                  color="white"
                  fontWeight="600"
                >
                  {showListData[showId]['title']}
                </Text>
              </Flex>

              <Flex>
                {isShowPageMobileView && (
                  <Image src={premiumIcon} width="24px" height="24px" />
                )}
                {showListData[showId]['genres'].map((genre, id) => (
                  <Flex key={id} alignItems="center">
                    <DotOutline color="#838991" weight="fill" />
                    <Text color="#bfc5cd" fontWeight="500" fontSize="14px">
                      {genre}
                    </Text>
                  </Flex>
                ))}
              </Flex>

              <Flex width="100%" flexDirection="column" gap="12px">
                <Flex
                  width={isShowPageMobileView ? '100%' : 'fit-content'}
                  height="40px"
                  borderRadius="4px"
                  backgroundColor="#2175d9"
                  justifyContent="center"
                  alignItems="center"
                  gap="5px"
                  padding="10px 12px"
                  cursor="pointer"
                  order={isShowPageMobileView ? '2' : '1'}
                >
                  <Play size={18} color="white" weight="fill" />
                  <Text color="white" fontWeight="700" lineHeight="1.2">
                    Watch Now
                  </Text>
                </Flex>

                <Text
                  order={isShowPageMobileView ? '1' : '2'}
                  color="#9ba1a9"
                  lineHeight="1.43"
                  fontWeight="500"
                  fontSize={isShowPageMobileView ? '12px' : '15px'}
                >
                  {showListData[showId]['desc']}
                </Text>
              </Flex>

              {isShowPageMobileView && (
                <Flex gap="10px">
                  <HoverableButton
                    iconType="heart"
                    text={'Favourite'}
                    isShowPageMobileView={true}
                  />
                  <HoverableButton
                    iconType="share"
                    text={'Share'}
                    isShowPageMobileView={true}
                  />
                </Flex>
              )}

              <Text
                color="#9ba1a9"
                lineHeight="1.43"
                fontWeight="500"
                fontSize={isShowPageMobileView ? '12px' : '15px'}
              >
                {showListData[showId]['rating'].replaceAll('DOT', '•')}
              </Text>
            </Flex>

            {/* Right side */}
            {!isMobile && (
              <Flex
                flex="1"
                alignItems="flex-end"
                flexDirection="column"
                gap="15px"
              >
                <Flex gap="10px">
                  <HoverableButton iconType="heart" text={'Favourite'} />
                  <HoverableButton iconType="share" text={'Share'} />
                </Flex>

                <Flex gap="5px" alignItems="center" flexDirection="row">
                  <Text color="#bfc5cd" fontSize="14px">
                    Languages
                  </Text>
                  <Flex
                    justifyContent="center"
                    flexWrap="wrap"
                    gap="5px"
                    width="90%"
                  >
                    {showListData[showId]['languages'].map((lang, idx) => (
                      <Text key={idx} color="#9ba1a9" fontSize="12px">
                        {lang}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Divider />
          {/* Episodes */}

          <Flex width="100%">
            <Tabs align="start" isFitted={isShowPageMobileView}>
              <TabList color="#9ba1a9" border="transparent" gap="24px">
                <Tab
                  paddingX="0"
                  fontSize="18px"
                  fontWeight="700"
                  _selected={{
                    borderColor: 'white',
                    color: 'white',
                  }}
                  _hover={{ color: 'white' }}
                >
                  Episodes
                </Tab>
                <Tab
                  paddingX="0"
                  fontSize="18px"
                  fontWeight="700"
                  _selected={{
                    borderColor: 'white',
                    color: 'white',
                  }}
                  _hover={{ color: 'white' }}
                >
                  Shorts
                </Tab>
              </TabList>

              <TabPanels width="100%">
                <TabPanel
                  paddingLeft="4px"
                  paddingTop="15px"
                  paddingRight="4px"
                >
                  <Tabs variant="unstyled" isLazy onChange={handleTabsChange}>
                    <TabList
                      color="#838991"
                      gap="10px"
                      paddingLeft={isShowPageMobileView ? '8px' : '0'}
                    >
                      {Array(showListData[showId]['numOfSeasons'])
                        .slice(0, 4)
                        .fill({})
                        .map((_, id) => (
                          <Tab
                            key={id}
                            fontWeight="500"
                            padding="3px 6px"
                            fontSize="14px"
                            _selected={{
                              color: 'white',
                              bg: `${
                                isShowPageMobileView ? '#262931' : '#545a62'
                              }`,
                              borderRadius: '2px',
                            }}
                            _hover={{ color: 'white' }}
                          >
                            {`Season ${id + 1}`}
                          </Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                      <TabPanel paddingX={isShowPageMobileView ? '6px' : '0'}>
                        <Grid
                          width="100%"
                          height="100%"
                          gridTemplateColumns={{
                            base: 'repeat(1, minmax(0, 100%))',
                            md: 'repeat(3, minmax(0, 100%))',
                            lg: 'repeat(4, minmax(0, 100%))',
                            xl: 'repeat(5, minmax(0, 100%))',
                          }}
                          gridColumnGap="12px"
                          gridRowGap={isShowPageMobileView ? '2px' : '32px'}
                        >
                          {showListData[showId]['episodes'].map(
                            (episodeData, index) => (
                              <Link
                                key={index}
                                as={ReactRouterLink}
                                to={`/video/${showId}/${episodeData['id']}`}
                                position="relative"
                                height={isShowPageMobileView ? null : '190px'}
                                _hover={{ textDecoration: 'none' }}
                              >
                                <ShowItem
                                  {...episodeData}
                                  isShowPageMobileView={isShowPageMobileView}
                                  timeOverlay={true}
                                />
                              </Link>
                            )
                          )}
                        </Grid>
                      </TabPanel>
                      <TabPanel paddingX="0">Season 2</TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>

                <TabPanel paddingX="0">Shorts</TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Show;

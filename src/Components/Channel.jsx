import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannelListData, updateChannelCarouselData } from '../Actions';

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
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import channelImage from '../Assets/Images/show_image.jpeg';
import HomeShowItem from './HomeShowItem';
import ChannelCarousel from './ChannelCarousel';
import { isEmpty } from 'lodash';

function Channel() {
  const channelId = useParams().channelId;
  const channelCarouselData = useSelector(state => state.channelCarouselData);
  const channelShowListData = useSelector(state => state.channelShowListData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateChannelCarouselData(channelId));
    if (isEmpty(channelShowListData[channelId])) {
      dispatch(fetchChannelListData(channelId));
    }
  }, [dispatch, channelId, channelShowListData]);

  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const channelIdPattern = new RegExp('^/channel/[A-Za-z0-9-_]+$');
  const isChannelPage = channelIdPattern.test(location.pathname);
  const isChannelPageMobileView = isChannelPage && isMobile;

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      paddingTop={isChannelPageMobileView ? '0px' : '20px'}
      paddingBottom="20px"
    >
      <Flex
        flexDirection="column"
        width={isChannelPageMobileView ? '100%' : '80%'}
        backgroundColor={isChannelPageMobileView ? '#121317' : '#1a1c21'}
        gap={isChannelPageMobileView ? '12px' : '20px'}
        position={isChannelPageMobileView ? 'sticky' : null}
        top={isChannelPageMobileView ? '0' : null}
        zIndex={isChannelPageMobileView ? '9' : null}
      >
        <Image src={channelImage} />

        <Text
          fontSize="24px"
          fontWeight="500"
          lineHeight="1.1"
          paddingX={isChannelPageMobileView ? '6px' : '0'}
        >
          {channelCarouselData[0]['title']}
        </Text>

        {isChannelPageMobileView && <Divider width="95%" marginX="auto" />}

        {isChannelPageMobileView && (
          <Flex
            width="100vw"
            paddingX="10px"
            overflowX="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {channelCarouselData.map((channelItem, index) => (
              <Link
                key={index}
                to={`/channel/${channelItem.id}`}
                as={ReactRouterLink}
                position="relative"
                minWidth="80px"
                paddingBottom="20px"
                borderBottom={index === 0 ? '4px solid #2175d9' : null}
              >
                <Flex height="100%" flexDirection="column" alignItems="center">
                  <Image
                    src={channelItem.thumbnailMobile}
                    width="70px"
                    height="70px"
                  />
                </Flex>
              </Link>
            ))}
          </Flex>
        )}
      </Flex>

      {!isChannelPageMobileView && (
        <ChannelCarousel channelCarouselData={channelCarouselData} />
      )}

      <Flex
        width="100%"
        flexDirection="column"
        marginTop="20px"
        paddingX="1%"
        gap="12px"
      >
        <Text fontSize="20px" fontWeight="600" lineHeight="1.1">
          {channelCarouselData[0]['title']} Shows
        </Text>

        {isEmpty(channelShowListData[channelId]) ? (
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
            paddingX={isChannelPageMobileView ? '5px' : '20px'}
            gridTemplateColumns={{
              base: 'repeat(2, minmax(0, 100%))',
              lg: 'repeat(3, minmax(0, 100%))',
              xl: 'repeat(4, minmax(0, 100%))',
            }}
            gridColumnGap={isChannelPageMobileView ? '13px' : '16px'}
            gridRowGap={isChannelPageMobileView ? '10px' : '20px'}
          >
            {channelShowListData[channelId].map((showData, index) => (
              <Link key={index} position="relative">
                <HomeShowItem
                  {...showData}
                  isChannelPageMobileView={isChannelPageMobileView}
                />
              </Link>
            ))}
          </Grid>
        )}
      </Flex>
    </Flex>
  );
}

export default Channel;

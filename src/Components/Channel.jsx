import React from 'react';
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
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import channelImage from '../Assets/Images/show_image.jpeg';
import channelImageMobile from '../Assets/Images/channel_carousel_image_mobile.png';
import HomeShowItem from './HomeShowItem';
import ChannelCarousel from './ChannelCarousel';

function Channel() {
  const channelId = useParams().channelId;
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
          Animal Planet
        </Text>

        {isChannelPageMobileView && <Divider width="95%" marginX="auto" />}

        {isChannelPageMobileView ? (
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
            {Array(11)
              .fill(null)
              .map((_, index) => (
                <Link
                  key={index}
                  to="/channel/test"
                  as={ReactRouterLink}
                  position="relative"
                  minWidth="80px"
                  paddingBottom="20px"
                  borderBottom={index === 0 ? '4px solid #2175d9' : null}
                >
                  <Flex
                    height="100%"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Image
                      src={channelImageMobile}
                      width="70px"
                      height="70px"
                    />
                  </Flex>
                </Link>
              ))}
          </Flex>
        ) : (
          <></>
        )}
      </Flex>

      {!isChannelPageMobileView && <ChannelCarousel />}

      <Flex
        width="100%"
        flexDirection="column"
        marginTop="20px"
        paddingX="1%"
        gap="12px"
      >
        <Text fontSize="20px" fontWeight="600" lineHeight="1.1">
          Animal Planet Shows
        </Text>

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
          {Array(19)
            .fill(null)
            .map((_, index) => (
              <Link key={index} position="relative">
                <HomeShowItem
                  isChannelPageMobileView={isChannelPageMobileView}
                />
              </Link>
            ))}
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Channel;

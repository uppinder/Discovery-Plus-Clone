import { Flex, Grid, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import channelImage from '../Assets/Images/show_image.jpeg';
import HomeShowItem from './HomeShowItem';

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
        width={isChannelPageMobileView ? '100%' : '80%'}
        flexDirection="column"
        backgroundColor="#1a1c21"
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

        <Flex width="100%" height="50px"></Flex>
      </Flex>

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

// Channel Carousel

import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Grid, Link, Text, useBreakpointValue } from '@chakra-ui/react';

import channelAnimalPlanet from '../Assets/Images/premium_channel_animal_planet.png';
import channelDiscovery from '../Assets/Images/premium_channel_discovery.png';
import channelDmax from '../Assets/Images/premium_channel_dmax.png';
import channelEurosport from '../Assets/Images/premium_channel_eurosport.png';
import channelHGTV from '../Assets/Images/premium_channel_hgtv.png';
import channelIP from '../Assets/Images/premium_channel_ip.png';
import channelKids from '../Assets/Images/premium_channel_kids.png';
import channelScience from '../Assets/Images/premium_channel_science.png';
import channelTLC from '../Assets/Images/premium_channel_tlc.png';
import channelTrivia from '../Assets/Images/premium_channel_trivia.png';
import channelTurbo from '../Assets/Images/premium_channel_turbo.png';

import channelBBC from '../Assets/Images/explore_bbc.jpeg';
import channelAnE from '../Assets/Images/explore_ane.jpeg';
import channelAllAccess from '../Assets/Images/explore_all-access.jpeg';
import channelMindBlown from '../Assets/Images/explore_mindblown.jpeg';

import ChannelItem from './ChannelItem';
import ExploreItem from './ExploreItem';

function Explore() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      width="100%"
      flexDirection="column"
      paddingTop={isMobile ? '10px' : '40px'}
    >
      <Flex paddingX="40px" flexDirection="column" gap="16px">
        <Text fontSize="24px" fontWeight="500" lineHeight="1.1">
          Live Channels
        </Text>

        <Grid
          width="100%"
          height="100%"
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            md: 'repeat(4, minmax(0, 100%))',
            lg: 'repeat(5, minmax(0, 100%))',
            xl: 'repeat(7, minmax(0, 100%))',
          }}
          gridColumnGap="10px"
          gridRowGap="12px"
        >
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelAnimalPlanet} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelDiscovery} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelDmax} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelEurosport} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelHGTV} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelIP} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelKids} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelScience} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelTLC} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelTrivia} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ChannelItem thumbnail={channelTurbo} />
          </Link>
        </Grid>

        <Text
          marginTop="50px"
          fontSize="24px"
          fontWeight="500"
          lineHeight="1.1"
        >
          Explore Shows and Full Episodes
        </Text>
        <Grid
          width="100%"
          height="100%"
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            md: 'repeat(4, minmax(0, 100%))',
            lg: 'repeat(5, minmax(0, 100%))',
            xl: 'repeat(7, minmax(0, 100%))',
          }}
          gridColumnGap="12px"
          gridRowGap="12px"
        >
          <Link to="/channel/test" as={ReactRouterLink}>
            <ExploreItem thumbnail={channelBBC} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ExploreItem thumbnail={channelAnE} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ExploreItem thumbnail={channelAllAccess} />
          </Link>
          <Link to="/channel/test" as={ReactRouterLink}>
            <ExploreItem thumbnail={channelMindBlown} />
          </Link>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Explore;

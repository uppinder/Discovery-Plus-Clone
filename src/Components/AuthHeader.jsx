import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Image, Link, useBreakpointValue } from '@chakra-ui/react';

import discoveryHeaderLogo from '../Assets/Images/discovery_header_logo.png';

function AuthHeader() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex width="100%" backgroundColor="#121317">
      <Link to="/home" as={ReactRouterLink} marginX={isMobile ? 'auto' : null}>
        <Image
          src={discoveryHeaderLogo}
          width="190px"
          marginLeft={isMobile ? null : '42px'}
          marginY="30px"
        />
      </Link>
    </Flex>
  );
}

export default AuthHeader;

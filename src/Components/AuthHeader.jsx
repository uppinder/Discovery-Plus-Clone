import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Image, Link } from '@chakra-ui/react';

import discoveryHeaderLogo from '../Assets/Images/discovery_header_logo.png';

function AuthHeader() {
  return (
    <Flex width="100%" backgroundColor="#121317">
      <Link to="/home" as={ReactRouterLink}>
        <Image
          src={discoveryHeaderLogo}
          width="190px"
          marginLeft="42px"
          marginY="30px"
        />
      </Link>
    </Flex>
  );
}

export default AuthHeader;

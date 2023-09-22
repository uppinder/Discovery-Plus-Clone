import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from '../Components/AuthHeader';
import { Flex } from '@chakra-ui/react';

function AuthMainLayout() {
  return (
    <Flex width="100%" height="100vh" flexDirection="column">
      <AuthHeader />
      <Outlet />
    </Flex>
  );
}

export default AuthMainLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Flex } from '@chakra-ui/react';

function MainLayout() {
  return (
    <Flex minH="100vh" flexDirection="column" paddingTop={'70px'}>
      <Navbar />
      <Outlet />
      <Footer />
    </Flex>
  );
}

export default MainLayout;

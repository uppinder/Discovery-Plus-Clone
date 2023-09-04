import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Flex } from '@chakra-ui/react';

function MainLayout() {
  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      justifyContent="space-between"
      paddingTop="70px"
      gap="50px"
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Flex>
  );
}

export default MainLayout;

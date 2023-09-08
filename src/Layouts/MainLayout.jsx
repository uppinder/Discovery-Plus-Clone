import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

function MainLayout() {
  const location = useLocation();
  const showIdPattern = new RegExp('^/show/[A-Za-z0-9-_]+$');
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const isShowPage = showIdPattern.test(location.pathname);
  const isShowPageMobileView = isShowPage && isMobile;

  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      justifyContent="space-between"
      paddingTop={isShowPageMobileView ? '0px' : '70px'}
      gap={isShowPageMobileView ? '0px' : '50px'}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Flex>
  );
}

export default MainLayout;

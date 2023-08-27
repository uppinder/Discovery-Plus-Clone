import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Grid } from '@chakra-ui/react';

function MainLayout() {
  return (
    <Grid minH="100vh" gridTemplateRows="1fr 10%" paddingTop={'70px'}>
      <Navbar />
      <Outlet />
      <Footer />
    </Grid>
  );
}

export default MainLayout;

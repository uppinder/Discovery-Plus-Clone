import { Flex } from '@chakra-ui/react';
import React from 'react';
import MainCarousel from './MainCarousel';

function Home() {
  return (
    <Flex minWidth="100vw">
      <MainCarousel />
    </Flex>
  );
}

export default Home;

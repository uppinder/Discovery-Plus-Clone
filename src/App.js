import React from 'react';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import Router from './Routes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box backgroundColor="#1A1C21" minH="100vh">
        <Router />
      </Box>
    </ChakraProvider>
  );
}

export default App;

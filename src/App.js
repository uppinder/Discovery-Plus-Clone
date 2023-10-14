import React from 'react';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import Router from './Routes';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        color: 'rgba(255, 255, 255, 0.92)',
      },
    },
  },
});

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

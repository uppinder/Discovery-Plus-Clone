import React from 'react';
import { Alert, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { CheckCircle } from '@phosphor-icons/react';

function FavouriteNotification({ operation = 'add' }) {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Flex
      position="fixed"
      left={isMobile ? '12%' : '37%'}
      bottom={isMobile ? '8%' : '6%'}
      zIndex="4000"
      border="0.25px solid white"
      borderLeft="none"
    >
      <Alert
        status="success"
        variant="left-accent"
        backgroundColor="#121317"
        borderLeftColor="#008000"
      >
        <CheckCircle size={30} color="#4CBB17" />
        <Text fontWeight="500" ml={1}>
          {operation === 'add'
            ? 'Added to your Favourites'
            : 'Removed from your Favourites'}
        </Text>
      </Alert>
    </Flex>
  );
}

export default FavouriteNotification;

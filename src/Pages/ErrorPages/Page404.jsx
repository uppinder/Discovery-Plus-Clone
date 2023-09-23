import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Flex, Image, Text } from '@chakra-ui/react';
import errorImage from '../../Assets/Images/error_404.png';

function Page404() {
  return (
    <Flex
      flexDirection="column"
      height="500px"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="-40px"
        gap="8px"
      >
        <Text color="#ff4040" fontSize="24px">
          ERROR
        </Text>
        <Image src={errorImage} />
        <Text fontSize="15px">
          The page you were looking for was moved or doesn’t exist.
        </Text>
        <Text fontSize="15px">Let’s get you back.</Text>
        <Flex
          to="/home"
          as={ReactRouterLink}
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          height="40px"
          padding="20px"
          fontSize="16px"
          fontWeight="500"
          color="#000"
          backgroundColor="#fff"
          borderRadius="8px"
          marginTop="20px"
        >
          Back to home
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Page404;

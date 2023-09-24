import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function MyAccount() {
  return (
    <Flex width="100%" justifyContent="center">
      <Flex
        width="650px"
        color="#fff"
        borderRadius="8px"
        flexDirection="column"
        backgroundColor="#121317"
        padding="20px 15px 10px 15px"
        marginTop="10px"
      >
        <Text fontWeight="500" textAlign="center">
          Account
        </Text>
        <Divider marginTop="15px" borderBottom="solid 1px #383e47" />

        <Flex
          flexDirection="column"
          paddingTop="30px"
          paddingBottom="20px"
          paddingX="25px"
        >
          <Text fontSize="18px" fontWeight="500">
            Personal details
          </Text>

          <Text color="#6c727a" fontSize="14px" marginTop="15px">
            Phone Number
          </Text>
          <Text>+91 9999999999</Text>

          <Divider marginTop="15px" borderBottom="solid 1px #383e47" />

          <Flex justifyContent="space-between" marginY="15px">
            <Flex flexDirection="column">
              <Text fontSize="18px" fontWeight="500">
                Subscription details
              </Text>
              <Text>No discovery+ Premium Subscription Found.</Text>
            </Flex>

            <Flex
              height="45px"
              borderRadius="3px"
              fontSize="14px"
              fontWeight="600"
              justifyContent="center"
              alignItems="center"
              whiteSpace="nowrap"
              cursor="pointer"
              paddingX="28px"
              backgroundImage="linear-gradient(68deg, #2175d9 39%, #2789ff 69%)"
            >
              Subscribe Now
            </Flex>
          </Flex>

          <Divider marginTop="8px" borderBottom="solid 1px #383e47" />

          <Flex marginY="20px" gap="10px">
            <Flex
              width="100px"
              borderRadius="3px"
              fontSize="14px"
              fontWeight="500"
              justifyContent="center"
              alignItems="center"
              whiteSpace="nowrap"
              cursor="pointer"
              paddingY="8px"
              backgroundImage="linear-gradient(112deg, #383e47, #475058 100%)"
            >
              Sign Out
            </Flex>

            <Flex
              width="90px"
              borderRadius="3px"
              fontSize="14px"
              fontWeight="500"
              justifyContent="center"
              alignItems="center"
              whiteSpace="nowrap"
              cursor="pointer"
              paddingY="10px"
              backgroundImage="linear-gradient(68deg, #2175d9 39%, #2789ff 69%)"
            >
              Back
            </Flex>
          </Flex>

          <Text color="#2175d9" cursor="pointer">
            Sign out from all devices
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MyAccount;

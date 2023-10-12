import React, { useEffect } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { unsetUserProfile } from '../../Actions';

import {
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';

function MyAccount() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userProfile);

  const handleSignOut = () => {
    googleLogout();
    dispatch(unsetUserProfile());
    navigate('/home');
  };

  useEffect(() => {
    if (isEmpty(userData)) {
      navigate('/login');
    }
  }, [navigate, userData]);

  if (isEmpty(userData)) {
    return (
      <Flex
        minWidth="100vw"
        height="400px"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" speed="0.56s" />
      </Flex>
    );
  } else {
    return (
      <Flex width="100%" justifyContent="center">
        <Flex
          width="650px"
          color="#fff"
          borderRadius="8px"
          flexDirection="column"
          backgroundColor="#121317"
          paddingX={isMobile ? '0px' : '15px'}
          paddingTop={isMobile ? '0px' : '20px'}
          paddingBottom={isMobile ? '0px' : '10px'}
          marginTop={isMobile ? '0px' : '10px'}
        >
          <Text fontSize="20px" fontWeight="500" textAlign="center">
            Account
          </Text>
          <Divider marginTop="15px" borderBottom="solid 1px #383e47" />

          <Flex
            flexDirection="column"
            paddingTop="30px"
            paddingBottom="20px"
            paddingX={isMobile ? '15px' : '25px'}
            backgroundColor={isMobile ? '#1A1C21' : null}
          >
            <Text fontSize="18px" fontWeight="500">
              Personal details
            </Text>

            <Text color="#6c727a" fontSize="14px" marginTop="15px">
              Email ID
            </Text>
            <Text>{userData.email}</Text>

            <Divider marginTop="15px" borderBottom="solid 1px #383e47" />

            <Flex
              flexDirection={isMobile ? 'column' : null}
              justifyContent={isMobile ? null : 'space-between'}
              marginY="15px"
              gap={isMobile ? '20px' : null}
            >
              <Flex flexDirection="column" gap={isMobile ? '10px' : null}>
                <Text fontSize="18px" fontWeight="500">
                  Subscription details
                </Text>
                <Text>No discovery+ Premium Subscription Found.</Text>
              </Flex>

              <Link
                to="/go-premium-web"
                as={ReactRouterLink}
                display="flex"
                height="45px"
                width="170px"
                borderRadius="3px"
                fontSize="14px"
                fontWeight="600"
                justifyContent="center"
                alignItems="center"
                whiteSpace="nowrap"
                cursor="pointer"
                paddingX="28px"
                backgroundImage="linear-gradient(68deg, #2175d9 39%, #2789ff 69%)"
                _hover={{ textDecoration: 'none' }}
              >
                Subscribe Now
              </Link>
            </Flex>

            <Divider marginTop="8px" borderBottom="solid 1px #383e47" />

            <Flex marginY="20px" gap="10px">
              <Flex
                width="100px"
                borderRadius="3px"
                fontSize="15px"
                fontWeight="500"
                justifyContent="center"
                alignItems="center"
                whiteSpace="nowrap"
                cursor="pointer"
                paddingY="8px"
                backgroundImage="linear-gradient(112deg, #383e47, #475058 100%)"
                onClick={onOpen}
              >
                Sign Out
              </Flex>

              <Link
                display="flex"
                width="100px"
                borderRadius="3px"
                fontSize="15px"
                fontWeight="500"
                justifyContent="center"
                alignItems="center"
                whiteSpace="nowrap"
                cursor="pointer"
                paddingY="10px"
                backgroundImage="linear-gradient(68deg, #2175d9 39%, #2789ff 69%)"
                _hover={{ textDecoration: 'none' }}
                onClick={() => navigate(-1)}
              >
                Back
              </Link>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
              <ModalOverlay backgroundColor="rgba(22,23,25,0.83)" />
              <ModalContent
                paddingY="25px"
                backgroundColor="#000"
                textAlign="center"
                borderRadius="4px"
              >
                <ModalHeader>Are you sure you want to sign out?</ModalHeader>
                <ModalBody marginTop="-20px">
                  <Text color="#9ba1a9">
                    You will have to sign in again to access your Favourites and
                    other custom content.
                  </Text>
                </ModalBody>

                <ModalFooter flexDirection="column" gap="10px">
                  <Flex
                    width="100px"
                    borderRadius="3px"
                    fontSize="15px"
                    fontWeight="500"
                    justifyContent="center"
                    alignItems="center"
                    whiteSpace="nowrap"
                    cursor="pointer"
                    paddingY="8px"
                    backgroundImage="linear-gradient(112deg, #383e47, #475058 100%)"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Flex>
                  <Text color="#2175d9" cursor="pointer" onClick={onClose}>
                    Cancel
                  </Text>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Text color="#2175d9" cursor="pointer">
              Sign out from all devices
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default MyAccount;

// 1. Mobile UI
// 2. Sign out modal

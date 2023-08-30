import React from 'react';
import {
  Box,
  Center,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  BookmarkSimple,
  CrownSimple,
  Heart,
  House,
  Lightbulb,
  Lightning,
  SignIn,
  SquaresFour,
  Television,
  Ticket,
} from '@phosphor-icons/react';
import discoveryHeaderLogo from '../Assets/Images/discovery_header_logo.png';
import kidsLogo from '../Assets/Images/kids_icon.svg';
import kidsLogoBottomNavbar from '../Assets/Images/kids_logo_bottom_navbar.svg';
import avatarLogo from '../Assets/Images/avatar_icon.svg';
import crownLogo from '../Assets/Images/crown_logo.svg';

function Navbar() {
  const headerLinkStyle = { textDecoration: 'none', color: 'white' };

  // Drawer
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      className="navbar"
      height={['50px', '70px']}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px="20px"
      top="0"
      position="fixed"
      zIndex="10"
    >
      <Flex
        display={{ base: 'flex', sm: 'none' }}
        position="fixed"
        width="100%"
        height="50px"
        backgroundColor="#121317"
        left="0"
        bottom="0"
        justifyContent="space-around"
      >
        <Link
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <House size="24px" color="white" weight="fill" />
          <Text fontSize="14px" lineHeight="1">
            Home
          </Text>
        </Link>
        <Link
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <SquaresFour size="24px" color="#838991" />
          <Text fontSize="14px" lineHeight="1" color="#838991">
            Explore
          </Text>
        </Link>
        <Link
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          marginTop="-20px"
          gap="2px"
        >
          <Image src={kidsLogoBottomNavbar} width="42px" height="42px" />
          <Text fontSize="14px" lineHeight="1" color="#838991">
            Kids
          </Text>
        </Link>
        <Link
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Lightning size="24px" color="#838991" />
          <Text fontSize="14px" lineHeight="1" color="#838991">
            Shorts
          </Text>
        </Link>
        <Link
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <CrownSimple size="24px" color="#838991" />
          <Text fontSize="14px" lineHeight="1" color="#838991">
            Premium
          </Text>
        </Link>
      </Flex>
      <HStack spacing={['10px', '20px']}>
        <Box className="dropdown-container">
          <Flex className="hoverable-button" onClick={onOpen}>
            <HamburgerIcon
              boxSize="24px"
              color="gray.400"
              _hover={{ color: 'white', cursor: 'pointer' }}
            />
          </Flex>
          <Box className="dropdown-empty-space"></Box>
          <Box
            className="dropdown-content"
            width={{ sm: '350px', xl: '250px' }}
          >
            <Flex
              flexDirection="column"
              gap="10px"
              color="#838991"
              fontSize="18px"
            >
              <Flex paddingY="5px">
                <Center
                  width="94px"
                  backgroundImage="linear-gradient(109deg, #383e47, #545a62)"
                  borderRadius="4px 0px 0px 4px"
                  border="1px solid #383e47"
                  color="white"
                  padding="4px 4px"
                  fontSize="16px"
                  fontWeight="500"
                >
                  Kids Safe
                </Center>
                <Center
                  width="94px"
                  backgroundColor="#121317"
                  borderRadius="0px 4px 4px 0px"
                  border="1px solid #383e47"
                  borderLeft="none"
                  padding="4px 4px"
                  fontSize="16px"
                  fontWeight="500"
                >
                  All Access
                </Center>
              </Flex>

              <Flex gap="20px" fontWeight="500">
                <Flex
                  flexDirection="column"
                  gap="8px"
                  display={{ base: 'none', sm: 'flex', xl: 'none' }}
                >
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <House size="20px" />
                    Home
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <SquaresFour size="20px" />
                    Explore
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Image src={kidsLogo} width="20px" />
                    Kids
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Lightning size="20px" />
                    Shorts
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Lightbulb size="20px" />
                    Mindblown
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <CrownSimple size="20px" />
                    Premium
                  </Link>
                </Flex>

                <Flex flexDirection="column" gap="8px">
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Ticket size="20px" />
                    <Text>Redeem Voucher</Text>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Heart size="20px" />
                    <Text>Favourites</Text>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <BookmarkSimple size="20px" />
                    <Text>Watchlist</Text>
                  </Link>
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    _hover={headerLinkStyle}
                  >
                    <Television size="20px" />
                    <Text>Link TV App</Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>

        {isMobile && (
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent
              maxWidth="238px"
              backgroundColor="#1a1c21"
              boxShadow="0 1px 5px 0 rgba(0, 0, 0, 0.5)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingTop="30px"
              gap="18px"
              paddingX="10px"
            >
              <Image src={avatarLogo} />
              <Text fontWeight="600">Guest User</Text>
              <Flex
                backgroundImage="linear-gradient(45deg, #2175d9 37%, #2789ff 77%)"
                borderRadius="8px"
                fontSize="14px"
                fontWeight="600"
                justifyContent="center"
                alignItems="center"
                whiteSpace="nowrap"
                cursor="pointer"
                padding="5px 10px"
                gap="8px"
                width="198px"
                height="38px"
              >
                <Image src={crownLogo} width="18px" height="18px" />
                <Text>Go Premium</Text>
              </Flex>
              <Link
                marginLeft="25px"
                alignSelf="flex-start"
                display="flex"
                alignItems="center"
                gap="12px"
                _hover={headerLinkStyle}
              >
                <SignIn size="20px" />
                <Text>Sign In</Text>
              </Link>

              <Flex paddingY="5px">
                <Center
                  width="94px"
                  backgroundImage="linear-gradient(109deg, #383e47, #545a62)"
                  borderRadius="4px 0px 0px 4px"
                  border="1px solid #383e47"
                  color="white"
                  padding="4px 4px"
                  fontSize="16px"
                  fontWeight="500"
                >
                  Kids Safe
                </Center>
                <Center
                  width="94px"
                  backgroundColor="#121317"
                  borderRadius="0px 4px 4px 0px"
                  border="1px solid #383e47"
                  borderLeft="none"
                  padding="4px 4px"
                  fontSize="16px"
                  fontWeight="500"
                >
                  All Access
                </Center>
              </Flex>

              <Flex
                flexDirection="column"
                gap="8px"
                marginLeft="-30px"
                fontWeight="600"
              >
                <Link
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  _hover={headerLinkStyle}
                >
                  <Ticket size="20px" />
                  <Text>Redeem Voucher</Text>
                </Link>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  _hover={headerLinkStyle}
                >
                  <Heart size="20px" />
                  <Text>Favourites</Text>
                </Link>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  _hover={headerLinkStyle}
                >
                  <BookmarkSimple size="20px" />
                  <Text>Watchlist</Text>
                </Link>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  _hover={headerLinkStyle}
                >
                  <Television size="20px" />
                  <Text>Link TV App</Text>
                </Link>
              </Flex>
            </DrawerContent>
          </Drawer>
        )}

        <Link>
          <Image src={discoveryHeaderLogo} maxWidth={['100px', '170px']} />
        </Link>

        {/* For mobile screen */}
        <Flex
          display={['flex', 'none']}
          backgroundImage="linear-gradient(45deg, #2175d9 37%, #2789ff 77%)"
          borderRadius="3px"
          fontSize="12px"
          fontWeight="600"
          justifyContent="center"
          alignItems="center"
          whiteSpace="nowrap"
          cursor="pointer"
          padding="3px 8px"
        >
          Buy Plan
        </Flex>

        <HStack
          spacing="20px"
          marginLeft="60px"
          color="#838991"
          display={{ base: 'none', xl: 'flex' }}
        >
          <Link _hover={headerLinkStyle}>Home</Link>
          <Link _hover={headerLinkStyle}>Explore</Link>
          <Link _hover={headerLinkStyle}>Kids</Link>
          <Link _hover={headerLinkStyle}>Shorts</Link>
          <Link _hover={headerLinkStyle}>Mindblown</Link>
          <Link _hover={headerLinkStyle}>Premium</Link>
        </HStack>
      </HStack>

      <IconButton
        display={['block', 'none']}
        icon={<SearchIcon boxSize="20px" />}
        marginRight="-10px"
        variant="unstyled"
      />

      <HStack spacing="8px" marginRight="8px" display={['none', 'flex']}>
        <InputGroup width="340px" marginRight="8px" display={['none', 'block']}>
          <Input
            placeholder="Search for a show, episode, shorts etc."
            variant="flushed"
            css={{
              '&:focus': {
                borderBottom: '1px solid #121317', // Your desired border bottom style on focus
              },
            }}
          />
          <InputRightElement>
            <SearchIcon boxSize="20px" />
          </InputRightElement>
        </InputGroup>

        <Flex
          border="1px solid white"
          borderRadius="3px"
          fontSize="16px"
          fontWeight="600"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          whiteSpace="nowrap"
          padding="3px 9px"
        >
          Sign In
        </Flex>
        <Flex
          backgroundImage="linear-gradient(45deg, #2175d9 37%, #2789ff 77%)"
          borderRadius="3px"
          fontSize="16px"
          fontWeight="600"
          justifyContent="center"
          alignItems="center"
          whiteSpace="nowrap"
          cursor="pointer"
          padding="4px 10px"
        >
          Buy Plan
        </Flex>
      </HStack>
    </Flex>
  );
}

export default Navbar;

// TODO
// 1. Implement active link styling based on current path

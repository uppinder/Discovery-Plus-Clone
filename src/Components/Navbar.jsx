import React, { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import {
  BookmarkSimple,
  Heart,
  Television,
  Ticket,
} from '@phosphor-icons/react';
import discoveryHeaderLogo from '../Assets/Images/discovery_header_logo.png';

function Navbar() {
  const headerLinkStyle = { textDecoration: 'none', color: 'white' };

  const [menuHover, setMenuHover] = useState(false);

  const handleMenuHover = toggleValue => {
    console.log(toggleValue);
    setMenuHover(toggleValue);
  };

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
      <HStack spacing="20px">
        {/* <Box position="relative">
          <Flex>
            <HamburgerIcon
              boxSize="24px"
              _hover={{ color: 'white', cursor: 'pointer' }}
            />
          </Flex>
          <Flex position="absolute" width=""></Flex>
        </Box> */}

        <Box className="dropdown-container">
          <Flex className="hoverable-button">
            <HamburgerIcon
              boxSize="24px"
              color="gray.400"
              _hover={{ color: 'white', cursor: 'pointer' }}
            />
          </Flex>
          <Box className="dropdown-empty-space"></Box>
          <Box className="dropdown-content">
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
                  padding="4px 4px"
                  fontSize="16px"
                  fontWeight="500"
                >
                  All Access
                </Center>
              </Flex>
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
          </Box>
        </Box>

        <Image src={discoveryHeaderLogo} maxWidth="170px" />
        <HStack spacing="20px" marginLeft="60px" color="#838991">
          <Link _hover={headerLinkStyle}>Home</Link>
          <Link _hover={headerLinkStyle}>Explore</Link>
          <Link _hover={headerLinkStyle}>Kids</Link>
          <Link _hover={headerLinkStyle}>Shorts</Link>
          <Link _hover={headerLinkStyle}>Mindblown</Link>
          <Link _hover={headerLinkStyle}>Premium</Link>
        </HStack>
      </HStack>

      <HStack spacing="8px" marginRight="8px">
        <InputGroup width="340px" marginRight="8px">
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
            <Search2Icon />
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

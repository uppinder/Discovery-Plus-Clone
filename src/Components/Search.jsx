import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react';
import SearchDropdownItem from './SearchDropdownItem';
import { Link as ReactRouterDom } from 'react-router-dom';

import showThumbnail from '../Assets/Images/shows_test_1.jpeg';

function Search() {
  return (
    <Flex flexDirection="column" position="relative">
      <InputGroup width="340px" marginRight="8px" display={['none', 'block']}>
        <Input
          placeholder="Search for a show, episode, shorts etc."
          _placeholder={{ color: '#6c727a' }}
          variant="flushed"
          css={{
            '&:focus': {
              borderBottom: '1px solid #121317',
            },
          }}
        />
        <InputRightElement>
          <SearchIcon boxSize="20px" />
        </InputRightElement>
      </InputGroup>
      <Flex
        width="340px"
        paddingTop="2px"
        left="0"
        top="101%"
        flexDirection="column"
        position="absolute"
        backgroundColor="#000"
      >
        {Array(3)
          .fill({})
          .map((item, id) => (
            <Link _hover={{ textDecoration: 'none' }}>
              <SearchDropdownItem
                title={'Little Singham'}
                thumbnailImage={showThumbnail}
                desc={
                  'A nine-year-old boy battles evil villains that are out to create chaos.'
                }
              />
            </Link>
          ))}
        <Divider border="0.5px solid #35393f" />
        <Link
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="8px"
          color="#838991"
          lineHeight="1.6"
          fontWeight="500"
          _hover={{ textDecoration: 'none', color: '#fff' }}
        >
          View All
        </Link>
      </Flex>
    </Flex>
  );
}

export default Search;

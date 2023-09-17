import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
} from '@chakra-ui/react';
import SearchDropdownItem from './SearchDropdownItem';
import { Link as ReactRouterLink } from 'react-router-dom';

const sampleResult = {
  title: 'Little Singham',
  thumbnailImage: require('../Assets/Images/shows_test_1.jpeg'),
  desc: 'A nine-year-old boy battles evil villains that are out to create chaos.',
};

function Searchbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showResultsDropDown, setShowResultsDropDown] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (inputText === '') return;
      setIsLoading(true);

      //   Dummy API call
      setTimeout(() => {
        setResults(Array(3).fill(sampleResult));
        setShowResultsDropDown(true);
        setIsLoading(false);
      }, 500);
    };

    // Debounce
    const timeout = setTimeout(fetchResults, 300);

    return () => clearTimeout(timeout);
  }, [inputText]);

  return (
    <Flex flexDirection="column" position="relative">
      <InputGroup width="340px" marginRight="8px" display={['none', 'block']}>
        <Input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Search for a show, episode, shorts etc."
          _placeholder={{ color: '#6c727a' }}
          variant="flushed"
          fontWeight="500"
          css={{
            '&:focus': {
              borderBottom: '1px solid #121317',
            },
          }}
        />
        <InputRightElement>
          {isLoading ? (
            <Spinner boxSize="20px" />
          ) : (
            <SearchIcon boxSize="20px" />
          )}
        </InputRightElement>
      </InputGroup>
      {showResultsDropDown && (
        <Flex
          width="340px"
          paddingTop="2px"
          left="0"
          top="101%"
          flexDirection="column"
          position="absolute"
          backgroundColor="#000"
        >
          {results && results.length ? (
            <>
              {results.map((result, id) => (
                <Link
                  key={id}
                  to="/video/man-vs-wild/the-rockies"
                  as={ReactRouterLink}
                  _hover={{ textDecoration: 'none' }}
                >
                  <SearchDropdownItem {...result} />
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
            </>
          ) : (
            <Flex
              padding="30px"
              justifyContent="center"
              color="#b0b0b0"
              fontSize="13px"
              fontWeight="500"
              lineHeight="1.2"
            >
              No results found
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
}

export default Searchbar;

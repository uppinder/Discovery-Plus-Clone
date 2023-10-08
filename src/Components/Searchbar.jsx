import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { XCircle } from '@phosphor-icons/react';
import discoveryPlusApi from '../Api';

const sampleResult = {
  title: 'Little Singham',
  thumbnailImage: require('../Assets/Images/shows_test_1.jpeg'),
  desc: 'A nine-year-old boy battles evil villains that are out to create chaos.',
};

function Searchbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showXCircle, setShowXCircle] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [results, setResults] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    setInputText('');
    setShowResultsDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const fetchResults = async () => {
      if (inputText === '') return;

      setShowXCircle(false);
      setIsLoading(true);

      try {
        const { data: data_shows } = await discoveryPlusApi(
          `/search_shows?q=${inputText}`
        );

        const { data: data_episodes } = await discoveryPlusApi(
          `/search_episodes?q=${inputText}`
        );

        setResults(data_shows.concat(data_episodes));
      } catch (error) {
        console.log(error);
      } finally {
        setShowResultsDropdown(true);
        setShowXCircle(true);
        setIsLoading(false);
      }
    };

    // Debounce
    const timeout = setTimeout(fetchResults, 300);

    if (inputText === '') {
      setShowXCircle(false);
      setShowResultsDropdown(false);
    }

    return () => clearTimeout(timeout);
  }, [inputText]);

  const handleClose = () => {
    setInputText('');
  };

  const resultsDropdownRef = useRef();
  const hideResultsDropdown = useCallback(
    evt => {
      if (
        resultsDropdownRef.current &&
        showResultsDropdown &&
        !resultsDropdownRef.current.contains(evt.target)
      ) {
        setShowResultsDropdown(false);
      }
    },
    [showResultsDropdown]
  );

  useEffect(() => {
    window.addEventListener('mousedown', hideResultsDropdown);
    return () => {
      window.removeEventListener('mousedown', hideResultsDropdown);
    };
  }, [hideResultsDropdown]);

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
          {isLoading && <Spinner boxSize="20px" />}
          {showXCircle && (
            <XCircle
              size="26px"
              color="#fff"
              weight="fill"
              cursor="pointer"
              onClick={handleClose}
            />
          )}
          {!isLoading && !showXCircle && <SearchIcon boxSize="20px" />}
        </InputRightElement>
      </InputGroup>
      {showResultsDropdown && (
        <Flex
          ref={resultsDropdownRef}
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
              {results.slice(0, 3).map((result, id) => (
                <Link
                  key={id}
                  to="/home"
                  //   to={result.duration ? `/video/man-vs-wild/the-rockies`}
                  as={ReactRouterLink}
                  _hover={{ textDecoration: 'none' }}
                  reloadDocument
                >
                  <SearchDropdownItem {...result} />
                </Link>
              ))}
              <Divider border="0.5px solid #35393f" />
              <Link
                to={`/search?q=${inputText}`}
                as={ReactRouterLink}
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

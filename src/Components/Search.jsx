import React, { useEffect, useState } from 'react';
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowLeft, MagnifyingGlass, XCircle } from '@phosphor-icons/react';

import playButtonImage from '../Assets/Images/play_button.svg';
import showThumbnail from '../Assets/Images/shows_test_1.jpeg';
import premiumIcon from '../Assets/Images/premium_icon.svg';
import noSearchResultsImage from '../Assets/Images/search_no_results.png';
import HomeShowItem from './HomeShowItem';

function Search() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const mostPopular = Array(6).fill({
    title: 'Little Singham',
    thumbnailImage: require('../Assets/Images/shows_test_1.jpeg'),
    type: 'Show',
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showXCircle, setShowXCircle] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    shows: [],
    episodes: [],
    shorts: [],
  });

  // For desktop
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('q')) {
      setQuery(queryParams.get('q'));
    }
  }, [location]);

  useEffect(() => {
    const fetchResults = async () => {
      if (inputText === '') return;

      setShowXCircle(false);
      setIsLoading(true);

      //   Dummy API call
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
        setShowXCircle(true);
      }, 500);
    };

    // Debounce
    const timeout = setTimeout(fetchResults, 300);

    if (inputText === '') {
      setShowXCircle(false);
      setShowResults(false);
    }

    return () => clearTimeout(timeout);
  }, [inputText]);

  const addToRecentSearch = () => {
    const newSearch = inputText;
    const newState = [...recentSearches];

    const itemIndex = newState.findIndex(({ text }) => text === inputText);

    // If it's already there, then push it to the top
    if (itemIndex !== -1) {
      newState[itemIndex].timestamp = new Date().getTime();
    } else {
      // Add inputText to recent search if not already present
      newState.push({ text: newSearch, timestamp: new Date().getTime() });
    }

    const sortedArray = newState.sort((a, b) => b.timestamp - a.timestamp);
    setRecentSearches(sortedArray.splice(0, 3)); // Store only top 3 results
  };

  const removeRecentSearch = index => {
    setRecentSearches(prevState => prevState.filter((_, id) => id !== index));
  };

  const handleClose = () => {
    addToRecentSearch();
    setInputText('');
  };

  if (isMobile) {
    return (
      <Flex
        flexDirection="column"
        backgroundColor="#121317"
        marginTop="-6px"
        marginBottom="-50px"
      >
        <Flex
          className="navbar"
          height="64px"
          width="100vw"
          paddingX="3%"
          alignItems="center"
          position="fixed"
          top="0"
          zIndex="10"
          gap="8px"
          borderBottom="0.25px solid rgba(255, 255, 255, 0.08)"
        >
          <Link onClick={() => navigate(-1)}>
            <ArrowLeft size={25} />
          </Link>

          <InputGroup width="340px" height="48px" marginRight="2px">
            <Input
              autoFocus
              height="100%"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              variant="filled"
              fontSize="14px"
              fontWeight="500"
              backgroundColor="#262931"
              placeholder="Search for a show, episode, shorts etc."
              _placeholder={{ color: '#6c727a', fontSize: '14px' }}
              _focus={{ border: 'none', backgroundColor: '#262931' }}
            />
            <InputLeftElement
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <MagnifyingGlass size="20px" color="#d6dce4" weight="light" />
            </InputLeftElement>
            <InputRightElement
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              {isLoading && <Spinner boxSize="20px" />}
              {showXCircle && (
                <XCircle
                  size="26px"
                  color="#fff"
                  weight="fill"
                  onClick={handleClose}
                />
              )}
            </InputRightElement>
          </InputGroup>
        </Flex>
        {showResults ? (
          <Tabs>
            <TabList
              width="100%"
              color="#838991"
              fontWeight="600"
              position="fixed"
              zIndex="8"
              paddingTop="4px"
              backgroundColor="#121317"
              borderBottomColor="#121317"
            >
              <Tab
                flex="1"
                _selected={{
                  color: 'white',
                  borderBottom: '2px solid white',
                }}
              >
                Shows
              </Tab>
              <Tab
                flex="1"
                _selected={{
                  color: 'white',
                  borderBottom: '2px solid white',
                }}
              >
                Episodes
              </Tab>
              <Tab
                flex="1"
                _selected={{
                  color: 'white',
                  borderBottom: '2px solid white',
                }}
              >
                Shorts
              </Tab>
            </TabList>

            <TabPanels backgroundColor="#1a1c21">
              <TabPanel paddingX="0" paddingTop="60px">
                {results.shows.length > 0 ? (
                  <Grid
                    width="100%"
                    height="100%"
                    paddingX="12px"
                    gridTemplateColumns="repeat(2, minmax(0, 100%))"
                    gridColumnGap="10px"
                    gridRowGap="16px"
                  >
                    {Array(19)
                      .fill(null)
                      .map((_, index) => (
                        <Link
                          key={index}
                          position="relative"
                          display="flex"
                          flexDirection="column"
                          _focus={{ textDecoration: 'none' }}
                          gap="5px"
                        >
                          <Box position="relative">
                            <Image src={showThumbnail} />

                            {/* Premium Icon Overlay*/}
                            <Image
                              src={premiumIcon}
                              position="absolute"
                              top="1.5%"
                              left="1%"
                            />

                            {/* New Episodes Overlay */}
                            <Flex
                              position="absolute"
                              height="18px"
                              justifyContent="center"
                              alignItems="center"
                              backgroundColor="#2175d9"
                              borderRadius="3px"
                              padding="0px 6px"
                              bottom="4%"
                              left="20%"
                            >
                              <Text fontSize="12px" fontWeight="500">
                                New Episodes
                              </Text>
                            </Flex>
                          </Box>

                          <Text
                            fontSize="12px"
                            fontWeight="500"
                            color="#bfc5cd"
                          >
                            Little Singham
                          </Text>
                        </Link>
                      ))}
                  </Grid>
                ) : (
                  <Image src={noSearchResultsImage} />
                )}
              </TabPanel>
              <TabPanel paddingX="0" paddingTop="60px">
                {results.episodes.length > 0 ? (
                  <Flex flexDirection="column">
                    {mostPopular.map(({ title, thumbnailImage, type }, id) => (
                      <Link
                        key={id}
                        to="/video/man-vs-wild/the-rockies"
                        as={ReactRouterLink}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Flex
                          flexDirection="row"
                          width="100%"
                          gap="8px"
                          height="88px"
                          paddingLeft="15px"
                          paddingY="6px"
                          alignItems="center"
                        >
                          <Box position="relative">
                            <Image
                              src={thumbnailImage}
                              minWidth="112px"
                              height="68px"
                              objectFit="cover"
                            />

                            {/* Play Button Overlay*/}
                            <Flex
                              position="absolute"
                              width="100%"
                              height="100%"
                              top="0"
                              left="0"
                              zIndex="7"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Image
                                src={playButtonImage}
                                height="24px"
                                width="24px"
                              />
                            </Flex>

                            {/* Bottom Text Overlay */}
                            <Flex
                              position="absolute"
                              bottom="2px"
                              right="2px"
                              backgroundColor="#000000"
                              opacity="0.65"
                              paddingX="3px"
                            >
                              <Text fontSize="10px">43:32</Text>
                            </Flex>
                          </Box>

                          <Flex
                            flexDirection="column"
                            height="72px"
                            gap="5px"
                            position="relative"
                          >
                            <Text
                              fontSize="14px"
                              fontWeight="500"
                              lineHeight="1"
                            >
                              {title}
                            </Text>
                            <Flex alignItems="center" width="90%">
                              <Text
                                fontWeight="500"
                                color="#838991"
                                fontSize="13px"
                                lineHeight="1.3"
                              >
                                {type}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Link>
                    ))}
                  </Flex>
                ) : (
                  <Image src={noSearchResultsImage} />
                )}
              </TabPanel>
              <TabPanel paddingX="0" paddingTop="60px">
                {results.shorts.length > 0 ? (
                  <Flex flexDirection="column">
                    {mostPopular.map(({ title, thumbnailImage, type }, id) => (
                      <Link
                        key={id}
                        to="/video/man-vs-wild/the-rockies"
                        as={ReactRouterLink}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Flex
                          flexDirection="row"
                          width="100%"
                          gap="8px"
                          height="88px"
                          paddingLeft="15px"
                          paddingY="6px"
                          alignItems="center"
                        >
                          <Box position="relative">
                            <Image
                              src={thumbnailImage}
                              minWidth="112px"
                              height="68px"
                              objectFit="cover"
                            />

                            {/* Play Button Overlay*/}
                            <Flex
                              position="absolute"
                              width="100%"
                              height="100%"
                              top="0"
                              left="0"
                              zIndex="7"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Image
                                src={playButtonImage}
                                height="24px"
                                width="24px"
                              />
                            </Flex>

                            {/* Bottom Text Overlay */}
                            <Flex
                              position="absolute"
                              bottom="2px"
                              right="2px"
                              backgroundColor="#000000"
                              opacity="0.65"
                              paddingX="3px"
                            >
                              <Text fontSize="10px">43:32</Text>
                            </Flex>
                          </Box>

                          <Flex
                            flexDirection="column"
                            height="72px"
                            gap="5px"
                            position="relative"
                          >
                            <Text
                              fontSize="14px"
                              fontWeight="500"
                              lineHeight="1"
                            >
                              {title}
                            </Text>
                            <Flex alignItems="center" width="90%">
                              <Text
                                fontWeight="500"
                                color="#838991"
                                fontSize="13px"
                                lineHeight="1.3"
                              >
                                Shorts
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Link>
                    ))}
                  </Flex>
                ) : (
                  <Image src={noSearchResultsImage} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Flex flexDirection="column" paddingY="25px">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Flex
                marginBottom="15px"
                paddingBottom="25px"
                flexDirection="column"
                gap="12px"
                borderBottom="0.25px solid rgba(255, 255, 255, 0.20)"
              >
                <Text paddingLeft="12px" color="#838991" fontSize="15px">
                  Recent Searches
                </Text>
                {recentSearches.map(({ text }, id) => (
                  <Flex
                    key={id}
                    paddingLeft="18px"
                    paddingRight="10px"
                    gap="10px"
                    justifyContent="space-between"
                  >
                    <Link
                      to={`/search?q=${text}`}
                      as={ReactRouterLink}
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="1.2"
                      _hover={{ textDecoration: 'none' }}
                    >
                      {text}
                    </Link>
                    <XCircle
                      size="24px"
                      color="#fff"
                      weight="fill"
                      onClick={() => removeRecentSearch(id)}
                    />
                  </Flex>
                ))}
              </Flex>
            )}

            <Text paddingLeft="12px" color="#838991" fontSize="15px">
              Most popular
            </Text>
            <Flex flexDirection="column">
              {mostPopular.map(({ title, thumbnailImage, type }, id) => (
                <Link
                  key={id}
                  to="/video/man-vs-wild/the-rockies"
                  as={ReactRouterLink}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Flex
                    flexDirection="row"
                    width="100%"
                    gap="8px"
                    height="88px"
                    paddingLeft="15px"
                    paddingY="6px"
                    alignItems="center"
                  >
                    <Box position="relative">
                      <Image
                        src={thumbnailImage}
                        minWidth="112px"
                        height="68px"
                        objectFit="cover"
                      />
                    </Box>

                    <Flex
                      flexDirection="column"
                      height="72px"
                      gap="5px"
                      position="relative"
                    >
                      <Text fontSize="14px" fontWeight="500" lineHeight="1">
                        {title}
                      </Text>
                      <Flex alignItems="center" width="90%">
                        <Text
                          fontWeight="500"
                          color="#838991"
                          fontSize="13px"
                          lineHeight="1.3"
                        >
                          {type}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  } else {
    // Desktop
    return (
      <Flex
        width="100%"
        flexDirection="column"
        paddingTop={isMobile ? '10px' : '20px'}
      >
        <Flex
          alignItems="center"
          gap="10px"
          borderBottom="solid 1px #393e46"
          paddingBottom="15px"
        >
          <Text
            color="#979797"
            fontSize="15px"
            fontWeight="500"
            lineHeight="1.1"
            paddingLeft="20px"
          >
            Showing Results for:{' '}
          </Text>
          <Text color="#fff" fontSize="15px" fontWeight="600" lineHeight="1.1">
            {query}
          </Text>
        </Flex>

        {/* Shows */}
        <Flex justifyContent="space-between" paddingTop="10px" paddingX="20px">
          <Text fontSize="20px" fontWeight="500" color="#fff">
            Shows
          </Text>
          <Link
            to={`/collection-view-all?q=${query}&type=Shows`}
            as={ReactRouterLink}
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>
        <Grid
          width="100%"
          height="100%"
          paddingY="20px"
          paddingX="20px"
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap="16px"
          gridRowGap="18px"
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Link to="/show/test" as={ReactRouterLink} key={index}>
                <HomeShowItem isChannelPageMobileView={true} />
              </Link>
            ))}
        </Grid>

        <Center>
          <Divider
            borderBottom="1px solid rgb(255,255,255, 0.4)"
            marginY="10px"
            marginX="20px"
          />
        </Center>

        {/* Episodes */}
        <Flex justifyContent="space-between" paddingTop="10px" paddingX="20px">
          <Text fontSize="20px" fontWeight="500" color="#fff">
            Episodes
          </Text>
          <Link
            to={`/collection-view-all?q=${query}&type=Episodes`}
            as={ReactRouterLink}
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>
        <Grid
          width="100%"
          height="100%"
          paddingY="20px"
          paddingX="20px"
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap="16px"
          gridRowGap="18px"
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Link to="/show/test" as={ReactRouterLink} key={index}>
                <HomeShowItem isChannelPageMobileView={true} />
              </Link>
            ))}
        </Grid>

        <Center>
          <Divider
            borderBottom="1px solid rgb(255,255,255, 0.4)"
            marginY="10px"
            marginX="20px"
          />
        </Center>

        {/* Shorts */}
        <Flex justifyContent="space-between" paddingTop="10px" paddingX="20px">
          <Text fontSize="20px" fontWeight="500" color="#fff">
            Shorts
          </Text>
          <Link
            to={`/collection-view-all?q=${query}&type=Shorts`}
            as={ReactRouterLink}
            color="#838991"
            fontSize="18px"
            _hover={{ textDecoration: 'none', color: 'white' }}
          >
            View All
          </Link>
        </Flex>
        <Grid
          width="100%"
          height="100%"
          paddingY="20px"
          paddingX="20px"
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 100%))',
            lg: 'repeat(3, minmax(0, 100%))',
            xl: 'repeat(4, minmax(0, 100%))',
          }}
          gridColumnGap="16px"
          gridRowGap="18px"
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Link to="/show/test" as={ReactRouterLink} key={index}>
                <HomeShowItem isChannelPageMobileView={true} />
              </Link>
            ))}
        </Grid>
      </Flex>
    );
  }
}

export default Search;

// 1. Remove dropdown on blur - Searchbar.jsx - pending (useRef?)
// 2. Mobile responsive UI:
// 2a. recent searches - done
// 2b. zero results - done
// 3. /search UI pages for desktop - done

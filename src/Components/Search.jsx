import React, { useEffect, useMemo, useState } from 'react';
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
import premiumIcon from '../Assets/Images/premium_icon.svg';
import noSearchResultsImage from '../Assets/Images/search_no_results.png';
import HomeShowItem from './HomeShowItem';
import discoveryPlusApi from '../Api';

function Search() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const mostPopular = useMemo(
    () => [
      {
        id: 'little-singham',
        title: 'Little Singham',
        desc: 'A nine-year-old boy battles evil villains that are out to create chaos.',
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2023/03/05/bbd9636c-a15b-413d-a6c5-82283024ed5d.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: true,
        hasNewEpisodes: false,
      },
      {
        id: 'fukrey-boyzzz-in',
        title: 'Fukrey Boyzzz',
        desc: 'Choocha, Hunny and Laali are kids with limited means but great dreams.',
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2023/05/15/e75ded76-173d-4b3e-aa57-028d00bab525.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: true,
        hasNewEpisodes: false,
      },
      {
        id: 'swami-ramdev-ek-sangharsh-in',
        title: 'Swami Ramdev: Ek Sangharsh',
        desc: 'Discover how Swami Ramdev changed the health of the nation.',
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2023/06/01/37eb2e61-c013-40ec-b076-41f1c9ad7723.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: true,
        hasNewEpisodes: false,
      },
      {
        id: 'gold-rush',
        title: 'Gold Rush',
        desc: 'Hard-working gold miners risk their lives for a chance at striking it rich.',
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2023/09/26/293263a9-8d4f-4068-96d8-f3977cd1db95.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: false,
        hasNewEpisodes: true,
      },
      {
        id: 'secrets-of-in',
        title: 'Secrets of the Koh-i-noor',
        desc: "Follow the journey of the world's most fabled diamond with Manoj Bajpayee.",
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2022/08/18/8accb6b7-de88-42b9-a129-bcf6107350b5.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: true,
        hasNewEpisodes: false,
      },
      {
        id: 'expedition-unknown',
        title: 'Expedition Unknown',
        desc: "Josh Gates investigates the world's most iconic and captivating legends.",
        thumbnail:
          'https://ap2-prod-images.disco-api.com/2023/07/13/89ee551f-46b2-41d2-89eb-ab47dd438a8e.jpeg?bf=0&f=jpg&p=true&q=75&w=700',
        isPremium: false,
        hasNewEpisodes: false,
      },
    ],
    []
  );

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
      setInputText(queryParams.get('q'));
    }
  }, [location]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data: data_shows } = await discoveryPlusApi(
          `/search_shows?q=${query}`
        );

        const { data: data_episodes } = await discoveryPlusApi(
          `/search_episodes?q=${query}`
        );

        // console.log(data_shows, data_episodes);

        setResults({ shows: data_shows, episodes: data_episodes });
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [query]);

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

        // console.log(data_shows, data_episodes);
        setResults({ shows: data_shows, episodes: data_episodes });
      } catch (error) {
        console.log(error);
      } finally {
        setShowResults(true);
        setIsLoading(false);
        setShowXCircle(true);
      }
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
                {results.shows && results.shows.length > 0 ? (
                  <Grid
                    width="100%"
                    height="100%"
                    paddingX="12px"
                    gridTemplateColumns="repeat(2, minmax(0, 100%))"
                    gridColumnGap="10px"
                    gridRowGap="10px"
                  >
                    {results.shows.slice(0, 25).map((showData, index) => (
                      <Link
                        key={index}
                        position="relative"
                        display="flex"
                        flexDirection="column"
                        _focus={{ textDecoration: 'none' }}
                        gap="5px"
                      >
                        <Box position="relative">
                          <Image
                            src={showData['thumbnail']}
                            maxHeight="95px"
                            width="100%"
                            objectFit="cover"
                          />

                          {/* Premium Icon Overlay*/}
                          {showData['isPremium'] && (
                            <Image
                              src={premiumIcon}
                              position="absolute"
                              top="1.5%"
                              left="1%"
                            />
                          )}

                          {/* New Episodes Overlay */}
                          {showData['hasNewEpisodes'] && (
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
                          )}
                        </Box>

                        <Text fontSize="12px" fontWeight="500" color="#bfc5cd">
                          {showData['title']}
                        </Text>
                      </Link>
                    ))}
                  </Grid>
                ) : (
                  <Image src={noSearchResultsImage} />
                )}
              </TabPanel>
              <TabPanel paddingX="0" paddingTop="60px">
                {results.episodes && results.episodes.length > 0 ? (
                  <Flex flexDirection="column">
                    {results.episodes.slice(0, 25).map((showEpisode, id) => (
                      <Link
                        key={id}
                        to={`/video/${showEpisode['showId']}/${showEpisode['id']}`}
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
                              src={showEpisode['thumbnail']}
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
                              <Text fontSize="10px">
                                {showEpisode['duration']}
                              </Text>
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
                              {showEpisode['title']}
                            </Text>
                            <Flex alignItems="center" width="90%">
                              <Text
                                fontWeight="500"
                                color="#838991"
                                fontSize="13px"
                                lineHeight="1.3"
                                textTransform="capitalize"
                              >
                                {showEpisode['showId'].split('-').join(' ')}
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
                {results.shorts && results.shorts.length > 0 ? (
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
              {mostPopular.map(({ id, title, thumbnail, type }, index) => (
                <Link
                  key={index}
                  to={`/show/${id}`}
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
                        src={thumbnail}
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
          {results['shows'].slice(0, 4).map((showData, index) => (
            <Link
              to={`/show/${showData['id']}`}
              as={ReactRouterLink}
              key={index}
            >
              <HomeShowItem
                {...showData}
                isSearchDesktopView={true}
                isChannelPageMobileView={true}
              />
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
          {results['shows'].slice(0, 4).map((episodeData, index) => (
            <Link
              to={
                episodeData.duration
                  ? `/video/${episodeData['showId']}/${episodeData['id']}`
                  : `/show/${episodeData['id']}`
              }
              as={ReactRouterLink}
              key={index}
            >
              <HomeShowItem
                {...episodeData}
                isSearchDesktopView={true}
                isChannelPageMobileView={true}
              />
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

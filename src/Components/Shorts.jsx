import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import ShortsCard from './ShortsCard';

import shortAdImage from '../Assets/Images/shorts_app_ad.png';
import googlePlayImage from '../Assets/Images/google_play_download.png';
import appleStoreImage from '../Assets/Images/apple_store_download.png';

const sampleShortsData = {
  title: 'A Twisted Tale Of Love, Betrayal & Murder!',
  rating:
    'Age Rating : UA-16+ | Contains : Alcohol Sexual Content Smoking Violence',
  shortsImageThumbnail: require('../Assets/Images/shorts_image.jpeg'),
  fullEpUrl: '',
};

function Shorts() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const categories = [
    'all',
    'adventure',
    'food',
    'science',
    'animals',
    'lifestyle',
  ];
  const [category, setCategory] = useState('all');

  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [shortsData, setShortsData] = useState(Array(4).fill(sampleShortsData));

  useEffect(() => {
    const fetchShorts = () => {
      try {
        console.log('Fetching data...', pageNumber);

        setTimeout(() => {
          setShortsData(prevData => [
            ...prevData,
            ...Array(4).fill(sampleShortsData),
          ]);

          console.log('Data fetched');
        }, 300);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pageNumber > 0) {
      setIsLoading(true);
      fetchShorts();
    }
  }, [pageNumber]);

  const observer = useRef();
  const lastShortsRef = useCallback(
    node => {
      if (isLoading) return; // Don't make more fetchShorts() calls if already in loading state
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <Flex
      width="100%"
      height="100%"
      gap={isMobile ? '0px' : '28px'}
      paddingX={isMobile ? '0px' : '27px'}
      paddingTop={isMobile ? '0px' : '25px'}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {isMobile ? (
        <Flex
          width="100vw"
          overflowX="scroll"
          background="#1f2227"
          marginTop="-10px"
          position="sticky"
          top="-20px"
          css={{
            '&::-webkit-scrollbar': {
              width: '0',
              height: '0',
            },
          }}
        >
          {categories.map((value, id) => (
            <Flex
              key={id}
              height="100%"
              gap="5px"
              flexDirection="column"
              alignItems="center"
              minWidth="90px"
              borderBottom={category === value ? '1.5px solid white' : null}
              onClick={() => setCategory(value)}
            >
              <Image
                src={require(`../Assets/Images/genre_thumbnail_${value}.png`)}
                width="70px"
                height="70px"
              />
              <Text
                fontSize="12px"
                color="#c7c7c7"
                fontWeight="500"
                marginBottom="10px"
                textTransform="capitalize"
              >
                {value}
              </Text>
            </Flex>
          ))}
        </Flex>
      ) : (
        <Flex
          minWidth="258px"
          height="324px"
          backgroundColor="#121317"
          flexDirection="column"
          paddingY="10px"
          paddingX="10px"
          position="sticky"
        >
          <Flex width="100%" height="100%" paddingX="24px" alignItems="center">
            <Text fontSize="18px" fontWeight="700">
              Categories
            </Text>
          </Flex>
          <Divider />
          {categories.map((value, id) => (
            <Box key={id} width="100%" height="100%">
              <Link
                width="100%"
                height="100%"
                paddingX="24px"
                display="flex"
                alignItems="center"
                color={category === value ? 'white' : '#838991'}
                _hover={{ textDecoration: 'none', color: 'white' }}
                onClick={() => setCategory(value)}
              >
                <Text
                  fontSize="17px"
                  fontWeight="500"
                  textTransform="capitalize"
                >
                  {value}
                </Text>
              </Link>
              {id !== categories.length - 1 && (
                <Divider borderColor={category === value ? 'white' : null} />
              )}
            </Box>
          ))}
        </Flex>
      )}

      <Flex
        width="100vw"
        maxWidth="800px"
        flexDirection="column"
        gap={isMobile ? '0px' : '12px'}
      >
        {shortsData.map((data, id) => {
          if (id === shortsData.length - 1) {
            return (
              <Box key={id} ref={lastShortsRef}>
                {id}
                <ShortsCard {...data} />
                {isMobile && <Divider borderWidth="1.5px" width="99%" />}
              </Box>
            );
          } else {
            return (
              <Box key={id}>
                <ShortsCard {...data} />
                {isMobile && <Divider borderWidth="1.5px" width="99%" />}
              </Box>
            );
          }
        })}
      </Flex>

      <Flex
        display={{ base: 'none', xl: 'flex' }}
        minWidth="257px"
        height="fit-content"
        position="relative"
      >
        <Image src={shortAdImage} />
        <Flex
          position="absolute"
          bottom="20px"
          left="16px"
          flexDirection="column"
          gap="20px"
        >
          <Text
            textAlign="center"
            lineHeight="1.38"
            color="white"
            fontWeight="500"
          >
            Watch discovery+ <br /> Shorts while traveling.
          </Text>
          <Divider borderBottom="2px solid #22252a" width="220px" />
          <Text
            marginTop="-20px"
            textAlign="center"
            lineHeight="1.38"
            color="white"
            fontWeight="500"
          >
            Available on
          </Text>

          <Flex gap="5px" marginTop="-10px">
            <Image src={googlePlayImage} height="36px" width="80%" />
            <Image src={appleStoreImage} height="36px" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Shorts;

// 1. Mobile responsive - done
// 2. Infinite scroll - first draft done

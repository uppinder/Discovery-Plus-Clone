import React, { useEffect, useState } from 'react';
import { Divider, Flex, Image, Link, Text } from '@chakra-ui/react';
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
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [shortsData, setShortsData] = useState(Array(4).fill(sampleShortsData));

  const fetchShorts = () => {
    try {
      console.log('Fetching data...');

      setTimeout(() => {
        setShortsData(prevData => [
          ...prevData,
          ...Array(4).fill(sampleShortsData),
        ]);

        console.log('Data fetched');
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShorts();
  }, [isLoading]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        !isLoading &&
        document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [isLoading]);

  return (
    <Flex
      width="100%"
      height="100%"
      gap="28px"
      paddingX="27px"
      paddingTop="25px"
    >
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
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'all' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('all')}
        >
          <Text fontSize="17px" fontWeight="500">
            All
          </Text>
        </Link>
        <Divider borderColor={category === 'all' ? 'white' : null} />
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'adventure' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('adventure')}
        >
          <Text fontSize="17px" fontWeight="500">
            Adventure
          </Text>
        </Link>
        <Divider borderColor={category === 'adventure' ? 'white' : null} />
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'food' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('food')}
        >
          <Text fontSize="17px" fontWeight="500">
            Food
          </Text>
        </Link>
        <Divider borderColor={category === 'food' ? 'white' : null} />
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'science' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('science')}
        >
          <Text fontSize="17px" fontWeight="500">
            Science
          </Text>
        </Link>
        <Divider borderColor={category === 'science' ? 'white' : null} />
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'animals' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('animals')}
        >
          <Text fontSize="17px" fontWeight="500">
            Animals
          </Text>
        </Link>
        <Divider borderColor={category === 'animals' ? 'white' : null} />
        <Link
          width="100%"
          height="100%"
          paddingX="24px"
          display="flex"
          alignItems="center"
          color={category === 'lifestyle' ? 'white' : '#838991'}
          _hover={{ textDecoration: 'none', color: 'white' }}
          onClick={() => setCategory('lifestyle')}
        >
          <Text fontSize="17px" fontWeight="500">
            Lifestyle
          </Text>
        </Link>
      </Flex>

      <Flex width="100%" maxWidth="800px" flexDirection="column" gap="12px">
        {shortsData.map((currData, id) => (
          <ShortsCard key={id} {...currData} />
        ))}
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

// 1. Mobile responsive
// 2. Infinite scroll - first draft done

import {
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import googleStoreImage from '../Assets/Images/google_play_download.png';
import appleStoreImage from '../Assets/Images/apple_store_download.png';
import youtubeRedIcon from '../Assets/Images/youtube_red_icon.png';
import facebookIcon from '../Assets/Images/facebook_logo_square.png';
import discoveryIcon from '../Assets/Images/discovery_small_icon.svg';

import React from 'react';

function Footer() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const footerBottomStyle = { textDecoration: 'none', color: 'white' };

  return (
    <Grid
      justifySelf="flex-end"
      className="footer"
      height="fit-content"
      gridTemplateRows={['1fr 1fr', '1fr 100px']}
      padding="2vh 1.5vw"
      paddingBottom={isMobile ? '80px' : '0'}
      color="#838991"
      gap="25px"
    >
      <Grid
        gridTemplateColumns={['auto', '1fr auto auto']}
        gridTemplateRows={['repeat(3, auto)', 'auto']}
        gap="20px"
      >
        <Grid gap="5px">
          <HStack spacing="10px">
            <EmailIcon />{' '}
            <Link _hover={footerBottomStyle} href="mailto:hello@discovery.in">
              hello@discovery.in
            </Link>
          </HStack>
          <HStack spacing="10px">
            <PhoneIcon />{' '}
            <Link _hover={footerBottomStyle} href="tel:022-44444444">
              022-44444444
            </Link>
            <Link _hover={footerBottomStyle} href="tel:+91-9999999999">
              +91-9999999999
            </Link>
            <Text>(Mon-Fri, excluding holidays 11am - 4pm)</Text>
          </HStack>
          <HStack spacing="10px">
            <Image src={discoveryIcon} />{' '}
            <Text>
              Discovery India, 5th Floor, WeWork BKC, C20 G Block, Bandra Kurla
              Complex, Mumbai 400051
            </Text>
          </HStack>
        </Grid>

        <Grid height="fit-content" gap="10px">
          <Text>Follow Us</Text>
          <HStack>
            <Image src={youtubeRedIcon} maxHeight="35px" />
            <Image src={facebookIcon} maxHeight="35px" />
          </HStack>
        </Grid>

        <Grid height="fit-content" gap="10px">
          <Text>Discovery+</Text>
          <HStack>
            <Image src={googleStoreImage} maxHeight="40px" />
            <Image src={appleStoreImage} maxHeight="40px" />
          </HStack>
        </Grid>
      </Grid>
      <Grid gridTemplateRows={['0.8fr auto 1fr']}>
        <Stack
          direction={['column', 'row']}
          alignItems={['null', 'center']}
          gap="20px"
        >
          <Link _hover={footerBottomStyle}>Advertising Services</Link>
          <Link _hover={footerBottomStyle}>Online Advertising</Link>
          <Link _hover={footerBottomStyle}>Terms & Conditions</Link>
          <Link _hover={footerBottomStyle}>Support</Link>
        </Stack>
        <Divider borderTop="1.5px solid #383e47" margin={['5% 0%', '0%']} />
        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          alignItems={['null', 'center']}
          gap="20px"
        >
          <Stack direction={['column', 'row']} gap="20px">
            <Link _hover={footerBottomStyle}>Privacy Policy</Link>
            <Link _hover={footerBottomStyle}>Terms of Use</Link>
            <Link _hover={footerBottomStyle}>FAQ's</Link>
          </Stack>
          <Text>
            Copyright © 2023 Discovery, Inc. or its subsidiaries and affiliates.
            All rights reserved.
          </Text>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default Footer;

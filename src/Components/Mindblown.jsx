import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { fetchMindblownData } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import {
  Divider,
  Flex,
  Grid,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import { DotsThreeOutlineVertical, Play } from '@phosphor-icons/react';

import ShowItem from './ShowItem';

function Mindblown() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const location = useLocation();
  const mindblownIdPattern = new RegExp('^/mindblown/[A-Za-z0-9-_]+$');
  const isMindblownPage = mindblownIdPattern.test(location.pathname);
  const isMindblownPageMobileView = isMindblownPage && isMobile;

  const mindblownId = useParams().mindblownId;
  const mindblownData = useSelector(state => state.mindblown);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(mindblownData[mindblownId])) {
      dispatch(fetchMindblownData(mindblownId));
    }

    console.log(mindblownData[mindblownId]);
  }, [dispatch, mindblownData, mindblownId]);

  if (isEmpty(mindblownData[mindblownId])) {
    return (
      <Flex
        minWidth="100vw"
        height="400px"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" speed="0.56s" />
      </Flex>
    );
  } else {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Flex
          marginY="1%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={isMobile ? '100%' : '80%'}
        >
          {/* Thumbnail */}
          <Image
            src={mindblownData[mindblownId]['banner']}
            borderRadius={isMindblownPageMobileView ? '0px' : '10px'}
          />

          {/* Description */}
          <Flex
            width="100%"
            marginY="14px"
            justifyContent="space-between"
            paddingX={isMindblownPageMobileView ? '14px' : '0px'}
          >
            {/* Left side */}
            <Flex flexDirection="column" gap="6px" flex="1">
              <Flex alignItems="center">
                <Text
                  fontSize={isMindblownPageMobileView ? '18px' : '28px'}
                  color="white"
                  fontWeight="600"
                >
                  {mindblownData[mindblownId]['title']}
                </Text>
              </Flex>

              <Flex width="100%" flexDirection="column" gap="12px">
                <Flex
                  to="/video/man-vs-wild/the-rockies"
                  as={ReactRouterLink}
                  width={isMindblownPageMobileView ? '100%' : 'fit-content'}
                  height="40px"
                  borderRadius="4px"
                  backgroundColor="#2175d9"
                  justifyContent="center"
                  alignItems="center"
                  padding="10px 12px"
                  cursor="pointer"
                  order={isMindblownPageMobileView ? '2' : '1'}
                  gap="5px"
                >
                  <Play size={18} color="white" weight="fill" />
                  <Text color="white" fontWeight="700" lineHeight="1.2">
                    Watch Now
                  </Text>
                </Flex>

                <Text
                  order={isMindblownPageMobileView ? '1' : '2'}
                  color="#9ba1a9"
                  lineHeight="1.43"
                  fontWeight="500"
                  fontSize={isMindblownPageMobileView ? '12px' : '15px'}
                >
                  {mindblownData[mindblownId]['desc']}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider borderWidth=".80px" />
          {/* Episodes */}

          <Flex marginTop="25px" width="100%">
            <Grid
              width="100%"
              height="100%"
              gridTemplateColumns={{
                base: 'repeat(1, minmax(0, 100%))',
                md: 'repeat(3, minmax(0, 100%))',
                lg: 'repeat(4, minmax(0, 100%))',
                xl: 'repeat(5, minmax(0, 100%))',
              }}
              gridColumnGap="10px"
              gridRowGap={isMindblownPageMobileView ? '2px' : '16px'}
            >
              {mindblownData[mindblownId]['episodes'].map(
                (episodeData, index) => (
                  <Flex key={index} position="relative">
                    <Link
                      key={index}
                      as={ReactRouterLink}
                      to={`${episodeData['id'].replace('videos', 'video')}`}
                      position="relative"
                      height={isMindblownPageMobileView ? null : '190px'}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <ShowItem
                        {...episodeData}
                        timeOverlay={true}
                        isShowPageMobileView={isMindblownPageMobileView}
                      />
                    </Link>
                    {isMindblownPageMobileView && (
                      <Menu>
                        <MenuButton
                          size={20}
                          as={IconButton}
                          icon={
                            <DotsThreeOutlineVertical
                              size={24}
                              color="#9b9b9b"
                              weight="fill"
                            />
                          }
                          variant="unstyled"
                          position="absolute"
                          top="6px"
                          right="0"
                        />
                        <MenuList
                          backgroundColor="#121317"
                          minWidth="120px"
                          borderRadius="0px"
                          paddingY="4px"
                        >
                          <MenuItem backgroundColor="#121317" fontSize="14px">
                            Add to Favourite
                          </MenuItem>
                          <MenuItem backgroundColor="#121317" fontSize="14px">
                            Share
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </Flex>
                )
              )}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Mindblown;

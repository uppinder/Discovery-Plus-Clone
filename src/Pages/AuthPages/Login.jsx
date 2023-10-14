import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import googleIcon from '../../Assets/Images/signin_google_logo.svg';
import facebookIcon from '../../Assets/Images/signin_facebook_icon.svg';
import appleIcon from '../../Assets/Images/signin_apple_logo.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../Actions';
import discoveryPlusApi from '../../Api';

function Login() {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const navigate = useNavigate();

  const [inputFocus, setInputFocus] = useState(false);
  const formik = useFormik({
    initialValues: {
      mobileNum: '',
    },
    validationSchema: Yup.object({
      mobileNum: Yup.string().matches(
        /^[0-9]{10}$/,
        'Please enter a valid 10 digit mobile number'
      ),
    }),
    onSubmit: values => {
      navigate('/login/otp', { state: { mobileNum: values.mobileNum } });
    },
  });

  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      const saveUserDetails = async userId => {
        try {
          await discoveryPlusApi.get(`/users/${userId}`);

          //   console.log(userData);
        } catch (error) {
          if (error.response.status === 404) {
            // If user not found in database, include them
            try {
              await discoveryPlusApi.post('/users', {
                id: userId,
                favourite_shows: [],
                favourite_episodes: [],
              });
              //   console.log(data);
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log(error);
          }
        }
      };

      const fetchUserDetails = async access_token => {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
              },
            }
          );

          dispatch(setUserProfile(data));
          saveUserDetails(data['id']);
          navigate('/home');
        } catch (error) {
          console.log(error);
        }
      };

      //   console.log(tokenResponse);
      fetchUserDetails(tokenResponse.access_token);
    },
    onError: error => console.log('Login Failed:', error),
  });

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      {/* Login container */}
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="-50px"
      >
        <Text fontSize="24px" fontWeight="600" color="#fff" marginBottom="14px">
          Sign In Now
        </Text>
        <Flex
          flexDirection="column"
          border="1px solid #fff"
          borderRadius="6px"
          padding="24px 24px 44px 24px"
        >
          <Text
            textAlign="center"
            color="#fff"
            marginTop="12px"
            marginBottom="18px"
          >
            Please sign in with your {isMobile && <br />} mobile number
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              width={isMobile ? '280px' : '380px'}
              marginBottom="40px"
              marginX="auto"
            >
              {(inputFocus || formik.values.mobileNum.length > 0) && (
                <InputLeftElement
                  color="#c7c7c7"
                  left={isMobile ? '64px' : '115px'}
                >
                  +91
                </InputLeftElement>
              )}
              <Input
                id="mobileNum"
                name="mobileNum"
                type="number"
                onInput={e => (e.target.value = e.target.value.slice(0, 10))}
                onChange={formik.handleChange}
                onFocus={() => setInputFocus(true)}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNum}
                variant="flushed"
                textAlign="center"
                placeholder="Mobile Number"
                borderColor={
                  formik.touched.mobileNum && formik.errors.mobileNum
                    ? '#ff4040'
                    : '#41435b'
                }
                _hover={{ borderBottom: '1px solid #fff' }}
                _focus={{ borderBottom: '1px solid #fff' }}
              />

              {formik.touched.mobileNum && formik.errors.mobileNum ? (
                <Text
                  position="absolute"
                  color="#ff4040"
                  fontSize="13px"
                  textAlign="center"
                  left={isMobile ? '10px' : '60px'}
                  bottom="-20px"
                  as="i"
                >
                  {formik.errors.mobileNum}
                </Text>
              ) : null}
            </InputGroup>

            <Button
              type="submit"
              variant="unstyled"
              height="44px"
              width={isMobile ? '280px' : '380px'}
              marginX="auto"
              justifyContent="center"
              alignItems="center"
              padding="6px 8px"
              fontSize="16px"
              fontWeight="600"
              whiteSpace="nowrap"
              borderRadius="6px"
              color={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
                  ? '#6c727a'
                  : '#f0f0f1'
              }
              cursor={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
                  ? 'default'
                  : 'pointer'
              }
              backgroundColor={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
                  ? '#383e47'
                  : null
              }
              backgroundImage={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
                  ? null
                  : 'linear-gradient(68deg, #2175d9 39%, #2789ff 69%)'
              }
            >
              Get OTP
            </Button>
          </form>
        </Flex>
        <Text fontSize="15px" fontWeight="500" marginTop="20px">
          Social sign in options:
        </Text>

        <Flex marginTop="12px" marginBottom="20px" gap="36px">
          <Link
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="45px"
            height="45px"
            backgroundColor="#fff"
            borderRadius="50px"
            _hover={{ opacity: '0.8' }}
            onClick={() => login()}
          >
            <Image src={googleIcon} width="14px" height="14px" />
          </Link>
          <Link
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="45px"
            height="45px"
            backgroundColor="#4065b4"
            borderRadius="50px"
            _hover={{ opacity: '0.8' }}
          >
            <Image src={facebookIcon} width="14px" height="14px" />
          </Link>
          <Link
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="45px"
            height="45px"
            backgroundColor="#fff"
            borderRadius="50px"
            _hover={{ opacity: '0.8' }}
          >
            <Image src={appleIcon} width="14px" height="14px" />
          </Link>
        </Flex>

        <Text
          color="#9ba1a9"
          fontWeight="300"
          fontSize="13px"
          textAlign="center"
        >
          By signing in, you agree to {isMobile && <br />} our{' '}
          <Link color="white" fontWeight="500">
            Privacy Policy
          </Link>{' '}
          &{' '}
          <Link color="white" fontWeight="500">
            Terms of Use
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Login;

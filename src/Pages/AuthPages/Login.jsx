import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from '@chakra-ui/react';

import googleIcon from '../../Assets/Images/signin_google_logo.svg';
import facebookIcon from '../../Assets/Images/signin_facebook_icon.svg';
import appleIcon from '../../Assets/Images/signin_apple_logo.svg';

function Login() {
  const [inputFocus, setInputFocus] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);

  const { pathname } = useLocation();

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
      alert(JSON.stringify(values, null, 2));
    },
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
          padding="10px 24px 40px 24px"
        >
          <Text
            textAlign="center"
            color="#fff"
            marginTop="12px"
            marginBottom="18px"
          >
            Please sign in with your mobile number
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <InputGroup width="380px" marginBottom="40px">
              {(inputFocus || formik.values.mobileNum.length > 0) && (
                <InputLeftElement color="#c7c7c7" left="115px" input>
                  +91
                </InputLeftElement>
              )}
              <Input
                id="mobileNum"
                name="mobileNum"
                type="text"
                maxLength={10}
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
                  left="60px"
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
              width="380px"
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

        <Text fontSize="14px" fontWeight="500" marginTop="20px">
          Social sign in options only for existing users
        </Text>

        {pathname.endsWith('providers') ? (
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
        ) : (
          <Link
            to="/login/providers"
            as={ReactRouterLink}
            marginY="8px"
            color="#2789ff"
            fontSize="14px"
          >
            Existing Users {'>'}
          </Link>
        )}

        <Text color="#9ba1a9" fontWeight="300" fontSize="13px">
          By signing in, you agree to our{' '}
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

// 1. Formik&yup ->
// 1a. Modify validation so that only 10 digit mobile number; activateButton set to true when this happens - done
// 1b. Error message styling - done
//
// 2. Get OTP click karne pe go to /login/otp

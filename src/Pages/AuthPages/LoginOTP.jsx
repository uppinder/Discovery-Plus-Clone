import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Flex, Input, InputGroup, Link, Text } from '@chakra-ui/react';

function CountdownTimer({ initialTime, hideTimer }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      hideTimer();
    } else {
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time, hideTimer]);

  return <>{time}</>;
}

function LoginOTP() {
  const [showOTP, setShowOTP] = useState(true);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    if (showOTP) {
      alert('OTP: 3333');
    }

    return () => {
      setShowOTP(false);
    };
  }, [showOTP]);

  const navigate = useNavigate();
  const { state } = useLocation();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().matches(/^[0-9]{4}$/, 'The OTP is incorrect.'),
    }),
    onSubmit: values => {
      if (values.otp === 3333) {
        // Check backend for otp and then navigate to /home
        navigate('/home', { state: { login: true } });
      }
    },
  });

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="-50px"
      >
        <Text fontSize="24px" fontWeight="600" color="#fff" marginBottom="14px">
          Sign In Now
        </Text>

        <Text
          as="i"
          fontWeight="300"
          fontSize="15px"
          color="#c7c7c7"
          marginBottom="20px"
        >
          An OTP has been sent to +91 {state.mobileNum}.
        </Text>

        {showTimer && (
          <Text
            marginTop="-15px"
            marginBottom="20px"
            color="#c7c7c7"
            fontSize="15px"
          >
            Resend OTP in{' '}
            <b>
              <CountdownTimer
                initialTime={5}
                hideTimer={() => setShowTimer(false)}
              />
            </b>{' '}
            seconds
          </Text>
        )}

        <form onSubmit={formik.handleSubmit}>
          <InputGroup width="120px" marginBottom="40px" marginX="auto">
            <Input
              id="otp"
              name="otp"
              type="number"
              onInput={e => (e.target.value = e.target.value.slice(0, 4))}
              maxLength={10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
              variant="flushed"
              textAlign="center"
              placeholder="OTP"
              borderColor={
                formik.touched.otp && formik.errors.otp ? '#ff4040' : '#41435b'
              }
              _hover={{ borderBottom: '1px solid #fff' }}
              _focus={{ borderBottom: '1px solid #fff' }}
              marginBottom={
                formik.touched.otp && formik.errors.otp ? '40px' : null
              }
            />

            {formik.touched.otp && formik.errors.otp ? (
              <Text
                position="absolute"
                color="#ff4040"
                fontSize="13px"
                textAlign="center"
                left="0px"
                bottom="0px"
                as="i"
              >
                {formik.errors.otp}
              </Text>
            ) : null}
          </InputGroup>

          {!showTimer && (
            <Flex>
              <Link
                marginBottom="24px"
                marginX="auto"
                color="#2789ff"
                fontSize="14px"
                onClick={() => {
                  setShowOTP(true);
                  setShowTimer(true);
                }}
              >
                Resend OTP
              </Link>
            </Flex>
          )}
          <Button
            type="submit"
            variant="unstyled"
            height="44px"
            width="250px"
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
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default LoginOTP;

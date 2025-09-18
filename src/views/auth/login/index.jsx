import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { auth, googleProvider } from "../../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function SignIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  // Chakra color mode
  const textColor = useColorModeValue("green.800", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("green.800", "secondaryGray.600");
  const textColorBrand = useColorModeValue("green.500", "green.300");
  const googleBg = useColorModeValue("green.100", "whiteAlpha.200");
  const googleText = useColorModeValue("green.800", "white");
  const googleHover = useColorModeValue(
    { bg: "green.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "green.300" },
    { bg: "whiteAlpha.200" }
  );

  // Dynamic body background
  const bodyBg = useColorModeValue("#ffffff", "#0C0C0D");
  useEffect(() => {
    document.body.style.background = bodyBg;
  }, [bodyBg]);

  // Handle Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard"); // Redirect to /admin/dashboard after successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Handle Google SSO
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/admin/dashboard"); // Redirect to /admin/dashboard after successful login
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "0px", md: "0px" }}
        px={{ base: "5px", md: "0px" }}
        mt={{ base: "0px", md: "10vh" }}
        flexDirection="column"
      >
        {/* Heading */}
        <Box me="auto" mb="16px">
          <Heading color={textColor} fontSize="36px" mb="1px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>

        {/* Form */}
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            {/* Email */}
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email
              <chakra.span color="#00B474 !" ml="2px" fontWeight="bold">
                *
              </chakra.span>
            </FormLabel>
            <Input
              isRequired
              variant="auth"
              fontSize="sm"
              type="email"
              placeholder="Enter your email"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Password
              <chakra.span color="#00B474" ml="2px" fontWeight="bold">
                *
              </chakra.span>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired
                fontSize="sm"
                placeholder="Enter your password"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            {/* Error Message */}
            {error && (
              <Text color="red.500" fontSize="sm" mb="16px">
                {error}
              </Text>
            )}

            {/* Keep logged in & Forgot password */}
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox id="remember-login" colorScheme="green" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>

            {/* Sign In Button */}
            <Button
              fontSize="sm"
              colorScheme="green"
              fontWeight="500"
              w="100%"
              h="50px"
              mb="24px"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </FormControl>

          {/* Divider */}
          <Flex align="center" my="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>

          {/* Google SSO */}
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            leftIcon={<FcGoogle />}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          {/* Sign up link */}
          <Flex flexDirection="column" justifyContent="center" alignItems="start" mt="0px">
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/register">
                <Text color={textColorBrand} as="span" ml="5px" fontWeight="500">
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;

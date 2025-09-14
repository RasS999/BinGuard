import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  // Colors
  const bgPage = useColorModeValue("gray.50", "#0C0C0D");
  const bgBox = useColorModeValue("white", "#121212");
  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputText = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = "gray.400";
  const brandColor = "#00B474";

  const inputFocus = { borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending forgot password email
    console.log("Reset email sent to:", email);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgPage} px={{ base: 4, md: 0 }}>
      <Box w={{ base: "100%", md: "400px" }} bg={bgBox} p={{ base: 6, md: 10 }} borderRadius="lg">
        <Box mb="8" textAlign="center">
          <Heading color={textColor} fontSize="3xl">Forgot Password</Heading>
          <Text color={textColorSecondary} fontSize="md" mt="2">
            Enter your email to reset your password
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel color={textColor}>Email <Text as="span" color={brandColor}>*</Text></FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg={inputBg}
              color={inputText}
              _focus={inputFocus}
              required
            />
          </FormControl>

          <Button
            mt="6"
            w="100%"
            colorScheme="green"
            size="lg"
            fontWeight="500"
            type="submit"
          >
            Send Reset Link
          </Button>
        </form>

        <Text mt="4" fontSize="sm" color={textColorSecondary} textAlign="center">
          Remembered your password?{" "}
          <NavLink to="/auth/sign-in" style={{ color: brandColor, fontWeight: "500" }}>Login</NavLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  SimpleGrid,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function RegisterAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Birthday state initialized as null
  const [birthYear, setBirthYear] = useState(null);
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthDay, setBirthDay] = useState(null);

  // Adaptive colors
  const bgPage = useColorModeValue("gray.50", "#0C0C0D");
  const bgBox = useColorModeValue("white", "#121212");
  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputText = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = "gray.400";
  const brandColor = "#00B474";
  const menuBg = useColorModeValue("white", "#1A1A1A");
  const menuColor = useColorModeValue("gray.800", "white");
  const menuHover = "#00B474";

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
  ];

  const getDaysInMonth = (month, year) => {
    if (month === 2)
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    return months[month - 1].days;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const inputFocus = {
    borderColor: brandColor,
    boxShadow: `0 0 0 1px ${brandColor}`
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgPage}
      px={{ base: 4, md: 0 }}
    >
      <Box
        w={{ base: "100%", md: "900px" }}
        bg={bgBox}
        p={{ base: 6, md: 10 }}
        borderRadius="lg"
      >
        {/* Heading */}
        <Box mb="8" textAlign="center">
          <Heading color={textColor} fontSize="3xl">
            Register
          </Heading>
          <Text color={textColorSecondary} fontSize="md" mt="2">
            Create your admin account for BinGuard
          </Text>
        </Box>

        {/* Name & Phone */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
          <FormControl>
            <FormLabel color={textColor}>
              First Name{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <Input
              placeholder="Enter First Name"
              bg={inputBg}
              color={inputText}
              _focus={inputFocus}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>
              Last Name{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <Input
              placeholder="Enter Last Name"
              bg={inputBg}
              color={inputText}
              _focus={inputFocus}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>
              Phone Number{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <Input
              placeholder="Enter Phone Number"
              bg={inputBg}
              color={inputText}
              _focus={inputFocus}
            />
          </FormControl>
        </SimpleGrid>

        {/* Birthday & Email */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="4">
          <FormControl>
            <FormLabel color={textColor}>
              Birthday{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <Flex gap="2">
              {/* Month */}
              <Menu>
                <MenuButton
                  as={Button}
                  flex="1"
                  bg={menuBg}
                  color={menuColor}
                  borderRadius="8px"
                  border={
                    birthMonth ? `1px solid ${brandColor}` : "1px solid gray"
                  }
                  textAlign="left"
                  pl="3"
                  pr="3"
                  rightIcon={null}
                  fontWeight="normal" // <-- dito
                >
                  {birthMonth ? months[birthMonth - 1].name : "Select Month"}
                </MenuButton>

                <MenuList
                  bg={menuBg}
                  color={menuColor}
                  maxH="200px"
                  overflowY="auto"
                >
                  <MenuItem isDisabled key="placeholder-month">
                    -- Select Month --
                  </MenuItem>
                  {months.map((m, i) =>
                    <MenuItem
                      key={i}
                      bg={birthMonth === i + 1 ? menuHover : menuBg}
                      _hover={{ bg: menuHover, color: "white" }}
                      onClick={() => setBirthMonth(i + 1)}
                    >
                      {m.name}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>

              {/* Day */}
              <Menu>
                <MenuButton
                  as={Button}
                  flex="1"
                  bg={menuBg}
                  color={menuColor}
                  borderRadius="8px"
                  border={
                    birthDay ? `1px solid ${brandColor}` : "1px solid gray"
                  }
                  textAlign="left"
                  pl="3"
                  pr="3"
                  rightIcon={null}
                  fontWeight="normal" // <-- dito
                >
                  {birthDay ? birthDay : "Select Day"}
                </MenuButton>
                <MenuList
                  bg={menuBg}
                  color={menuColor}
                  maxH="200px"
                  overflowY="auto"
                >
                  {Array.from(
                    {
                      length: getDaysInMonth(
                        birthMonth || 1,
                        birthYear || new Date().getFullYear()
                      )
                    },
                    (_, i) =>
                      <MenuItem
                        key={i}
                        bg={birthDay === i + 1 ? menuHover : menuBg}
                        _hover={{ bg: menuHover, color: "white" }}
                        onClick={() => setBirthDay(i + 1)}
                      >
                        {i + 1}
                      </MenuItem>
                  )}
                </MenuList>
              </Menu>

              {/* Year */}
              <Menu>
                <MenuButton
                  as={Button}
                  flex="1"
                  bg={menuBg}
                  color={menuColor}
                  borderRadius="8px"
                  border={
                    birthYear ? `1px solid ${brandColor}` : "1px solid gray"
                  }
                  textAlign="left"
                  pl="3"
                  pr="3"
                  rightIcon={null}
                  fontWeight="normal" // <-- dito
                >
                  {birthYear ? birthYear : "Select Year"}
                </MenuButton>
                <MenuList
                  bg={menuBg}
                  color={menuColor}
                  maxH="200px"
                  overflowY="auto"
                >
                  <MenuItem isDisabled key="placeholder-year">
                    -- Select Year --
                  </MenuItem>
                  {years.map(y =>
                    <MenuItem
                      key={y}
                      bg={birthYear === y ? menuHover : menuBg}
                      _hover={{ bg: menuHover, color: "white" }}
                      onClick={() => setBirthYear(y)}
                    >
                      {y}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel color={textColor}>
              Email{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              bg={inputBg}
              color={inputText}
              _focus={inputFocus}
            />
          </FormControl>
        </SimpleGrid>

        {/* Password & Confirm */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="4">
          <FormControl>
            <FormLabel color={textColor}>
              Password{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                bg={inputBg}
                color={inputText}
                _focus={inputFocus}
              />
              <InputRightElement>
                <Icon
                  as={showPassword ? MdOutlineRemoveRedEye : RiEyeCloseLine}
                  cursor="pointer"
                  color={textColorSecondary}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel color={textColor}>
              Confirm Password{" "}
              <Text as="span" color={brandColor}>
                *
              </Text>
            </FormLabel>
            <InputGroup>
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                bg={inputBg}
                color={inputText}
                _focus={inputFocus}
              />
              <InputRightElement>
                <Icon
                  as={showConfirm ? MdOutlineRemoveRedEye : RiEyeCloseLine}
                  cursor="pointer"
                  color={textColorSecondary}
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        {/* Terms */}
        <Checkbox mt="6">
          <Text fontSize="sm">
            I agree with{" "}
            <NavLink
              to="/terms"
              style={{ color: brandColor, fontWeight: "500" }}
            >
              Terms of Service
            </NavLink>{" "}
            and{" "}
            <NavLink
              to="/privacy"
              style={{ color: brandColor, fontWeight: "500" }}
            >
              Privacy Policy
            </NavLink>
          </Text>
        </Checkbox>

        {/* Register */}
        <Button mt="6" w="100%" colorScheme="green" size="lg" fontWeight="500">
          Register
        </Button>

        {/* Login */}
        <Text
          mt="4"
          fontSize="sm"
          color={textColorSecondary}
          textAlign="center"
        >
          Already have an account?{" "}
          <NavLink
            to="/auth/sign-in"
            style={{ color: brandColor, fontWeight: "500" }}
          >
            Login
          </NavLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default RegisterAdmin;

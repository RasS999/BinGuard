import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  useColorModeValue,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";

export default function UserInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [birthMonth, setBirthMonth] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [birthYear, setBirthYear] = useState(null);

  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputColor = useColorModeValue("gray.800", "white");
  const inputFocus = { borderColor: "#00B474", boxShadow: "0 0 0 1px #00B474" };

  const buttonBg = useColorModeValue("#00B474", "#00B474");
  const buttonColor = useColorModeValue("white", "white");

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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const getDaysInMonth = (month, year) => {
    if (!month) return 31;
    if (month === 2)
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    return months[month - 1].days;
  };

  const handleSave = () => {
    console.log({
      firstName,
      lastName,
      email,
      phone,
      birthMonth,
      birthDay,
      birthYear
    });
  };

  return (
    <Box
      p={6}
      bg={useColorModeValue("white", "#121212")}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      h="90%"
    >
      {/* Row 1: First Name / Last Name */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl>
          <FormLabel>
            First Name{" "}
            <Text as="span" color={buttonBg}>
              *
            </Text>
          </FormLabel>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Last Name{" "}
            <Text as="span" color={buttonBg}>
              *
            </Text>
          </FormLabel>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
        </FormControl>
      </SimpleGrid>

      {/* Row 2: Birthday */}
      <FormControl mt={4}>
        <FormLabel>
          Birthday{" "}
          <Text as="span" color={buttonBg}>
            *
          </Text>
        </FormLabel>
        <Flex gap={2}>
          {/* Month */}
          <Menu>
            <MenuButton
              as={Button}
              flex="1"
              bg={inputBg}
              color={inputColor}
              borderRadius="8px"
              border={birthMonth ? `1px solid ${buttonBg}` : "1px solid gray"}
              textAlign="left"
              pl="3"
              pr="3"
              rightIcon={null}
              fontWeight="normal" // make text normal
            >
              {birthMonth ? months[birthMonth - 1].name : "Select Month"}
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {months.map((m, i) =>
                <MenuItem key={i} onClick={() => setBirthMonth(i + 1)}>
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
              bg={inputBg}
              color={inputColor}
              borderRadius="8px"
              border={birthDay ? `1px solid ${buttonBg}` : "1px solid gray"}
              textAlign="left"
              pl="3"
              pr="3"
              rightIcon={null}
              fontWeight="normal"
            >
              {birthDay ? birthDay : "Select Day"}
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {Array.from(
                {
                  length: getDaysInMonth(birthMonth, birthYear || currentYear)
                },
                (_, i) =>
                  <MenuItem key={i} onClick={() => setBirthDay(i + 1)}>
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
              bg={inputBg}
              color={inputColor}
              borderRadius="8px"
              border={birthYear ? `1px solid ${buttonBg}` : "1px solid gray"}
              textAlign="left"
              pl="3"
              pr="3"
              rightIcon={null}
              fontWeight="normal"
            >
              {birthYear ? birthYear : "Select Year"}
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {years.map(y =>
                <MenuItem key={y} onClick={() => setBirthYear(y)}>
                  {y}
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </FormControl>

      {/* Row 3: Email / Phone */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        <FormControl>
          <FormLabel>
            Email{" "}
            <Text as="span" color={buttonBg}>
              *
            </Text>
          </FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Phone Number{" "}
            <Text as="span" color={buttonBg}>
              *
            </Text>
          </FormLabel>
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
        </FormControl>
      </SimpleGrid>

      {/* Save Button */}
      <Flex mt={6} justifyContent="flex-end">
        <Button
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: useColorModeValue("#00A366", "#00A366") }}
          onClick={handleSave}
          size="sm"
          h="35px"
          px={6}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
}
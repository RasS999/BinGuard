import React, { useState } from "react";
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
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// Firebase imports
import { auth, createUserWithEmailAndPassword, sendEmailVerification, db } from "../../../firebase/firebase";
import { ref, set } from "firebase/database"; // Realtime DB methods

function RegisterAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const bgPage = useColorModeValue("gray.50", "#0C0C0D");
  const bgBox = useColorModeValue("white", "#121212");
  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputText = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = "gray.400";
  const brandColor = "#00B474";

  const inputFocus = {
    borderColor: brandColor,
    boxShadow: `0 0 0 1px ${brandColor}`
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      toast({ title: "Terms not accepted", description: "You must accept the terms.", status: "error", duration: 5000, isClosable: true, position: "top" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Password mismatch", description: "Passwords do not match.", status: "error", duration: 5000, isClosable: true, position: "top" });
      return;
    }

    if (!birthYear || !birthMonth || !birthDay) {
      toast({ title: "Invalid Birth Date", description: "Please select a valid birth date.", status: "error", duration: 5000, isClosable: true, position: "top" });
      return;
    }

    try {
      // 1️⃣ Create Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Send email verification
      await sendEmailVerification(user);

      // 3️⃣ Store user in Realtime Database
      await set(ref(db, `SystemUsers/${user.uid}`), {
        firstName,
        lastName,
        phoneNumber,
        birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
        email,
        role: "admin",
        createdAt: new Date().toISOString()
      });

      // 4️⃣ Success toast
      toast({
        title: "Registration Successful",
        description: "Verification email sent. Please check your inbox.",
        status: "success",
        duration: 10000,
        position: "top",
        isClosable: true
      });

      // 5️⃣ Redirect
      navigate("/SystemUsers");

    } catch (error) {
      console.error("Registration error:", error);
      toast({ title: "Registration Failed", description: error.message, status: "error", duration: 5000, isClosable: true, position: "top" });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgPage} px={{ base: 4, md: 0 }}>
      <Box w={{ base: "100%", md: "900px" }} bg={bgBox} p={{ base: 6, md: 10 }} borderRadius="lg">
        {/* Heading */}
        <Box mb="8" textAlign="center">
          <Heading color={textColor} fontSize="3xl">Register</Heading>
          <Text color={textColorSecondary} fontSize="md" mt="2">Create your admin account for BinGuard</Text>
        </Box>

        {/* Name & Phone */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
          <FormControl>
            <FormLabel color={textColor}>First Name *</FormLabel>
            <Input placeholder="Enter First Name" bg={inputBg} color={inputText} _focus={inputFocus} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Last Name *</FormLabel>
            <Input placeholder="Enter Last Name" bg={inputBg} color={inputText} _focus={inputFocus} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Phone Number *</FormLabel>
            <Input placeholder="Enter Phone Number" bg={inputBg} color={inputText} _focus={inputFocus} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </FormControl>
        </SimpleGrid>

        {/* Email */}
        <FormControl mt="4">
          <FormLabel color={textColor}>Email *</FormLabel>
          <Input type="email" placeholder="Enter Email" bg={inputBg} color={inputText} _focus={inputFocus} value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        {/* Birth Date */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="4">
          <FormControl>
            <FormLabel color={textColor}>Birth Year *</FormLabel>
            <Select placeholder="Select Year" bg={inputBg} color={inputText} _focus={inputFocus} value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Birth Month *</FormLabel>
            <Select placeholder="Select Month" bg={inputBg} color={inputText} _focus={inputFocus} value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={textColor}>Birth Day *</FormLabel>
            <Select placeholder="Select Day" bg={inputBg} color={inputText} _focus={inputFocus} value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>

        {/* Password & Confirm */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" mt="4">
          <FormControl>
            <FormLabel color={textColor}>Password *</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" bg={inputBg} color={inputText} _focus={inputFocus} value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement>
                <Icon as={showPassword ? MdOutlineRemoveRedEye : RiEyeCloseLine} cursor="pointer" color={textColorSecondary} onClick={() => setShowPassword(!showPassword)} />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel color={textColor}>Confirm Password *</FormLabel>
            <InputGroup>
              <Input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" bg={inputBg} color={inputText} _focus={inputFocus} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <InputRightElement>
                <Icon as={showConfirm ? MdOutlineRemoveRedEye : RiEyeCloseLine} cursor="pointer" color={textColorSecondary} onClick={() => setShowConfirm(!showConfirm)} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        {/* Terms */}
        <Checkbox mt="6" isChecked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}>
          <Text fontSize="sm">
            I agree with <NavLink to="/terms" style={{ color: brandColor, fontWeight: "500" }}>Terms of Service</NavLink> and <NavLink to="/privacy" style={{ color: brandColor, fontWeight: "500" }}>Privacy Policy</NavLink>
          </Text>
        </Checkbox>

        {/* Register */}
        <Button mt="6" w="100%" colorScheme="green" size="lg" fontWeight="500" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Flex>
  );
}

export default RegisterAdmin;

import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  useColorModeValue,
  Flex,
  Text
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputColor = useColorModeValue("gray.800", "white");
  const inputFocus = { borderColor: "#00B474", boxShadow: "0 0 0 1px #00B474" };

  const buttonBg = useColorModeValue("#00B474", "#00B474");
  const buttonColor = useColorModeValue("white", "white");

  const handleSave = () => {
    console.log({ currentPassword, newPassword, confirmPassword });
    // API call can go here
  };

  return (
    <Box
      p={6}
      bg={useColorModeValue("white", "#121212")}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      h="91%"
    >
      {/* Current Password */}
      <FormControl mb={4}>
        <FormLabel>
          Current Password <Text as="span" color={buttonBg}>*</Text>
        </FormLabel>
        <InputGroup>
          <Input
            type={showCurrent ? "text" : "password"}
            placeholder="Enter Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
          <InputRightElement>
            <Icon
              as={showCurrent ? MdOutlineRemoveRedEye : RiEyeCloseLine}
              cursor="pointer"
              color={showCurrent ? "green.500" : "gray.400"}
              boxSize={5}
              onClick={() => setShowCurrent(!showCurrent)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* New Password */}
      <FormControl mb={4}>
        <FormLabel>
          New Password <Text as="span" color={buttonBg}>*</Text>
        </FormLabel>
        <InputGroup>
          <Input
            type={showNew ? "text" : "password"}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
          <InputRightElement>
            <Icon
              as={showNew ? MdOutlineRemoveRedEye : RiEyeCloseLine}
              cursor="pointer"
              color={showNew ? "green.500" : "gray.400"}
              boxSize={5}
              onClick={() => setShowNew(!showNew)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Confirm Password */}
      <FormControl mb={4}>
        <FormLabel>
          Confirm Password <Text as="span" color={buttonBg}>*</Text>
        </FormLabel>
        <InputGroup>
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg={inputBg}
            color={inputColor}
            _focus={inputFocus}
          />
          <InputRightElement>
            <Icon
              as={showConfirm ? MdOutlineRemoveRedEye : RiEyeCloseLine}
              cursor="pointer"
              color={showConfirm ? "green.500" : "gray.400"}
              boxSize={5}
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Save Button */}
      <Flex mt="auto" justifyContent="flex-end">
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

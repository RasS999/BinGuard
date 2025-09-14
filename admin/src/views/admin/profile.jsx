import React from "react";
import { Box, SimpleGrid, Heading, useColorModeValue } from "@chakra-ui/react";

import UserInformation from "views/admin/default/components/UserInformation";
import ChangePassword from "views/admin/default/components/ChangePassword";

export default function ProfileUserInformation() {
  // Adaptive background for light/dark mode
  const boxBg = useColorModeValue("white", "#121212"); // white in light mode, dark gray in dark mode

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: 4, md: 8 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* User Information Box */}
        <Box
          bg={boxBg}
          p={6}
          borderRadius="lg"
        >
          <Heading fontSize="xl" mb={4} color={useColorModeValue("gray.800", "white")}>
            User Information
          </Heading>
          <UserInformation />
        </Box>

        {/* Change Password Box */}
        <Box
          bg={boxBg}
          p={6}
          borderRadius="lg"
        >
          <Heading fontSize="xl" mb={4} color={useColorModeValue("gray.800", "white")}>
            Change Password
          </Heading>
          <ChangePassword />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

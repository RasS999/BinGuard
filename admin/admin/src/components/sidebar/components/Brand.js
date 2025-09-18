import React from "react";

// Chakra imports
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

// Import your logo
import logoImage from "assets/img/layout/logo.png";

export function SidebarBrand() {
  // Chakra color mode for text
  const textColor = useColorModeValue("green.800", "white");

  return (
    <Flex direction="column" mt="2px" mb="20px">
      {/* Logo + text container */}
      <Flex align="center" gap="10px" ps="40px">
        <Image src={logoImage} alt="BinGuard Logo" h="50px" w="50px" />
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          BinGuard
        </Text>
      </Flex>

      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;

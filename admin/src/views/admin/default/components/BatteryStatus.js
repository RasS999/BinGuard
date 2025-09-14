import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function BatteryStatus() {
  const value = 82;

  // Dynamic colors for light/dark mode
  const textColor = useColorModeValue("black", "white"); // Border, tip, and percentage text
  const labelColor = useColorModeValue("black", "white"); // Label color
  const fillColor = useColorModeValue("green.400", "green.300"); // Battery fill can also adapt

  return (
    <Card p="20px" minH="120px">
      {/* Label */}
      <Text fontSize="lg" fontWeight="700" color={labelColor} mb="15px">
        Battery
      </Text>

      {/* Battery Icon + Fill */}
      <Flex align="center" gap="12px">
        <Box
          position="relative"
          w="50px"
          h="24px"
          border="2px solid"
          borderColor={textColor} // battery border
          borderRadius="4px"
        >
          {/* Fill */}
          <Box
            position="absolute"
            top="0"
            left="0"
            h="100%"
            w={`${value}%`}
            bg={fillColor} // battery fill
            borderRadius="2px 0 0 2px"
            transition="width 0.5s ease-in-out"
          />
          {/* Battery Tip */}
          <Box
            position="absolute"
            right="-6px"
            top="25%"
            w="4px"
            h="50%"
            bg={textColor} // battery tip
            borderRadius="1px"
          />
        </Box>

        {/* Percentage Text */}
        <Text fontSize="lg" fontWeight="700" color={textColor}>
          {value}%
        </Text>
      </Flex>
    </Card>
  );
}

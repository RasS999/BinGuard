import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function TrashCapacity() {
  // Values set directly sa JS
  const value = 65;
  const maxCapacity = 100;

  // Mas maliit na trashcan
  const width = 40;   // dating 60
  const height = 80;  // dating 120

  const fillPercentage = (value / maxCapacity) * 100;

  // Determine color based on percentage
  let fillColor = "green.400";
  let statusText = "Empty";

  if (fillPercentage > 80) {
    fillColor = "red.400";
    statusText = "Full";
  } else if (fillPercentage > 50) {
    fillColor = "orange.400";
    statusText = "Almost Full";
  } else if (fillPercentage > 20) {
    fillColor = "yellow.400";
    statusText = "Moderate";
  }

  // Text color for readability
  const textColor = fillColor === "yellow.400" ? "gray.800" : fillColor;

  // Scale lid and handle relative sa mas maliit na height
  const lidHeight = Math.round(height * 0.12); // 12% ng bin height
  const handleHeight = Math.round(lidHeight * 0.35);
  const handleWidth = Math.round(width * 0.35);

  return (
    <Card p="15px" minH="150px">
      {/* Label */}
      <Text fontSize="md" fontWeight="700" color="black" mb="10px">
        Trash Capacity
      </Text>

      <Flex align="flex-end" gap="12px">
        {/* Trash Bin */}
        <Box position="relative" w={`${width}px`} h={`${height}px`}>
          {/* Lid */}
          <Box
            position="relative"
            w="100%"
            h={`${lidHeight}px`}
            bg="gray.500"
            borderRadius="2px"
            mb="2px"
          >
            {/* Handle */}
            <Box
              position="absolute"
              top={`${Math.round(lidHeight * 0.2)}px`}
              left="50%"
              transform="translateX(-50%)"
              w={`${handleWidth}px`}
              h={`${handleHeight}px`}
              bg="gray.700"
              borderRadius="1px"
            />
          </Box>

          {/* Inverted Trapezoid Bin */}
          <Box
            position="relative"
            w="100%"
            h={`${height - lidHeight}px`}
            clipPath="polygon(0% 0%, 100% 0%, 95% 100%, 10% 100%)"
            bg="gray.300"
            display="flex"
            alignItems="flex-end"
            overflow="hidden"
          >
            {/* Fill */}
            <Box
              w="100%"
              h={`${fillPercentage}%`}
              bg={fillColor}
              transition="height 0.5s ease-in-out"
            />
          </Box>
        </Box>

        {/* Capacity Text */}
        <Box>
          <Text fontSize="lg" fontWeight="700" color={textColor}>
            {Math.round(fillPercentage)}%
          </Text>
          <Text fontSize="sm" fontWeight="500" color={textColor}>
            {statusText}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

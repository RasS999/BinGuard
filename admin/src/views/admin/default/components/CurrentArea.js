import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function CurrentArea(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const labelColor = "black";

  const currentArea = "Office A";

  return (
    <Card p="20px" {...props} minH="120px" borderRadius="12px">
      <Text fontSize="lg" fontWeight="700" color={labelColor} mb="15px">
        Current Status
      </Text>
      <Text fontSize="xl" fontWeight="700" color={textColor}>
        {currentArea}
      </Text>
    </Card>
  );
}

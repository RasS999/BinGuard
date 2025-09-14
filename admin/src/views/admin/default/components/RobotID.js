import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function RobotID(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const labelColor = "black";

  const robotId = "125882544821";

  return (
    <Card p="20px" {...props} minH="120px" borderRadius="12px">
      <Text fontSize="lg" fontWeight="700" color={labelColor} mb="15px">
        Robot ID
      </Text>
      <Text fontSize="xl" fontWeight="700" color={textColor}>
        {robotId}
      </Text>
    </Card>
  );
}

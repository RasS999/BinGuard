import React from "react";
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import { MdSmartToy } from "react-icons/md"; // Robot icon

export default function RobotStatus(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const labelColor = "black"; // Updated to black
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Card p="20px" {...props} minH="120px" bg={bgColor} borderRadius="12px">
      {/* Label */}
      <Text fontSize="lg" fontWeight="700" color={textColor} mb="15px">
        Robot Status
      </Text>

      {/* Icon + Status */}
      <Flex align="center" gap="16px">
        <Icon as={MdSmartToy} w={8} h={8} color="green.400" />
        <Text fontSize="xl" fontWeight="700" color={textColor}>
          Active
        </Text>
      </Flex>
    </Card>
  );
}

import React from "react";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function QuickCommand(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card p="20px" {...props}>
      <Text fontSize="lg" fontWeight="700" color={textColor} mb="15px">
        Quick Command
      </Text>
      <Flex gap="10px" wrap="wrap">
        <Button colorScheme="green" flex="1">Summon</Button>
        <Button colorScheme="green" flex="1">Send to Dock</Button>
        <Button colorScheme="green" flex="1">Stop</Button>
      </Flex>
    </Card>
  );
}

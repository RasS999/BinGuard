import React from "react";
import { Flex, Box, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import Card from "components/card/Card";
import { MdPeople } from "react-icons/md"; // Users icon

export default function UsersStatus(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const labelColor = "black"; // Bold label

  const stats = [
    { label: "Active", value: 2, color: "green.400" },
    { label: "Inactive", value: 6, color: "red.400" },
    { label: "Admin", value: 2, color: "blue.400" },
    { label: "User", value: 6, color: "yellow.400" },
    { label: "Total", value: 8, color: "orange.400" },
  ];

  return (
    <Card p="20px" {...props} minH="120px" borderRadius="12px">
      {/* Label with Icon */}
      <Flex align="center" gap="8px" mb="16px">
        <Icon as={MdPeople} w={7} h={7} color="green.400" />
        <Text fontSize="lg" fontWeight="700" color={labelColor}>
          Users
        </Text>
      </Flex>

      {/* Horizontal layout */}
      <Flex justify="space-between" wrap="wrap" gap="20px">
        {stats.map((item) => (
          <Flex key={item.label} direction="column" align="center" flex="1">
            {/* Colored Circle + Label */}
            <Flex align="center" gap="6px" mb="4px">
              <Box w="12px" h="12px" borderRadius="full" bg={item.color} />
              <Text fontSize="sm" fontWeight="600" color={labelColor}>
                {item.label}
              </Text>
            </Flex>
            {/* Number */}
            <Text fontSize="xl" fontWeight="700" color={textColor}>
              {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}

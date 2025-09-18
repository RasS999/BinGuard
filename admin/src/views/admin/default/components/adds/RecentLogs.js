import React from "react";
import { Box, Flex, Text, Avatar, Image, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // <-- for navigation
import Card from "components/card/Card";
import binguardLogo from "assets/img/layout/binguardlogo.png";

// Sample log data
const logs = [
  {
    avatar: "https://i.pravatar.cc/40?img=8", // User avatar
    message: 'Robert issued "Summon" command',
    date: "04 April 2025 – 04:00 PM",
  },
  {
    avatar: binguardLogo,
    message: "Robot docked for charging",
    date: "04 April 2025 – 03:45 PM",
  },
  {
    avatar: binguardLogo,
    message: 'Task "Send to Dock" completed',
    date: "03 April 2025 – 02:15 PM",
  },
  {
    avatar: binguardLogo,
    message: "Robot resumed operation after charging",
    date: "01 April 2025 – 03:00 PM",
  },
];

export default function RecentLogs(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const dateColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Card p="20px" {...props} minH="300px" borderRadius="12px">
      {/* Header */}
      <Flex justify="space-between" mb="12px" align="center">
        <Text fontSize="lg" fontWeight="700" color={textColor}>
          Recent Logs
        </Text>

        {/* Navigate to Logs page */}
        <Link to="/admin/logs">
          <Text fontSize="sm" color="green.400" cursor="pointer">
            View All
          </Text>
        </Link>
      </Flex>

      {/* Logs List */}
      <Flex direction="column" gap="12px">
        {logs.map((log, idx) => (
          <Flex key={idx} gap="12px" align="flex-start">
            {log.avatar === binguardLogo ? (
              <Image src={log.avatar} boxSize="40px" borderRadius="8px" />
            ) : (
              <Avatar src={log.avatar} boxSize="40px" />
            )}

            <Box>
              <Text fontSize="sm" color={textColor}>
                {log.message}
              </Text>
              <Text fontSize="xs" color={dateColor}>
                {log.date}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}

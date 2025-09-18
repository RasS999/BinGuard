import React from "react";
import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import Card from "components/card/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Chart data
const data = [
  { month: "Jan", Summon: 5, "Send to Dock": 2, Stop: 1 },
  { month: "Feb", Summon: 6, "Send to Dock": 3, Stop: 2 },
  { month: "Mar", Summon: 7, "Send to Dock": 4, Stop: 2 },
  { month: "Apr", Summon: 6, "Send to Dock": 3, Stop: 3 },
  { month: "May", Summon: 8, "Send to Dock": 5, Stop: 2 },
  { month: "Jun", Summon: 9, "Send to Dock": 4, Stop: 3 },
  { month: "Jul", Summon: 7, "Send to Dock": 3, Stop: 2 },
  { month: "Aug", Summon: 8, "Send to Dock": 4, Stop: 2 },
  { month: "Sep", Summon: 6, "Send to Dock": 3, Stop: 3 },
  { month: "Oct", Summon: 7, "Send to Dock": 4, Stop: 2 },
  { month: "Nov", Summon: 9, "Send to Dock": 5, Stop: 3 },
  { month: "Dec", Summon: 8, "Send to Dock": 4, Stop: 2 },
];

// Short month -> full name map
const monthMap = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  const bgColor = useColorModeValue("white", "#0C0D0C");
  const textColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("#E2E8F0", "#121212");

  if (active && payload && payload.length) {
    return (
      <Box
        bg={bgColor}
        p={3}
        borderRadius="12px"
        boxShadow="lg"
        minW="200px"
      >
        {/* Header: full month name */}
        <Text fontWeight="600" fontSize="md" color={textColor} mb={2}>
          {monthMap[label] || label} 2025
        </Text>

        {/* Tasks */}
        <VStack spacing={1} align="stretch">
          {["Summon", "Send to Dock", "Stop"].map((task) => (
            <Box
              key={task}
              p={2}
              borderRadius="6px"
              _hover={{ bg: hoverBg, cursor: "pointer" }}
              color={textColor}
            >
              {task}: {payload[0].payload[task]}
            </Box>
          ))}
        </VStack>
      </Box>
    );
  }

  return null;
};

// Main Component
export default function TaskCompletion(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "#0C0D0C");
  const gridColor = useColorModeValue("#E2E8F0", "#4A5568");

  return (
    <Card p="20px" {...props} minH="350px" bg={bgColor} borderRadius="12px">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="16px">
        <Text fontSize="lg" fontWeight="700" color={textColor}>
          Task Completion Overview
        </Text>

        {/* Legend */}
        <Flex gap="16px">
          <Flex align="center" gap="4px">
            <Box w="12px" h="12px" borderRadius="full" bg="blue.400" />
            <Text fontSize="sm" color={textColor}>Summon</Text>
          </Flex>
          <Flex align="center" gap="4px">
            <Box w="12px" h="12px" borderRadius="full" bg="green.400" />
            <Text fontSize="sm" color={textColor}>Send to Dock</Text>
          </Flex>
          <Flex align="center" gap="4px">
            <Box w="12px" h="12px" borderRadius="full" bg="yellow.400" />
            <Text fontSize="sm" color={textColor}>Stop</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid stroke={gridColor} strokeDasharray="5 5" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Summon" stroke="#3182CE" strokeWidth={3} dot={false} activeDot={{ r: 7, stroke: "#3182CE", strokeWidth: 2, fill: "white" }} />
          <Line type="monotone" dataKey="Send to Dock" stroke="#38A169" strokeWidth={3} dot={false} activeDot={{ r: 7, stroke: "#38A169", strokeWidth: 2, fill: "white" }} />
          <Line type="monotone" dataKey="Stop" stroke="#D69E2E" strokeWidth={3} dot={false} activeDot={{ r: 7, stroke: "#D69E2E", strokeWidth: 2, fill: "white" }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

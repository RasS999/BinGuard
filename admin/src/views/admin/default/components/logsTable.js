import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

// All three datasets
const logData = {
  voiceCommand: [
    { name: "Juan Dela Cruz", command: "Follow Me", result: "Success", note: "Robot is now following", timestamp: "Sept 10, 2025 – 10:32 AM" },
    { name: "Maria Santos", command: "Adios", result: "Success", note: "Returned to dock", timestamp: "Sept 10, 2025 – 09:58 AM" },
    { name: "Juan Dela Cruz", command: "Hey BinGuard", result: "Success", note: "Wake word detected", timestamp: "Sept 09, 2025 – 08:15 PM" },
  ],
  obstacleMovement: [
    { name: "Juan Dela Cruz", event: "Move Forward", result: "Success", note: "Normal path", timestamp: "Sept 10, 2025 – 11:20 AM" },
    { name: "System (Auto)", event: "Move Forward", result: "Avoided", note: "Object in the way", timestamp: "Sept 10, 2025 – 11:15 AM" },
    { name: "System (Auto)", event: "Movement Error", result: "Failed", note: "Object in the way", timestamp: "Sept 10, 2025 – 11:05 AM" },
  ],
  batteryTrash: [
    { name: "System (Auto)", battery: "Battery Low", result: "Triggered", trash: "15% – Returning to dock", timestamp: "Sept 10, 2025 – 12:10 PM" },
    { name: "System (Auto)", battery: "Battery Charged", result: "Completed", trash: "100% – Fully charged", timestamp: "Sept 10, 2025 – 11:40 AM" },
    { name: "System (Auto)", battery: "Battery Charged", result: "Success", trash: "100% – Fully charged", timestamp: "Sept 10, 2025 – 11:30 AM" },
  ],
};

export default function LogsTable() {
  // React state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selectedLog, setSelectedLog] = useState("voiceCommand");

  // Chakra colors
  const textColor = useColorModeValue("gray.700", "white");
  const tableBg = useColorModeValue("white", "#121313");
  const rowEvenColor = useColorModeValue("white", "#121313");
  const rowOddColor = useColorModeValue("#E2E8F0", "#121313"); // zebra stripes
  const hoverColor = useColorModeValue("#CBD5E0", "#1A1A1A");

  // Dropdown colors
  const menuBg = useColorModeValue("white", "#121313");
  const menuColor = useColorModeValue("gray.800", "white");
  const menuHover = "#00B474";

  // Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const data = logData[selectedLog];

  const columns = useMemo(() => {
    if (selectedLog === "voiceCommand") return ["name", "command", "result", "note", "timestamp"];
    if (selectedLog === "obstacleMovement") return ["name", "event", "result", "note", "timestamp"];
    if (selectedLog === "batteryTrash") return ["name", "battery", "result", "trash", "timestamp"];
    return [];
  }, [selectedLog]);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data
      .filter((item) => Object.values(item).some((val) => val.toString().toLowerCase().includes(query)))
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key], bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <Box mt="20px" p="20px" bg={tableBg} borderRadius="12px" boxShadow="md">
      {/* Buttons to switch logs */}
      <Flex gap="2" mb="4">
        {[
          { key: "voiceCommand", label: "Voice Command Logs" },
          { key: "obstacleMovement", label: "Obstacle & Movement Logs" },
          { key: "batteryTrash", label: "Battery & Trash Logs" },
        ].map((btn) => (
          <Button
            key={btn.key}
            bg={selectedLog === btn.key ? "green.500" : "gray.400"}
            color="white"
            _hover={{ bg: selectedLog === btn.key ? "green.600" : "gray.500" }}
            onClick={() => setSelectedLog(btn.key)}
          >
            {btn.label}
          </Button>
        ))}
      </Flex>

      {/* Search & entries */}
      <Flex justify="space-between" align="center" mb="4">
        <Input
          placeholder="Search..."
          size="sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxW="200px"
          bg={useColorModeValue("white", "#121313")}
          color={textColor}
        />

        {/* Entries per page dropdown */}
<Menu>
  <MenuButton
    as={Button}
    bg={menuBg}              // button background
    color={menuColor}         // button text
    borderRadius="8px"
    border="2px solid #00B474"  // green outline
    boxShadow="0 2px 6px rgba(0, 180, 116, 0.3)" // subtle shadow with green tint
    _hover={{ bg: menuBg, boxShadow: "0 2px 8px rgba(0, 180, 116, 0.5)" }} // hover slightly stronger shadow
  >
    {entriesPerPage} rows
  </MenuButton>

  <MenuList
    bg={menuBg}
    color={menuColor}
    boxShadow="lg"
  >
    {[10, 25, 50, 100].map((num) => (
      <MenuItem
        key={num}
        bg={entriesPerPage === num ? menuHover : menuBg}
        _hover={{ bg: menuHover, color: "white" }}
        onClick={() => { setEntriesPerPage(num); setCurrentPage(1); }}
      >
        {num} rows
      </MenuItem>
    ))}
  </MenuList>
</Menu>

        
      </Flex>

      {/* Table */}
      <Table variant="simple" bg={tableBg}>
        <Thead bg={tableBg}>
          <Tr>
            {columns.map((col) => (
              <Th key={col} cursor="pointer" onClick={() => handleSort(col)} color={textColor}>
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {displayedData.map((row, idx) => (
            <Tr key={idx} bg={idx % 2 === 0 ? rowEvenColor : rowOddColor} _hover={{ bg: hoverColor, transition: "0.3s" }}>
              {columns.map((col) => <Td key={col} color={textColor}>{row[col]}</Td>)}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="space-between" align="center" mt="4">
        <Text fontSize="sm" color={textColor}>
          Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries
        </Text>
        <Flex gap="2" align="center">
          <Button size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} isDisabled={currentPage === 1}>Prev</Button>
          {[...Array(totalPages).keys()].map((num) => (
            <Button key={num} size="sm" onClick={() => setCurrentPage(num + 1)} isDisabled={currentPage === num + 1}>{num + 1}</Button>
          ))}
          <Button size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages}>Next</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

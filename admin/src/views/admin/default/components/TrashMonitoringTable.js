import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

const trashData = [
  { robotName: "BinGuard", trashLevel: 95, result: "Full", note: "Bag almost full", timestamp: "Sept 10, 2025 – 11:30 AM" },
  { robotName: "BinGuard", trashLevel: 60, result: "Normal", note: "—", timestamp: "Sept 10, 2025 – 09:20 AM" },
  { robotName: "BinGuard", trashLevel: 80, result: "Warning", note: "Near capacity", timestamp: "Sept 09, 2025 – 08:15 AM" },
  { robotName: "BinGuard", trashLevel: 30, result: "Low", note: "Emptying soon", timestamp: "Sept 08, 2025 – 07:00 AM" },
  { robotName: "BinGuard", trashLevel: 50, result: "Moderate", note: "Half full", timestamp: "Sept 07, 2025 – 06:30 AM" },
];

export default function TrashMonitoringTable() {
  // React state
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const tableBg = useColorModeValue("white", "#121313");
  const rowEvenColor = useColorModeValue("white", "#121313");
  const rowOddColor = useColorModeValue("#E2E8F0", "#121313");
  const hoverColor = useColorModeValue("#CBD5E0", "#1A1A1A");

  // Dropdown colors
  const menuBg = useColorModeValue("white", "#121313");
  const menuColor = useColorModeValue("gray.800", "white");
  const menuHover = "#00B474";

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return trashData
      .filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(query)
        )
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Box mt="20px" p="20px" bg={tableBg} borderRadius="12px" boxShadow="md">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="lg" fontWeight="700" color={textColor}>
          Trash Monitoring
        </Text>

        {/* Controls: search + entries dropdown */}
        <Flex align="center" gap="4">
          {/* Search bar */}
          <Box w="200px">
            <Input
              placeholder="Search..."
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={useColorModeValue("white", "#1A1A1A")}
              color={textColor}
            />
          </Box>

          {/* Entries per page dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              bg={menuBg}
              color={menuColor}
              borderRadius="8px"
              border="2px solid #00B474"
              boxShadow="0 2px 6px rgba(0,180,116,0.3)"
              _hover={{ bg: menuBg, boxShadow: "0 2px 8px rgba(0,180,116,0.5)" }}
            >
              {entriesPerPage} rows
            </MenuButton>

            <MenuList bg={menuBg} color={menuColor} boxShadow="lg">
              {[10, 25, 50, 100].map((num) => (
                <MenuItem
                  key={num}
                  bg={entriesPerPage === num ? menuHover : menuBg}
                  _hover={{ bg: menuHover, color: "white" }}
                  onClick={() => {
                    setEntriesPerPage(num);
                    setCurrentPage(1);
                  }}
                >
                  {num} rows
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Table */}
      <Table variant="simple" bg={tableBg}>
        <Thead bg={tableBg}>
          <Tr>
            {["robotName", "trashLevel", "result", "note", "timestamp"].map((col) => (
              <Th
                key={col}
                cursor="pointer"
                onClick={() => handleSort(col)}
                color={textColor}
              >
                {col === "robotName"
                  ? "Robot Name"
                  : col === "trashLevel"
                  ? "Trash Level"
                  : col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                {sortConfig.key === col && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {displayedData.map((row, idx) => (
            <Tr
              key={idx}
              bg={idx % 2 === 0 ? rowEvenColor : rowOddColor}
              _hover={{ bg: hoverColor, transition: "0.3s" }}
            >
              <Td color={textColor}>{row.robotName}</Td>
              <Td color={textColor}>{row.trashLevel}%</Td>
              <Td color={textColor}>{row.result}</Td>
              <Td color={textColor}>{row.note}</Td>
              <Td color={textColor}>{row.timestamp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="space-between" align="center" mt="4">
        <Text fontSize="sm" color={textColor}>
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </Text>
        <Flex gap="2" align="center">
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          {[...Array(totalPages).keys()].map((num) => (
            <Button
              key={num}
              size="sm"
              onClick={() => setCurrentPage(num + 1)}
              isDisabled={currentPage === num + 1}
            >
              {num + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

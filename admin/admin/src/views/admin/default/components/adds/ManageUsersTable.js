// React
import React, { useState, useMemo, useEffect } from "react";

// Firebase
import { db } from "../../../../firebase/firebase"; // Adjust the path if needed
import { collection, getDocs } from "firebase/firestore";

// Chakra UI
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
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// Chakra Icons
import { ViewIcon, EditIcon } from "@chakra-ui/icons";

// Date formatting
import { formatDistanceToNow, format } from "date-fns";

export default function ManageUsersTable() {
  const [usersData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter toggle: All / Users / Admins
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const tableBg = useColorModeValue("white", "#0C0D0C");
  const rowEvenColor = useColorModeValue("white", "#0C0D0C");
  const rowOddColor = useColorModeValue("#F7FAFC", "#0C0D0C");
  const hoverColor = useColorModeValue("#EDF2F7", "#1A1A1A");
  const inputBg = useColorModeValue("gray.100", "#1A1A1A");
  const inputColor = useColorModeValue("gray.800", "white");

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "Users"));
        const systemUsersSnapshot = await getDocs(collection(db, "SystemUsers"));

        const users = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const systemUsers = systemUsersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine both collections
        const combinedData = [
          ...users.map((user) => ({
            firstName: user.full_name?.split(" ")[0] || "",
            lastName: user.full_name?.split(" ")[1] || "",
            birthday: user.birthDate,
            email: user.email,
            phone: user.contact_number,
            role: "User",
            status: true, // Default status
            lastOnline: new Date(), // Placeholder
          })),
          ...systemUsers.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthDate,
            email: user.email,
            phone: user.phoneNumber,
            role: user.role,
            status: true, // Default status
            lastOnline: new Date(user.createdAt),
          })),
        ];

        setUsersData(combinedData);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selectedFilter
  const filteredByRole = useMemo(() => {
    if (selectedFilter === "Users") {
      return usersData.filter((u) => u.role === "User");
    } else if (selectedFilter === "Admins") {
      return usersData.filter((u) => u.role === "Admin" || u.role === "Super Admin");
    }
    return usersData; // All
  }, [selectedFilter, usersData]);

  // Sorting
  const sortedData = useMemo(() => {
    let sortableData = [...filteredByRole];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [filteredByRole, sortConfig]);

  // Search filter
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return sortedData.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.role}`.toLowerCase().includes(query)
    );
  }, [searchQuery, sortedData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Box mt="20px" p="20px" bg={tableBg} borderRadius="12px" boxShadow="lg">
      {/* Header and Filter Buttons */}
      <Flex justify="space-between" align="center" mb="6">
        <Text fontSize="xl" fontWeight="700" color={textColor}>
          Manage Users
        </Text>

        <Flex gap="2">
          {["All", "Users", "Admins"].map((filter) => (
            <Button
              key={filter}
              bg={selectedFilter === filter ? "green.500" : "gray.400"}
              color="white"
              _hover={{ bg: selectedFilter === filter ? "green.600" : "gray.500" }}
              onClick={() => {
                setSelectedFilter(filter);
                setCurrentPage(1);
              }}
            >
              {filter}
            </Button>
          ))}
        </Flex>
      </Flex>

      {/* Search bar */}
      <Box w="250px" mb="4">
        <Input
          placeholder="Search user..."
          size="sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          bg={inputBg}
          color={inputColor}
        />
      </Box>

      {/* Table */}
      <Table variant="simple" bg={tableBg} borderRadius="12px" overflow="hidden">
        <Thead>
          <Tr>
            <Th color={textColor} onClick={() => handleSort("firstName")} cursor="pointer">
              Full Name {sortConfig.key === "firstName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Th>
            <Th color={textColor} onClick={() => handleSort("email")} cursor="pointer">
              Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Th>
            <Th color={textColor} onClick={() => handleSort("role")} cursor="pointer">
              Role {sortConfig.key === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Th>
            <Th color={textColor} onClick={() => handleSort("status")} cursor="pointer">
              Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Th>
            <Th color={textColor} onClick={() => handleSort("lastOnline")} cursor="pointer">
              Last Online {sortConfig.key === "lastOnline" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Th>
            <Th color={textColor}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedData.map((user, idx) => (
            <Tr
              key={idx}
              bg={idx % 2 === 0 ? rowEvenColor : rowOddColor}
              _hover={{ bg: hoverColor, transition: "0.3s" }}
            >
              <Td color={textColor}>{user.firstName} {user.lastName}</Td>
              <Td color={textColor}>{user.email}</Td>
              <Td color={textColor}>{user.role}</Td>
              <Td color={textColor}>
                <Text fontWeight="bold" color={user.status ? "green.400" : "red.400"}>
                  {user.status ? "Active" : "Inactive"}
                </Text>
              </Td>
              <Td color={textColor}>
                {formatDistanceToNow(new Date(user.lastOnline), { addSuffix: true })}
              </Td>
              <Td>
                <Flex gap="2">
                  <IconButton
                    size="sm"
                    icon={<ViewIcon />}
                    onClick={() => {
                      setSelectedUser(user);
                      setIsViewOpen(true);
                    }}
                  />
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditOpen(true);
                    }}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="space-between" align="center" mt="4">
        <Text fontSize="sm" color={textColor}>
          Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries
        </Text>
        <Flex gap="2">
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button size="sm" isDisabled>
            {currentPage}
          </Button>
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

      {/* View Modal */}
      {selectedUser && (
        <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box>
                  <Text fontWeight="bold">Full Name</Text>
                  <Text>{selectedUser.firstName} {selectedUser.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Birthday</Text>
                  <Text>{format(new Date(selectedUser.birthday), "MM-dd-yyyy")}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Email</Text>
                  <Text>{selectedUser.email}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Phone</Text>
                  <Text>{selectedUser.phone}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Role</Text>
                  <Text>{selectedUser.role}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status</Text>
                  <Text color={selectedUser.status ? "green.400" : "red.400"}>
                    {selectedUser.status ? "Active" : "Inactive"}
                  </Text>
                </Box>
                <Box gridColumn={{ base: "span 1", md: "span 2" }}>
                  <Text fontWeight="bold">Last Online</Text>
                  <Text>
                    {formatDistanceToNow(new Date(selectedUser.lastOnline), { addSuffix: true })}
                  </Text>
                </Box>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsViewOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Edit Modal */}
      {selectedUser && (
        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="2"><b>Full Name:</b> {selectedUser.firstName} {selectedUser.lastName}</Text>
              <Text mb="2"><b>Email:</b> {selectedUser.email}</Text>

              {/* Role Dropdown */}
              <Box mt="4">
                <Text mb="1">Role</Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    flex="1"
                    bg={inputBg}
                    color={inputColor}
                    borderRadius="8px"
                    border={`1px solid #00B474`}
                    textAlign="left"
                    pl="3"
                    pr="3"
                    rightIcon={null}
                    fontWeight="normal"
                  >
                    {selectedUser.role || "Select Role"}
                  </MenuButton>
                  <MenuList maxH="200px" overflowY="auto">
                    {["User", "Admin", "Super Admin"].map((role, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={() => setSelectedUser({ ...selectedUser, role })}
                      >
                        {role}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>

              {/* Status Switch */}
              <Box mt="4">
                <Text mb="1">Status</Text>
                <Switch
                  size="md"
                  colorScheme="green"
                  isChecked={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.checked })}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => setIsEditOpen(false)}
              >
                Save
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

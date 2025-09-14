// React
import React, { useState, useMemo } from "react";

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
  Select,
  Switch,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Chakra Icons
import { ViewIcon, EditIcon } from "@chakra-ui/icons";

// Date formatting
import { formatDistanceToNow } from "date-fns";

// Sample Data
const usersData = [
  {
    firstName: "Juan",
    lastName: "Dela Cruz",
    birthday: "1995-03-21",
    email: "juan.delacruz@example.com",
    phone: "09171234567",
    role: "User",
    status: true,
    lastOnline: new Date(), // now
  },
  {
    firstName: "Maria",
    lastName: "Santos",
    birthday: "1992-07-15",
    email: "maria.santos@example.com",
    phone: "09182345678",
    role: "Admin",
    status: true,
    lastOnline: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    firstName: "Jose",
    lastName: "Reyes",
    birthday: "1990-01-10",
    email: "jose.reyes@example.com",
    phone: "09193456789",
    role: "Super Admin",
    status: false,
    lastOnline: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];

export default function ManageUsersTable() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const tableBg = useColorModeValue("white", "#0C0D0C");
  const rowEvenColor = useColorModeValue("white", "#0C0D0C");
  const rowOddColor = useColorModeValue("#F7FAFC", "#0C0D0C");
  const hoverColor = useColorModeValue("#EDF2F7", "#1A1A1A");

  // Filter data
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return usersData.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  // Pagination calc
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Box mt="20px" p="20px" bg={tableBg} borderRadius="12px" boxShadow="lg">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="6">
        <Text fontSize="xl" fontWeight="700" color={textColor}>
          Manage Users
        </Text>

        {/* Search bar */}
        <Box w="250px">
          <Input
            placeholder="Search user..."
            size="sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            bg={useColorModeValue("white", "#1A1A1A")}
            color={textColor}
          />
        </Box>
      </Flex>

      {/* Table */}
      <Table variant="simple" bg={tableBg} borderRadius="12px" overflow="hidden">
        <Thead>
          <Tr>
            <Th color={textColor}>Full Name</Th>
            <Th color={textColor}>Email</Th>
            <Th color={textColor}>Role</Th>
            <Th color={textColor}>Status</Th>
            <Th color={textColor}>Last Online</Th>
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
              <Td color={textColor}>
                {user.firstName} {user.lastName}
              </Td>
              <Td color={textColor}>{user.email}</Td>
              <Td color={textColor}>{user.role}</Td>
              <Td color={textColor}>
                <Text
                  fontWeight="bold"
                  color={user.status ? "green.400" : "red.400"}
                >
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
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
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
                  <Text fontWeight="bold">Full Name:</Text>
                  <Text>{selectedUser.firstName} {selectedUser.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Birthday:</Text>
                  <Text>{selectedUser.birthday}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Email:</Text>
                  <Text>{selectedUser.email}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Phone:</Text>
                  <Text>{selectedUser.phone}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Role:</Text>
                  <Text>{selectedUser.role}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status:</Text>
                  <Text color={selectedUser.status ? "green.400" : "red.400"}>
                    {selectedUser.status ? "Active" : "Inactive"}
                  </Text>
                </Box>
                <Box gridColumn={{ base: "span 1", md: "span 2" }}>
                  <Text fontWeight="bold">Last Online:</Text>
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

              <Box mt="4">
                <Text mb="1">Role</Text>
                <Select
                  defaultValue={selectedUser.role}
                  onChange={(e) => (selectedUser.role = e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </Select>
              </Box>

              <Box mt="4">
                <Text mb="1">Status</Text>
                <Switch
                  isChecked={selectedUser.status}
                  onChange={(e) => (selectedUser.status = e.target.checked)}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={() => setIsEditOpen(false)}>
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
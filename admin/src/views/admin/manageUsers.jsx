import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

// Ayusin yung pangalan ng import (Overview, hindi OviewView)
import ManageUserOverview from "views/admin/default/components/ManageUsersOverview";
import ManageUsersTable from "views/admin/default/components/ManageUsersTable";

export default function Logs() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Top Row: Status Cards */}
      {/* Top Row: Status Cards */}
      <Box mb="20px">
        <ManageUserOverview />
      </Box>

      {/* Bottom Row: Users Table */}
      <Box mt="20px">
        <ManageUsersTable />
      </Box>
    </Box>
  );
}

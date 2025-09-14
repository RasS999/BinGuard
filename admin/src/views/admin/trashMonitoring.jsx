import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import RobotStatus from "views/admin/default/components/RobotStatus";
import BatteryStatus from "views/admin/default/components/BatteryStatus";
import TrashCapacity from "views/admin/default/components/TrashCapacity";
import TrashMonitoringTable from "views/admin/default/components/TrashMonitoringTable";

export default function trashmonitoring() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Top Row: Status Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px">
        <RobotStatus />
        <BatteryStatus/>
        <TrashCapacity/>

      </SimpleGrid>

      {/* Bottom Row: Trash Monitoring Table */}
      <Box mt="20px">
        <TrashMonitoringTable />
      </Box>
    </Box>
  );
}

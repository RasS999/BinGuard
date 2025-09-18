import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import RobotStatus from "views/admin/default/components/RobotStatus";
import BatteryStatus from "views/admin/default/components/BatteryStatus";
import UsersStatus from "views/admin/default/components/UsersStatus";
import QuickCommand from "views/admin/default/components/QuickCommand";
import TaskCompletion from "views/admin/default/components/TaskOverview"; 
import RecentLogs from "views/admin/default/components/RecentLogs";

export default function Users() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px">
        {/* Row 1 */}
        <RobotStatus />
        <BatteryStatus/>
        <UsersStatus gridRow={{ base: "span 1", lg: "span 2" }} />

        {/* Row 2 */}
        <QuickCommand gridColumn={{ base: "span 1", md: "span 2" }} />
      </SimpleGrid>

      {/* Row 3 - Task Overview + Recent Logs */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="20px" mt="20px">
        <TaskCompletion />
        <RecentLogs />
      </SimpleGrid>
    </Box>
  );
}

import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import RobotStatus from "views/admin/default/components/RobotStatus";
import BatteryStatus from "views/admin/default/components/BatteryStatus";
import RobotID from "views/admin/default/components/RobotID";
import CurrentArea from "views/admin/default/components/CurrentArea";
import QuickCommand from "views/admin/default/components/QuickCommand";

export default function robot() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px">
        {/* Top Row */}
        <RobotStatus />
        <BatteryStatus/>
        {/* Middle Row: RobotID + CurrentArea */}
        <RobotID />
        <CurrentArea />

        {/* Bottom Row */}
        <QuickCommand gridColumn={{ base: "span 1", md: "span 2" }} />
      </SimpleGrid>
    </Box>
  );
}

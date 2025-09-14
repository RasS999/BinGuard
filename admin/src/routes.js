import React from "react";
import { Icon, Divider } from "@chakra-ui/react";
import { MdHome, MdDelete, MdList, MdSmartToy, MdLock, MdPerson, MdGroup } from "react-icons/md";

// Pages
import MainDashboard from "views/admin/default";
import Robot from "views/admin/robot";
import TrashMonitoring from "views/admin/trashMonitoring";
import Logs from "views/admin/logs";
import ManageUsers from "views/admin/manageUsers";
import Profile from "views/admin/profile";

// Auth
import SignInCentered from "views/auth/signIn";
import RegisterAdmin from "views/auth/register"; 
import ForgotPassword from "views/auth/forgotPassword";

// Routes
const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} w="20px" h="20px" color="green.500" />,
    component: <MainDashboard />,
  },
  {
    name: "Robot",
    layout: "/admin",
    path: "/robot",
    icon: <Icon as={MdSmartToy} w="20px" h="20px" color="green.500" />,
    component: <Robot />,
  },
  {
    name: "Trash Monitoring",
    layout: "/admin",
    path: "/trash-monitoring",
    icon: <Icon as={MdDelete} w="20px" h="20px" color="green.500" />,
    component: <TrashMonitoring />,
  },
  {
    isDivider: true,
  },
  {
    name: "Logs",
    layout: "/admin",
    path: "/logs",
    icon: <Icon as={MdList} w="20px" h="20px" color="green.500" />,
    component: <Logs />,
  },
  {
    name: "Manage Users", 
    layout: "/admin",
    path: "/manage-users",
    icon: <Icon as={MdGroup} w="20px" h="20px" color="green.500" />,
    component: <ManageUsers />,  // Only Super Admins can access -- role: superadmin, admin and user
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} w="20px" h="20px" color="green.500" />,
    component: <Profile />,
    hide: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} w="20px" h="20px" color="inherit" />,
    component: <SignInCentered />,
    hide: true,
  },
  {
    name: "Register",
    layout: "/auth",
    path: "/register",
    icon: <Icon as={MdLock} w="20px" h="20px" color="inherit" />,
    component: <RegisterAdmin />,
    hide: true,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "/forgot-password",
    icon: <Icon as={MdLock} w="20px" h="20px" color="inherit" />,
    component: <ForgotPassword />,
    hide: true,
  },
];

export default routes;

// Divider component
export const SidebarDivider = () => <Divider my="4" borderColor="gray.300" />;

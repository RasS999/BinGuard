// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// Assets
import navImage from "assets/img/layout/logo.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Import routes
import routes from "routes";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const profileRoute = routes.find(
    (route) => route.name && route.name.toLowerCase() === "profile"
  );
  const signInRoute = routes.find(
    (route) => route.name && route.name.toLowerCase() === "sign in"
  );

  const navbarIcon = useColorModeValue("gray.400", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue(
    "#E6ECFA",
    "rgba(135, 140, 189, 0.3)"
  );
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const menuBg = useColorModeValue("white", "#010001"); // default background for menu
  const menuHover = useColorModeValue("#E2E8F0", "#0C0D0C"); // hover for menu items

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px 25px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      {/* Ethereum Display */}
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: "none", md: "unset" }}>
            {" "}
            ETH
          </Text>
        </Text>
      </Flex>

      <SidebarResponsive />

      {/* Notifications Menu */}
      <Menu autoSelect={false}>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <MenuItem
              px="0"
              borderRadius="8px"
              mb="10px"
              bg={`${menuBg} !important`}
              _hover={{ bg: `${menuHover} !important` }}
              _focus={{ bg: `${menuHover} !important`, boxShadow: "none !important" }}
              _active={{ bg: `${menuHover} !important` }}
            >
              <ItemContent info="BinGuard" />
            </MenuItem>
            <MenuItem
              px="0"
              borderRadius="8px"
              mb="10px"
              bg={`${menuBg} !important`}
              _hover={{ bg: `${menuHover} !important` }}
              _focus={{ bg: `${menuHover} !important`, boxShadow: "none !important" }}
              _active={{ bg: `${menuHover} !important` }}
            >
              <ItemContent info="BinGuard is now live" />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      {/* Info Menu */}
      <Menu autoSelect={false}>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdInfoOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: "30px", md: "unset" }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Image src={navImage} borderRadius="16px" mb="28px" />
        </MenuList>
      </Menu>

      {/* Dark/Light Mode Toggle */}
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>

      {/* Profile Menu */}
      <Menu autoSelect={false}>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name="Admin"
            bg="#0ec253ff"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, Admin
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              px="14px"
              borderRadius="8px"
              bg={`${menuBg} !important`}
              _hover={{ bg: `${menuHover} !important` }}
              _focus={{ bg: `${menuHover} !important`, boxShadow: "none !important" }}
              _active={{ bg: `${menuHover} !important` }}
              onClick={() => {
                if (profileRoute)
                  navigate(profileRoute.layout + profileRoute.path);
              }}
            >
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem
              px="14px"
              borderRadius="8px"
              color="red.400"
              bg={`${menuBg} !important`}
              _hover={{ bg: `${menuHover} !important` }}
              _focus={{ bg: `${menuHover} !important`, boxShadow: "none !important" }}
              _active={{ bg: `${menuHover} !important` }}
              onClick={() => {
                if (signInRoute)
                  navigate(signInRoute.layout + signInRoute.path);
              }}
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};

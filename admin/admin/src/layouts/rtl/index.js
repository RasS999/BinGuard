// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
// import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarRTL.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { RtlProvider } from 'components/rtlProvider/RtlProvider.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes.js';

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/rtl/full-screen-maps';
  };
const getActiveRoute = (routesArray) => {
  let activeRoute = "Default Brand Text";

  for (let i = 0; i < routesArray.length; i++) {
    const route = routesArray[i];

    // Handle collapse routes safely
    if (route.collapse && Array.isArray(route.items)) {
      const collapseActiveRoute = getActiveRoute(route.items);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } 
    // Handle category routes safely
    else if (route.category && Array.isArray(route.items)) {
      const categoryActiveRoute = getActiveRoute(route.items);
      if (categoryActiveRoute !== activeRoute) {
        return categoryActiveRoute;
      }
    } 
    else {
      if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        return route.name;
      }
    }
  }

  return activeRoute;
};

// Similarly for Navbar secondary and message
const getActiveNavbar = (routesArray) => {
  let activeNavbar = false;

  for (let i = 0; i < routesArray.length; i++) {
    const route = routesArray[i];

    if (route.collapse && Array.isArray(route.items)) {
      const collapseActiveNavbar = getActiveNavbar(route.items);
      if (collapseActiveNavbar !== activeNavbar) return collapseActiveNavbar;
    } 
    else if (route.category && Array.isArray(route.items)) {
      const categoryActiveNavbar = getActiveNavbar(route.items);
      if (categoryActiveNavbar !== activeNavbar) return categoryActiveNavbar;
    } 
    else {
      if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        return route.secondary || false;
      }
    }
  }

  return activeNavbar;
};

const getActiveNavbarText = (routesArray) => {
  let activeText = false;

  for (let i = 0; i < routesArray.length; i++) {
    const route = routesArray[i];

    if (route.collapse && Array.isArray(route.items)) {
      const collapseActiveText = getActiveNavbarText(route.items);
      if (collapseActiveText !== activeText) return collapseActiveText;
    } 
    else if (route.category && Array.isArray(route.items)) {
      const categoryActiveText = getActiveNavbarText(route.items);
      if (categoryActiveText !== activeText) return categoryActiveText;
    } 
    else {
      if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        return route.messageNavbar || false;
      }
    }
  }

  return activeText;
};

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/rtl') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = 'rtl';
  const { onOpen } = useDisclosure();
  return (
    <RtlProvider>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="left"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'BinGuard'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: '20px', md: '30px' }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/rtl/default" replace />}
                />
              </Routes>
            </Box>
          ) : null}
          <Box>
            {/* <Footer /> */}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </RtlProvider>
  );
}

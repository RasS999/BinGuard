import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';

import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

// Import your auth pages directly
import LoginCentered from "views/auth/login";
import RegisterAdmin from "views/auth/register"; 
import ForgotPassword from "views/auth/forgotPassword";

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* Auth pages at root */}
        <Route path="/login" element={<LoginCentered />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Other layouts */}
        <Route path="admin/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
        <Route path="rtl/*" element={<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}

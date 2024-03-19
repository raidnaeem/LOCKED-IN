import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordReset from './pages/PasswordReset';
import PlannerPage from './pages/PlannerPage';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/passwordReset" index element={<PasswordReset />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/planner" index element={<PlannerPage />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;




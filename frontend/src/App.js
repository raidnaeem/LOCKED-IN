import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetRequest from './pages/ResetRequest';
import PlannerPage from './pages/PlannerPage';
import EmailVerificationPage from './pages/EmailVerificationPage'; 

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/passwordReset" index element={<ResetRequest />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/planner" index element={<PlannerPage />} />
        <Route path="/api/verify-email/:verificationToken"/>
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;




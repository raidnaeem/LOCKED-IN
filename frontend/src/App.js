import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetRequest from './pages/ResetRequest';
import PlannerPage from './pages/PlannerPage';
import EmailVerificationPage from './pages/EmailVerificationPage'; 
import ResetPasswordPage from './pages/ResetPassword';
import CalendarPage from './pages/CalendarPage';
import TimerPage from './pages/TimerPage'

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/passwordReset" index element={<ResetRequest />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/planner" index element={<PlannerPage />} />
        <Route path="/calendar" index element={<CalendarPage />} />
        <Route path="/timer" index element={<TimerPage />} />
        <Route path="/verify-email/:verificationToken" index element={<EmailVerificationPage />} />
        <Route path="/reset-password/:passwordResetToken" index element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;




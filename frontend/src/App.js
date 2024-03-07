import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import PlannerPage from './pages/PlannerPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/planner" index element={<PlannerPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;




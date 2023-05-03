import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RecipeLayout from './components/Layout/RecipeLayout';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipes" element={<RecipeLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './components/Layout/HomeLayout';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

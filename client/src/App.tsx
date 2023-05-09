import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import LoadingLottie from './components/LoadingLottie';
// import RecipeLayout from './components/Layout/RecipeLayout';
// import LandingPage from './pages/LandingPage';

const LazyLottie = React.lazy(() => import('./components/LoadingLottie'));
const LazyLandingPage = React.lazy(() => import('./pages/LandingPage'));
const LazyRecipeLayout = React.lazy(() => import('./components/Layout/RecipeLayout'))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LazyLottie />}>
            <LazyLandingPage />
          </Suspense>} />
        <Route path="/recipes" element={
          <Suspense fallback={<LazyLottie />}>
            <LazyRecipeLayout />
          </Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

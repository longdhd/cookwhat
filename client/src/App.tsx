import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import mainLoader from './assets/lottie/mainLoader.json'

const LoadingLottie = lazy(() => import('./components/LoadingLottie'));
const LazyLandingPage = lazy(() => import('./pages/LandingPage'));
const LazyRecipeLayout = lazy(() => import('./components/Layout/RecipeLayout'));
const LazyRecipeDetaiPage = lazy(() => import('./pages/RecipeDetailPage'));

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={< LoadingLottie data={mainLoader} />}>
            <LazyLandingPage />
          </Suspense>} />
        <Route path="/recipes" element={
          <Suspense fallback={< LoadingLottie data={mainLoader} />}>
            <LazyRecipeLayout />
          </Suspense>} />
        <Route path="/recipes/:recipeId" element={
          <Suspense fallback={< LoadingLottie data={mainLoader} />}>
            <LazyRecipeDetaiPage />
          </Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

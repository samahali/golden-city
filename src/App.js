import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Home from './components/pages/Home';
import Loader from './components/common/Loader';

const About = lazy(() => import('./components/pages/About'));
const FAQ = lazy(() => import('./components/pages/FAQ'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const MarketPlace = lazy(() => import('./components/pages/MarketPlace'));
const SingleProperty = lazy(() => import('./components/pages/SingleProperty'));

function App() {
  return (
    <div className="body-wrap">
      <Router>
        <Suspense fallback={
          <div className="loader-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader type="details"/>
          </div>
        }>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='About' element={<About />} />
              <Route path='FAQ' element={<FAQ />} />
              <Route path='MarketPlace' element={<MarketPlace />} />
              <Route path='property/:id' element={<SingleProperty />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
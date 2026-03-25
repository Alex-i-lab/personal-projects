import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import ScrollToAnchor from './components/ScrollToAnchor';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <ScrollToAnchor />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
          <Analytics />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;

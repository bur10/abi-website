import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServiceAreasListPage from './pages/ServiceAreasListPage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

const App = () => {
    return (
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="hizmet-bolgeleri" element={<ServiceAreasListPage />} />
                        <Route path="hizmet-bolgeleri/:slug" element={<ServiceAreaPage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="blog/:slug" element={<BlogPostPage />} />
                    </Route>
                </Routes>
            </Router>
        </HelmetProvider>
    );
};

export default App;
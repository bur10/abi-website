import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServiceAreasListPage from './pages/ServiceAreasListPage';
import ServiceAreaPage from './pages/ServiceAreaPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="hizmet-bolgeleri" element={<ServiceAreasListPage />} />
                    <Route path="hizmet-bolgeleri/:slug" element={<ServiceAreaPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
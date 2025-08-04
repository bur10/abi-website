import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';
import StickyButton from './StickyButton';
import Subheader from './Subheader';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white">
            <StickyButton />
            <Subheader />
            <Navbar />
            <main className="pt-32">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout; 
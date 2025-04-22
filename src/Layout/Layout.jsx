import React from 'react';
import NavBar from '../Components/NavBar';

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-gray-100">{children}</main>
        </>
    );
};

export default Layout;

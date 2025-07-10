import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/SharedComponent/Navbar';
import Footer from '../Component/SharedComponent/Footer';
const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
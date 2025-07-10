import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/SharedComponent/Navbar';
import Footer from '../Component/SharedComponent/Footer';
const HomeLayout = () => {
    return (
        <div className='max-w-full md:max-w-7xl lg:max-w-[1550px] mx-auto oxygen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
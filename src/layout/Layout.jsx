import React from 'react'
import MenuBar from '../components/navigations/MenuBar'
import Footer from '../components/navigations/Footer'
import { Outlet } from 'react-router-dom';

import './Layout.css'

const Layout = () => {
    return(
        <>
            <MenuBar />
            <main className="main-content">
                <Outlet /> {/* nested route content renders here */}
            </main>
            <Footer/>
        </>
    );
}

export default Layout;
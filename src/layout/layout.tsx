import './style.css'
import { Outlet } from "react-router-dom"
import Navbar from '../component/navbar'
import Sidebar from '../component/sidebar'
import React, { useEffect, useState } from 'react'


const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className='container' style={{ marginLeft: isSidebarOpen ? '256px' : '100px' }}>
                <Navbar />
                <Outlet />

            </div>
        </>
    )
}

export default Layout;
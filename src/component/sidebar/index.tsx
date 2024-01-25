import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '../../data/sidebar';
import './style.css';

interface IsSidebarOpenProps{
    isSidebarOpen: boolean,
    setIsSidebarOpen: (a : boolean )=> void
}

const Sidebar: React.FC<IsSidebarOpenProps> = ({isSidebarOpen, setIsSidebarOpen}) => {
    
    const location = useLocation();
    // console.log(location)


    return (
        <div className='sidebar' style={{  width : isSidebarOpen ? '256px' : '100px' }}>

            <div className='sidebar-top'>

                <div className='sidebar-header'>

                    <div className='logo' >
                        <img src='./onito-technology.png' width={200}/>
                        <div style={{  display : isSidebarOpen ? 'block' : 'none' }}>
                            <div style={{
                                fontSize: '14px',
                                fontStyle: 'normal',
                                color: "rgb(239, 211, 50)",
                                fontWeight: '600'
                            }}>Onito</div>
                            <div style={{
                                color: "white",
                                lineHeight: '20px',
                                fontSize: '24px',
                                fontStyle: 'normal',
                                fontWeight: '500'
                            }}>Technology</div>
                        </div>
                    </div>
                    <div className='open-close-btn' onClick={()=> setIsSidebarOpen( !isSidebarOpen) }>
                        <img width='20px' className={ !isSidebarOpen ? 'rotate' : ""} src='./icons/arrow.svg' />
                    </div>
                </div>

                <div className='sidebar-list'>
                    {
                        sidebar.map((e)=> {
                            return(

                                <Link key={e.path} style={{textDecoration: 'none'}} to={e.path}>
                                <div className={`sidebar-item ' ${ location.pathname == e.path && "active"}`} >
                                <img src={e.img} />
                                <div className='sidebar-item-name' style={{display : isSidebarOpen ? 'block' : 'none'}}>
                                    {e.label}
                                </div>
                            </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

             <div className='sidebar-bottom'>
            <div className='signout'> 
                <div className='signout-btn'>
                    <img src='/icons/logout.svg'/>
                    <div style={{ display : isSidebarOpen ? 'block' : 'none' }}>Sign Out</div> 
                </div>
            </div>
                </div>       

        </div >
    )
}

export default Sidebar;
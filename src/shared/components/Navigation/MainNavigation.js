import React, {useState}  from 'react'
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

import './MainNavigation.css';
import Backdrop from '../UIElements/Backdrop/Backdrop';

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }

    return <>
        { drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}   
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <NavLinks>
                <nav className='main-navigation__drawer-nav'>

                </nav>
            </NavLinks>
        </SideDrawer>
        <MainHeader>
            <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1 className='main-navigation__title'>
                <Link to="/">Frontend</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks></NavLinks>
            </nav>
        </MainHeader>
    </>
}

export default MainNavigation;
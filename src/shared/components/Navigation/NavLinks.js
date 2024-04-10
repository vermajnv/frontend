import React, {useContext} from 'react'

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
    const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
        <li>
            <NavLink to='/' exact="true">All Users</NavLink>
        </li>
        {auth.isLogin && (
            <li>
                <NavLink to='/u1/places'>My Places</NavLink>
            </li>
        )}
        {auth.isLogin && (
            <li>
                <NavLink to='/places/new'>Add Place</NavLink>
            </li>
        )}
        {!auth.isLogin && (
            <li>
                <NavLink to='/auth'>Authenticate</NavLink>
            </li>
        )}
    </ul>
  )
}

export default NavLinks
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
        {auth.token && (
            <li>
                <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
            </li>
        )}
        {auth.token && (
            <li>
                <NavLink to='/places/new'>Add Place</NavLink>
            </li>
        )}
        {!auth.token && (
            <li>
                <NavLink to='/auth'>Authenticate</NavLink>
            </li>
        )}
        {auth.token && (
            <li>
                <button onClick={auth.logout}>Logout</button>
            </li>
        )}
    </ul>
  )
}

export default NavLinks
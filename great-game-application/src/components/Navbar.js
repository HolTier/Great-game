import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    const adminPanel = () => {
        //checks if the user has access
        if(JSON.parse(sessionStorage.getItem('authenticated')).roleId === 1)
        {
            return (
                <li>
                    <Link to="/adminpanel">Administration Panel</Link>
                </li>
            )
        }
    }
    return (
        <div>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/account">Account</Link>
            </li>
            <li>
                <Link to="/archive">Archive</Link>
            </li>
            {adminPanel()}
            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </div>
    );
};

export default Navbar;

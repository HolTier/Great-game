import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    const adminPanel = () => {
        if(sessionStorage.getItem('authenticated'))
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
        </div>
    );
};

export default Navbar;

import React from 'react';
import {Navigate} from "react-router-dom";

const Logout = () => {
    const tryLogout = () => {
        sessionStorage.clear();
        return (
            <Navigate replace to="/login" />
        )
    }

    return (
        <div>
            {tryLogout()}
        </div>
    );
};

export default Logout;

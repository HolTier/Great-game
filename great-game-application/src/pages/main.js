import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Archive from "./archive";
import Account from "./account";
import Home from "./home";
import AdminPanel from "./adminpanel";
import Logout from "./logout";

function Main() {

    //checks if the user is logged in
    if (!sessionStorage.getItem('authenticated') || sessionStorage.getItem('user')==null) {
        return <Navigate replace to="/login" />;
    }

    else{
        return (
            <div>
                <Navbar />
                {/* redirects to other pages */}
                <Routes>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/archive" element={<Archive />}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/adminpanel" element={<AdminPanel />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        );
    }
}

export default Main;
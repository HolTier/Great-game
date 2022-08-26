import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Archive from "./archive";
import Account from "./account";
import Home from "./home";
import AdminPanel from "./adminpanel";

function Main(props) {
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("authenticated");

        if (loggedInUser) {
            //console.log(sessionStorage.getItem('authenticated'));
            setAuthenticated(loggedInUser);
        }
    }, []);

    if (!sessionStorage.getItem('authenticated') || sessionStorage.getItem('user')==null) {
        return <Navigate replace to="/login" />;
    }
    else{
        return (
            <div>
                <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/archive" element={<Archive />}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/adminpanel" element={<AdminPanel />} />
                </Routes>
            </div>
        );
    }
}

export default Main;
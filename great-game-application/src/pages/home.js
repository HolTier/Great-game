import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Home(props) {
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("authenticated");

        if (loggedInUser) {
            //console.log(sessionStorage.getItem('authenticated'));
            setAuthenticated(loggedInUser);
        }
    }, []);

    if (!sessionStorage.getItem('authenticated')) {
        console.log("Home " + authenticated);
        return <Navigate replace to="/login" />;
    }
    else{
        //console.log('jestem');
        return (
            <div>
                <Navbar />
                <Routes>
                    <Route />
                </Routes>
            </div>
        );
    }
}

export default Home;
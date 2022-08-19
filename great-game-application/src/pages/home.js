import React, {useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";

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
        return <Navigate replace to="/" />;
    }
    else{
        console.log('jestem');
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;
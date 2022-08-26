import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseStatus, setResponseStatus] = useState(0);
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    const tryRegister = async (usernameLogin, passwordLogin) => {
        await fetch('/api/User/Register', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameLogin,
                password: passwordLogin,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Headers': 'privatekey'
            }
        })
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                sessionStorage.setItem('authenticated', true);
                sessionStorage.setItem('user', data);
                console.log('ok');
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        tryRegister(username, password);
        console.log("user: " + username + " password: " + password);

        //navigate("/home");
        //console.log(sessionStorage.getItem('authenticated'));
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label><br />
                    <input type="text" name="username" placeholder="Username"
                           onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" placeholder="Password"
                           onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div>
                    <input type="submit" value="Register"/>
                </div>
            </form>
            <p>
                Do you have an account already?<Link to="/"> Sign in. </Link>
            </p>
        </div>
    );
};

export default Register;

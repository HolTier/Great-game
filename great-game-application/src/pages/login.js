import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginDto from "../models/loginDto";


function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState([]);

    const tryLogin = async (usernameLogin, passwordLogin) => {
        await fetch('/api/User/Login', {
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
                sessionStorage.setItem('user', JSON.stringify(data));
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        tryLogin(username, password);
    };

    return (
        <div>
            <h1>Login</h1>
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
                    <input type="submit" value="Login"/>
                </div>
            </form>
            <p>
                Don't have an account yet? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
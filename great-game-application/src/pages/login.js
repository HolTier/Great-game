import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

    const tryLogin = async (usernameLogin, passwordLogin) => {
        await fetch()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem('authenticated', true);
        navigate("/home");
        console.log(sessionStorage.getItem('authenticated'));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label><br />
                    <input type="text" name="username" placeholder="Username" value={username}
                           onChange={e=>props.updateData('username', e.target.value)}/>
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" placeholder="Password" value={password}
                        onChange={e=>props.updateData('password', e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    );
}

export default Login;
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    //constants
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //http
    //trying to register account
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
                //if successful, set the variables
                sessionStorage.setItem('authenticated', true);
                sessionStorage.setItem('user', JSON.stringify(data));

                //change page to home
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    //handler
    const handleSubmit = (e) => {
        e.preventDefault();
        tryRegister(username, password);
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
                Do you have an account already?<Link to="/"> Sign in. </Link>{/* Navigate to register */}
            </p>
        </div>
    );
};

export default Register;

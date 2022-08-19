import './App.css';
import React from 'react';
import Login from "./pages/login";
import Home from "./pages/home";
import LoginDto from "./models/loginDto";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginDto: new LoginDto(),
            isLogin: false,
            username: '',
            password: ''
        }
    }

    updateData = (target, value) => {
        this.setState({
            [target]: value,

        });

        //console.log(this.state.isLogin);
        console.log('username: ' + this.state.username + ' | password: ' + this.state.password);
    }

    handleSubmit(){
        console.log(this.state.isLogin);
        this.setState({
            isLogin: true,
        });
        //this.forceUpdate();
    }

   render() {
        return(
            <div>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route exact path="/" element={<Login />} />
                </Routes>
           </div>
        );
   }
}

export default App;

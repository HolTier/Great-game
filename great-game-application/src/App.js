import './App.css';
import React from 'react';
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from "./pages/register";
import Main from "./pages/main";

class App extends React.Component{
    constructor(props) {
        super(props);
    }

   render() {
        return(
            <div>

                <Routes>

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Main />} />
                </Routes>
           </div>
        );
   }
}

export default App;

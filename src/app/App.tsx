import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from "../pages/main/Main";
import SignUp from "../pages/sign-up/SignUp";
import SignUpRegistrationForm from "../components/sign-up/sign-up-regform/SignUpRegistrationForm";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="" element={<Main />} />
                <Route path="signup" element={<SignUp/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

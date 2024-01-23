import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from "../pages/main/Main";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="" element={<Main />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

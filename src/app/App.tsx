import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from "../pages/main/Main";
import SignUp from "../pages/sign-up/SignUp";
import SignUpRegistrationForm from "../components/sign-up/sign-up-regform/SignUpRegistrationForm";
import Browse from "../pages/browse/Browse";
import RequireAuth from "../features/user/RequireAuth";
import SignIn from "../pages/sign-in/SignIn";
import ReplacedForAuth from "../features/user/ReplacedForAuth";
import Movies from "../pages/movies/Movies";
import TvShows from "../pages/tv-shows/TvShows";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="" element={ <ReplacedForAuth> <Main /> </ReplacedForAuth>} />
                <Route path="signup" element={ <ReplacedForAuth> <SignUp/> </ReplacedForAuth> } />
                <Route path="signin" element={ <ReplacedForAuth> <SignIn/> </ReplacedForAuth>} />

                <Route path="browse">
                    <Route index element={ <RequireAuth> <Browse/> </RequireAuth> } />
                    <Route path="movies" element={ <RequireAuth> <Movies/> </RequireAuth> } />
                    <Route path="tv-shows" element={ <RequireAuth> <TvShows/> </RequireAuth> } />
                </Route>

            </Routes>
        </Router>
    </div>
  );
}

export default App;

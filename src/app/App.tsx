import React, {StrictMode} from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from "../pages/main/Main";
import SignUp from "../pages/sign-up/SignUp";
import RequireAuth from "../features/user/RequireAuth";
import SignIn from "../pages/sign-in/SignIn";
import ReplacedForAuth from "../features/user/ReplacedForAuth";
import Movies from "../pages/movies/Movies";
import TvShows from "../pages/tv-shows/TvShows";
import MoviePlayer from "../pages/movie-player/MoviePlayer";
import SearchedContent from "../pages/searched-content/SearchedContent";
import MyList from "../pages/my-list/MyList";
import TvShowPlayer from "../pages/tv-show-player/TvShowPlayer";

function App() {
  return (
      <StrictMode>
          <div className="App">
              <Router>
                  <Routes>
                      <Route path="" element={<ReplacedForAuth> <Main/> </ReplacedForAuth>}/>
                      <Route path="signup" element={<ReplacedForAuth> <SignUp/> </ReplacedForAuth>}/>
                      <Route path="signin" element={<ReplacedForAuth> <SignIn/> </ReplacedForAuth>}/>

                      <Route path="browse">
                          <Route path="movies/watch" element={<RequireAuth> <MoviePlayer/> </RequireAuth>}/>
                          <Route path="tv-shows/watch" element={<RequireAuth> <TvShowPlayer/> </RequireAuth>}/>
                          <Route path="searched-content" element={<RequireAuth> <SearchedContent/> </RequireAuth>}/>
                          <Route path="movies" element={<RequireAuth> <Movies/> </RequireAuth>}/>
                          <Route path="tv-shows" element={<RequireAuth> <TvShows/> </RequireAuth>}/>
                          <Route path="my-list" element={<RequireAuth> <MyList/> </RequireAuth>}/>
                      </Route>

                  </Routes>
              </Router>
          </div>
      </StrictMode>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./MainApp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isLoggedIn } from "./store/thunks/user";
import Nav from "./components/nav/Nav";
import Player from "./components/player/Player";
import App from "./components/app/App";
import Home from "./components/app/Home/Home";
import Artist from "./components/app/Artist/Artist";
import Playlist from "./components/app/Playlist/Playlist";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/app/Profile/Profile";
import Search from "./components/app/Search/Search";
import LikedSongs from "./components/app/Playlist/LikedSongs";
import Reset from "./components/auth/Reset";
import Forgot from "./components/auth/Forgot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/admin/Admin";
import Loading from "./components/UI/Loading";
import AdminReward from "./components/adminReward/AdminReward";

function MainApp() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <BrowserRouter>
      <div className="main-app">
        {user.auth === true ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <App>
                    <Home />
                  </App>

                  <Player />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <Nav />
                  <App>
                    <Search />
                  </App>

                  <Player />
                </>
              }
            />
            <Route
              path="/artist/:id"
              element={
                <>
                  <Nav />
                  <App>
                    <Artist />
                  </App>

                  <Player />
                </>
              }
            />
            <Route
              path="/likedSongs"
              element={
                <>
                  <Nav />
                  <App>
                    <LikedSongs />
                  </App>

                  <Player />
                </>
              }
            />
            <Route
              path="/playlist/:id"
              element={
                <>
                  <Nav />
                  <App>
                    <Playlist />
                  </App>

                  <Player />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <Nav />
                  <App>
                    <Admin />
                  </App>

                  <Player />
                </>
              }
            ></Route>
            <Route
            path="/artist-reward"
            element={
              <>
              <Nav />
              <App>
                <AdminReward />
              </App>

              <Player />
            </>
            }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Nav />
                  <App>
                    <Profile />
                  </App>

                  <Player />
                </>
              }
            ></Route>
          </Routes>
        ) : (
          <Login />
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/resetPassword/:id" element={<Reset />} />
        </Routes>
        <ToastContainer
          theme="dark"
          closeOnClick
          style={{
            opacity: 0.8,
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default MainApp;

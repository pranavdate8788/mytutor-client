import React, { useState, lazy, Suspense  } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Backrop from "./Components/Backrop";
import Dummy from "./Components/Helper/Dummy";

import Home from "./Pages/Home/Home";
import Header from "./Header/Header";
import VerticalNav from "./Header/VerticalNav";
import LoginForm from "./Auth/LoginForm";
import Register from "./Auth/Register";
import Sidebar from "./Header/Sidebar";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "./Auth/VerifyEmail";
import Landing_page from "./Pages/Home/Landing_page";
import Loader from './Components/Helper/Loader';

import { useAuth } from "./providers/auth";



const Profile = lazy(()=>import("./Pages/Profile/Profile"))
const ShowProfile = lazy(()=>import("./Pages/Profile/ShowProfile"))
const Post = lazy(()=>import("./Pages/Posts/Post"))
const SearchResult = lazy(()=>import("./Pages/Search/SearchResult"))
const Appointement = lazy(()=>import("./Pages/Request/Appointement"))
const SidebarClose = lazy(()=>import("./Header/SidebarClose"))
const Favourite = lazy(()=>import("./Pages/Favourite/Favourite"))
const Calender = lazy(()=>import("./Components/Calender"))
const Notification = lazy(()=>import("./Pages/Notification/Notification"))




const AboutUs = lazy(() => import("./Header/AboutUs"))

const App = () => {
  const auth = useAuth();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong please contact support on ashwintelmore@gmail.com</div>}>
        <Suspense fallback={<Loader />} >
          <BrowserRouter>
            <Header setOpen={setOpen} open={open} />
            <SidebarClose setOpen={setOpen} open={open} />
            <Sidebar open={open} />
            <div className="flex w-full mt-16  dark:bg-color-16 bg-color-3 relative">
              <VerticalNav />
              <Routes>
                <Route path="/" element={<Landing_page />} />
                <Route path="/explore" element={<Home />} />
                <Route
                  path="login"
                  element={
                    auth.user._id ? (
                      <Navigate replace to="/explore" />
                    ) : (
                      <LoginForm />
                    )
                  }
                />
                <Route
                  path="register"
                  element={
                    auth.user._id ? (
                      <Navigate replace to="/profile" />
                    ) : (
                      <Register />
                    )
                  }
                />
                {/* <Route path="/register" element={<Register />} /> */}
                {/* <Route path="/login" element={<LoginForm />} /> */}

                <Route
                  path="/:email/:token"
                  element={
                    auth.user.isVerified ? (
                      <Navigate replace to="/profile" />
                    ) : (
                      <VerifyEmail />
                    )
                  }
                />
                <Route
                  path="/VerifyEmail"
                  element={
                    !auth.user._id ?
                      <Navigate replace to="/explore" />
                      :
                      auth.user.isVerified ? (
                        <Navigate replace to="/explore" />
                      ) : (
                        <VerifyEmail />
                      )
                  }
                />

                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/showProfile/:id?" element={<ShowProfile />} />
                  <Route path="/dummy" element={<Dummy />} />
                  <Route path="/appointement" element={<Appointement />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/notification" element={<Notification />} />
                </Route>
                <Route path="/search/:catName?" element={<SearchResult />} />
                <Route path="/calender" element={<Calender />} />
                <Route path="/postcontent/:id?" element={<Post />} />
                <Route path="/aboutus" element={<AboutUs />} />


                <Route path="*" element={<Dummy />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

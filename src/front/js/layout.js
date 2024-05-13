import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";

import { Single } from "./pages/Single.jsx";
import { RecentlyWatched } from "./pages/RecentlyWatched.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { About } from "./pages/about.js";

import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import Authentication from "./pages/Authentication.jsx";
import { Footer } from "./component/Footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            {/* <Route element={<Demo />} path="/demo" /> */}
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<RecentlyWatched />} path="/recently-watched" />
            <Route element={<About />} path="/about_us" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Authentication />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

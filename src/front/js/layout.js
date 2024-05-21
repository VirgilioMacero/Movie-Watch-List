import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";

import { Home } from "./pages/Home.jsx";

import { Single } from "./pages/Single.jsx";
import Profile from "./pages/Profile.jsx";
import { RecentlyWatched } from "./pages/RecentlyWatched.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { About } from "./pages/About.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import Authentication from "./pages/Authentication.jsx";
import { Footer } from "./component/Footer.jsx";
import Toast from "./component/Toast.jsx";
import Recovery from "./pages/Recovery.jsx";

const App = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/recovery";

  return (
    <div>
      {!hideNavAndFooter ? <Navbar /> : ""}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:theid" element={<Single />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recently-watched" element={<RecentlyWatched />} />
        <Route path="/about_us" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Not found!</h1>} />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
      <Authentication />
      {!hideNavAndFooter ? <Footer /> : ""}
      <Toast />
    </div>
  );
};

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <Router basename={basename}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default injectContext(Layout);

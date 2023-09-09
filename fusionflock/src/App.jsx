import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import UserProfile from "./pages/UserProfile";
import CreatePostPage from "./pages/CreatePost";

function App() {
  const [Theme, setTheme] = useState(null);
  const handleThemeSwitch = () => {
    setTheme(Theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // add/remove dark/light class from document body
  useEffect(() => {
    if (Theme === "dark") {
      document.querySelector("body").classList.remove("dark");
    } else {
      document.querySelector("body").classList.add("dark");
    }
  }, [Theme]);

  return (
    <BrowserRouter>
      <Navbar handleThemeSwitch={handleThemeSwitch} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/api/users/signup" element={<Signup />}></Route>
        <Route path="/api/users/signin" element={<Signin />}></Route>
        <Route path="/api/users/:username" element={<UserProfile />}></Route>
        <Route path="/api/posts/createpost" element={<CreatePostPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./userMenu/Avatar";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ handleThemeSwitch }) => {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef(null);
  const [check, setCheck] = useState(false);

  const user = useSelector((state) => state.user);
  const authent = !!user;

  const fullName = authent ? user.fullName : null;

  // Function to handle clicks links of the navbar
  const handleNavbarLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Function to handle clicks outside of the navbar
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMode = () => {
    setCheck(!check);
    handleThemeSwitch();
  };

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-dimWhite font-poppins h-[90px] px-4 sticky top-0 z-20 grid place-items-center">
      <div
        ref={navbarRef}
        className={`w-full flex md:flex-row flex-col items-center font-normal justify-between `}
      >
        <div className="z-50 px-4 py-2 md:w-auto w-full flex justify-between">
          <Link to="/" className="flex items-center text-black dark:text-white">
            {/* <img
              src={Logo}
              alt="logo"
              className="invert -hue-rotate-180 dark:invert-0 dark:hue-rotate-0 md:cursor-pointer h-12 my-auto"
              height={48}
              width={128}
            /> */}
            FusionFlock
          </Link>
          <div className="md:hidden py-5 px-4 flex justify-center ml-auto mr-4 items-center self-end gap-x-4">
            {/* Light/Dark mode switch */}
            <div className="relative">
              <input
                id="checkbox"
                type="checkbox"
                className="opacity-0 absolute flex justify-between items-center w-14 h-7 rounded-full p-1 z-10 cursor-pointer"
                checked={check}
                onChange={toggleMode}
              />
              <label
                htmlFor="checkbox"
                className="cursor-pointer flex justify-between items-center w-14 h-7 rounded-full relative p-1 bg-gray-100 border"
              >
                <FaMoon color="f1c40f" />
                <FaSun color="f39c12" />
                <span
                  className={`bg-slate-500 opacity-50 absolute w-6 h-7 right-8 rounded-full transition-transform ${
                    !check ? "translate-x-8" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>
            {user ? <Avatar view="center" /> : ""}
          </div>

          <div
            className="text-3xl my-auto md:hidden text-gray-900 dark:text-white"
            onClick={() => setOpen(!open)}
          >
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden items-center gap-4 font-medium h-[90px] z-50">
          <li>
            <Link to="/" className="navlink text-black dark:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navlink text-black dark:text-white">
              About
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link
                  to="/api/users/signup"
                  className="navlink text-black dark:text-white"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/api/users/signin"
                  className="navlink text-black dark:text-white"
                >
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>

        {/* normal web view  */}

        <div className="md:flex hidden justify-center items-center gap-x-6 z-50">
          {/* Light/Dark mode switch */}
          <div className="relative">
            <input
              id="mobileCheckbox"
              type="checkbox"
              className="opacity-0 absolute flex justify-between items-center w-14 h-7 rounded-full z-10 p-1 cursor-pointer"
              checked={check}
              onChange={toggleMode}
            />
            <label
              htmlFor="mobileCheckbox"
              className="cursor-pointer flex justify-between items-center w-14 h-7 rounded-full relative p-1 bg-gray-100 border"
            >
              <FaMoon color="f1c40f" />
              <FaSun color="f39c12" />
              <span
                className={`bg-slate-500 opacity-50 absolute w-6 h-6 right-8 rounded-full transition-transform ${
                  !check ? "translate-x-8" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
          {user ? <Avatar view="end" /> : ""}
        </div>

        {/* mobile navbar */}
        <ul
          className={`md:hidden text-gray-900 dark:text-dimWhite bg-gray-300 dark:bg-secondary absolute w-full top-[90px] z-50 py-5 pl-4 duration-500  ${
            open ? "left-0" : "left-[-100%]"
          }`}
          style={{ zIndex: "1" }}
        >
          <li>
            <Link
              to="/"
              className="navlink text-black dark:text-white"
              onClick={handleNavbarLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="navlink text-black dark:text-white"
              onClick={handleNavbarLinkClick}
            >
              About
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link
                  to="/api/users/signup"
                  className="navlink text-black dark:text-white"
                  onClick={handleNavbarLinkClick}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/api/users/signin"
                  className="navlink text-black dark:text-white"
                  onClick={handleNavbarLinkClick}
                >
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

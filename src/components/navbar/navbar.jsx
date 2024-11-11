// components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
const Navbar = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {

      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
     else {

      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#415A77] text-sm py-3 dark:bg-[#1b263b] transition-all duration-300">

      <nav className="max-w-[100rem] w-full mx-auto px-10 flex flex-wrap basis-full items-center justify-between">

        <a
          className="sm:order-1 flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
          href="#"
        >
          LacakUV
        </a>
        <div className="sm:order-3 flex items-center gap-x-2">
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkMode} checked={localStorage.getItem('theme') === 'dark' ? true : false} />
            <span className="slider" />
          </label>
        </div>
        <div
          id="hs-navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          aria-labelledby="hs-navbar-alignment-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${props.active === 'home' ? 'bg-[#1b263b]  rounded-md dark:bg-[#415A77]' : ' hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'}`}
              to="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${props.active === 'about' ? 'bg-[#1b263b]  rounded-md dark:bg-[#415A77]' : ' hover:bg-[#1b263b]  dark:hover:bg-[#415A77] transition-all duration-300'}`}
              to="#"
            >
              About
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${props.active === 'check' ? 'bg-[#1b263b]  rounded-md dark:bg-[#415A77]' : ' hover:bg-[#1b263b]  dark:hover:bg-[#415A77] transition-all duration-300'}`}
              to="/check"
            >
              Check UV
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

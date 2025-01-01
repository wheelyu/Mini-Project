import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white text-sm  dark:bg-[#121212]  fixed z-50 ">
      <nav className="max-w-[100rem] w-full mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
            <div className="flex items-center space-x-2">
            <p className='flex-none text-xl  font-semibold text-black focus:outline-none focus:opacity-80 dark:text-white'>Lacak</p>
            <p className='text-yellow-500 text-3xl font-bold italic'>UV</p>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 py-5">
            <Link
              className={`font-medium px-4 py-2  rounded-md ${
                props.active === 'home' 
                  ? 'bg-[#344E41] dark:bg-[#263a30] text-white' 
                  : 'hover:bg-[#344E41] dark:hover:bg-[#263a30] text-black hover:text-white dark:text-white'
              }`}
              to="/"
            >
              Home
            </Link>
            
            <Link
              className={`font-medium px-4 py-2  rounded-md ${
                props.active === 'check' 
                ? 'bg-[#344E41] dark:bg-[#263a30] text-white' 
                  : 'hover:bg-[#344E41] dark:hover:bg-[#263a30] text-black hover:text-white dark:text-white'
              }`}
              to="/check"
            >
              UV Index
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg   hover:bg-gray-300 dark:hover:bg-gray-600 "
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FontAwesomeIcon icon={faSun} className="w-5 h-5 text-yellow-500" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black rounded-md "
            >
              {isMenuOpen ? <FontAwesomeIcon icon={faXmark} size='xl'/> : <FontAwesomeIcon icon={faBars} size='xl' />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } md:hidden  overflow-hidden`}
        >
          <div className="flex flex-col space-y-2 pt-4 pb-2">
            <Link
              className={`font-medium px-4 py-2  rounded-md ${
                props.active === 'home' 
                 ? 'bg-[#344E41] dark:bg-[#263a30] text-white' 
                  : 'hover:bg-[#344E41] dark:hover:bg-[#263a30] text-black hover:text-white dark:text-white'
              }`}
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`font-medium px-4 py-2 rounded-md ${
                props.active === 'article' 
                 ? 'bg-[#344E41] dark:bg-[#263a30] text-white' 
                  : 'hover:bg-[#344E41] dark:hover:bg-[#263a30] text-black hover:text-white dark:text-white'
              }`}
              to="/article"
              onClick={() => setIsMenuOpen(false)}
            >
              Article
            </Link>
            <Link
              className={`font-medium px-4 py-2  rounded-md ${
                props.active === 'check' 
                 ? 'bg-[#344E41] dark:bg-[#263a30] text-white' 
                  : 'hover:bg-[#344E41] dark:hover:bg-[#263a30] text-black hover:text-white dark:text-white'
              }`}
              to="/check"
              onClick={() => setIsMenuOpen(false)}
            >
              UV Index
            </Link>
            
          </div>
        </div>
      </nav>
      <hr className=" max-w-[100rem] mx-auto "></hr>
    </header>
  );
};

export default Navbar;
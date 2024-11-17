import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
    <header className="w-full bg-[#415A77] text-sm py-3 dark:bg-[#1b263b] transition-all duration-300 fixed z-50 shadow-2xl">
      <nav className="max-w-[100rem] w-full mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80 w-32 h-16"
            href="#"
          >
            <p className='text-3xl'>LacakUV</p>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'home' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'article' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/article"
            >
              Article
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'check' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/check"
            >
              UV Index
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="hidden md:block font-medium px-4 py-2 text-white rounded-md hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300"
            >
              Log in
            </Link>
            <label className="switch">
              <input 
                type="checkbox" 
                onChange={toggleDarkMode} 
                checked={localStorage.getItem('theme') === 'dark'} 
              />
              <span className="slider" />
            </label>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:bg-[#1b263b] rounded-md transition-all duration-300"
            >
              {isMenuOpen ? <FontAwesomeIcon icon={faXmark} size='xl'/> : <FontAwesomeIcon icon={faBars} size='xl' />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } md:hidden transition-all duration-300 overflow-hidden`}
        >
          <div className="flex flex-col space-y-2 pt-4 pb-2">
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'home' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'article' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/article"
              onClick={() => setIsMenuOpen(false)}
            >
              Article
            </Link>
            <Link
              className={`font-medium px-4 py-2 text-white rounded-md ${
                props.active === 'check' 
                  ? 'bg-[#1b263b] dark:bg-[#415A77]' 
                  : 'hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300'
              }`}
              to="/check"
              onClick={() => setIsMenuOpen(false)}
            >
              UV Index
            </Link>
            <Link
              to="/login"
              className="font-medium px-4 py-2 text-white rounded-md hover:bg-[#1b263b] dark:hover:bg-[#415A77] transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
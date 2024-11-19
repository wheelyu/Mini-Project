// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <div>
    <hr className=" max-w-[76rem] mx-auto "></hr>
    <footer className="bg-white dark:bg-[#121212] dark:text-[#344E41] text-[#2b4237] py-2">
      
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">LacakUV</h2>
          
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">&copy; 2024 Harun Abdulkarim. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

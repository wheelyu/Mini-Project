// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Template/navbar';
import InputField from '../../components/CheckPage/InputField';
import ForecastDisplay from '../../components/CheckPage/Forecast';
import ChartDisplay from '../../components/CheckPage/Chart';
import Footer from '../../components/Template/Footer';
const About = () => {


  return (
    <div >
      <Navbar active="check"/>
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-72 pt-40  bg-[efefef] dark:bg-[#121212] ">
        <InputField />
        <div className="w-full p-10 bg-green-300 bg-opacity-5 dark:bg-opacity-15 rounded-lg dark:bg-[#588157] " >
          <ForecastDisplay />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-48 py-20 bg-[efefef] dark:bg-[#121212] ">
      <ChartDisplay />
      </div>
    <div className="w-full bg-white dark:bg-[#121212]">
        <Footer />
      </div>
    </div>
  );
};

export default About;

// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Template/navbar';
import InputField from '../../components/CheckPage/InputField';
import UVIndexDisplay from '../../components/CheckPage/IndexUV';
import ForecastDisplay from '../../components/CheckPage/Forecast';
import ChartDisplay from '../../components/CheckPage/Chart';
import Footer from '../../components/Template/Footer';
const About = () => {


  return (
    <div >
      <Navbar active="check"/>
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-72 py-20 bg-[efefef] dark:bg-[#121212] duration-300 transition-all h-fit">
        <InputField />
        <div className="w-full p-6 px-10 bg-green-300 bg-opacity-5 dark:bg-opacity-15 rounded-lg dark:bg-[#588157] min-h-96 duration-300 transition-all mt-0 md:mt-40 h-fit" >
          <UVIndexDisplay />
          <ForecastDisplay />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-48 py-20 bg-[efefef] dark:bg-[#121212] duration-300 transition-all ">
      <ChartDisplay />
      </div>
    <div className="w-full bg-white dark:bg-[#121212]">
        <Footer />
      </div>
    </div>
  );
};

export default About;

// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import InputField from '../../components/inputField/InputField';
import UVIndexDisplay from '../../components/IndexUV';
import ForecastDisplay from '../../components/Forecast';
import Footer from '../../components/footer';
const About = () => {


  return (
    <div >
      <Navbar active="check"/>
      <div className="flex flex-row justify-center items-start px-48 py-20 bg-[efefef] dark:bg-gray-900 duration-300 transition-all h-screen">
      <InputField />
      <div className="w-full p-6 bg-slate-100 dark:bg-slate-800 min-h-96 duration-300 transition-all mt-40" >
        <UVIndexDisplay />
        <ForecastDisplay />
      </div>
    </div>
    <div className="w-full  ">
        <Footer />
      </div>
    </div>
  );
};

export default About;

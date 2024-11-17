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
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-48 py-20 bg-[efefef] dark:bg-gray-900 duration-300 transition-all h-fit">
      <InputField />
      <div className="w-full p-6 px-10 bg-slate-100 rounded-lg dark:bg-slate-800 min-h-96 duration-300 transition-all mt-0 md:mt-40 h-fit" >
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

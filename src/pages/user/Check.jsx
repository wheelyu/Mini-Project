// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import InputField from '../../components/inputField/InputField';
import UVIndexDisplay from '../../components/IndexUV';
import ForecastDisplay from '../../components/Forecast';
import ChartDisplay from '../../components/Chart';
import Footer from '../../components/footer';
const About = () => {


  return (
    <div >
      <Navbar active="check"/>
      
    <div className="w-full bg-white dark:bg-[#121212]">
        <Footer />
      </div>
    </div>
  );
};

export default About;

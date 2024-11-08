// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import InputField from '../components/InputField';
const About = () => {


  return (
    <div >
      <Navbar />
      <div className="flex justify-center mt-10">
        <InputField />
      </div>
    </div>
  );
};

export default About;

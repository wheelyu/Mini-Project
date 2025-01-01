import { useEffect, useState } from "react";
import Navbar from "../../components/Template/navbar";
import Footer from "../../components/Template/Footer";
import Landing from "../../components/LandingPage/Landing";
import Carousel from "../../components/LandingPage/Carousel";
import Visi from "../../components/LandingPage/Visi"
export default function Home() {
  const [formattedTime, setFormattedTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#121212]">
      <Navbar active="home" />
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-48  bg-[efefef] dark:bg-[#121212]  h-fit">
        <Landing />
      </div>
      <Carousel />
      <div className="max-w-[50rem] mx-auto bg-white dark:bg-[#121212] pt-48">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">Tentang Website</h1>
        <Visi />
      </div>
      <div className="w-full pt-20">
        <Footer />
      </div>

    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Landing from "../../components/Landing/Landing";
import Carousel from "../../components/Carousel/Carousel";
import Visi from "../../components/Visi"
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
      <div className="flex flex-col md:flex-row justify-center items-start px-5 md:px-48  bg-[efefef] dark:bg-[#121212] duration-300 transition-all h-fit">
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

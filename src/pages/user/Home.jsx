import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import Landing from "../../components/Landing/Landing";
import Carousel from "../../components/Carousel/Carousel";
import StickyCtaButton from "../../components/ctaButton";
import ListArticle from "../../components/ListArticle";
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
    <div className="bg-white dark:bg-[#263a30]">
      <Navbar active="home" />
      <Landing />
      <Carousel />
            <div className=" justify-center items-start px-5 md:px-48 py-40 bg-white dark:bg-[#263a30] duration-300 transition-all h-fit">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white py-10">Artikel terkait uv index</h1>
            <ListArticle locate="home"/>
            </div>
      <div className="w-full  ">
        <Footer />
      </div>
      <StickyCtaButton />
    </div>
  );
}

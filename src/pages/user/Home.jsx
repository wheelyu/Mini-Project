import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer";
import Landing from "../../components/Landing/Landing";
import Carousel from "../../components/Carousel/Carousel";
import StickyCtaButton from "../../components/ctaButton";
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
     
      <div className="w-full pt-20">
        <Footer />
      </div>
      <StickyCtaButton />
    </div>
  );
}

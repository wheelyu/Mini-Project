import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Navbar from "../components/navbar/navbar";
import Landing from "../components/Landing/Landing";
import Carousel from "../components/Carousel/Carousel";
import StickyCtaButton from "../components/ctaButton";
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
    <div>
      <Navbar active="home" />
      <Landing />
      <Carousel />
      <div className="mx-auto flex justify-center py-32 items-center">
        <p className="text-6xl">Current Time: {formattedTime}</p>
      </div>
      <StickyCtaButton />
    </div>
  );
}

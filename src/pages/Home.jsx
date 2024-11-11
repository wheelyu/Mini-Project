import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import Navbar from "../components/navbar";

=======
import Navbar from "../components/navbar/navbar";
import Landing from "../components/Landing/Landing";
import Carousel from "../components/Carousel/Carousel";
import StickyCtaButton from "../components/ctaButton";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <Navbar />
=======
      <Navbar active="home" />

      <Landing />
      <Carousel />
>>>>>>> Stashed changes
      <div className="mx-auto flex justify-center py-32 items-center">
        <p className="text-6xl">Current Time: {formattedTime}</p>
      </div>
      <StickyCtaButton />
    </div>
  );
}

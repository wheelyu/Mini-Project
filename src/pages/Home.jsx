import React from "react";
import Navbar from "../components/navbar";
export default function Home() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <div >
      <Navbar />
      <p>Current Time: {formattedTime}</p>
    </div>
  );
}

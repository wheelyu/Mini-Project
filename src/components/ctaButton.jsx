// StickyCtaButton.js
import React from "react";

const StickyCtaButton = () => {

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 px-6 py-6 bg-[#1b263b] dark:bg-[#415A77] text-green-400 rounded-full shadow-lg hover:bg-green-400 hover:text-white transition-colors duration-300 z-50"
    >
      ChatBOT
    </button>
  );
};

export default StickyCtaButton;

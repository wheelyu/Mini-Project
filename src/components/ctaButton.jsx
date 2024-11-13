// StickyCtaButton.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const StickyCtaButton = () => {

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 w-12 h-12 bg-[#1b263b] dark:bg-[#415A77] text-green-400 rounded-full shadow-lg hover:bg-green-400 hover:text-white transition-colors duration-300 z-50"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default StickyCtaButton;

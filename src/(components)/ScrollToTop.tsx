"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY >= 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    showBtn && (
      <a href="#app">
        <button id="up" className="icon-keyboard_arrow_up scrollToTop"></button>
      </a>
    )
  );
}

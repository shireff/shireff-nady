"use client";

import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [showModel, setShowModel] = useState(false);
  const [mode, setMode] = useState("dark"); 

  useEffect(() => {
    const storedMode = localStorage.getItem("currentMode") ?? "dark";
    setMode(storedMode);
  }, []);


  useEffect(() => {
    if (mode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }

    localStorage.setItem("currentMode", mode);

  }, [mode]);

  const closeModal = () => {
    setShowModel(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".modal") === null) {
      closeModal();
    }
  };

  useEffect(() => {
    if (showModel) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModel]);

  return (
    <header id="header" className="flex">
      <div className="hide" />
      <button
        className="menu flex"
        onClick={() => {
          setShowModel(true);
        }}
      >
        <span className="icon-menu" />
      </button>

      <nav>
        <ul className="flex">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <button
        onClick={() => {
          const newMode = mode === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newMode);
          setMode(newMode);
        }}
        className="mood flex"
      >
        {mode === "dark" ? (
          <span className="icon-moon-o" />
        ) : (
          <span className="icon-sun" />
        )}
      </button>

      {showModel && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button className="clear" onClick={closeModal}>
                <span className="icon-clear" />
              </button>
            </li>
            <li onClick={closeModal}>
              <a href="#about">About</a>
            </li>
            <li onClick={closeModal}>
              <a href="#experience">Experience</a>
            </li>
            <li onClick={closeModal}>
              <a href="#projects">Projects</a>
            </li>
            <li onClick={closeModal}>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

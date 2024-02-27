import React from 'react'
import "./Landing.css"
// @ts-ignore
import verified from './../../../public/bb.png'
import { motion } from "framer-motion"
import Lottie from "lottie-react";
// @ts-ignore
import landingAnimation from "./../../../public/animation/Landing-Animation .json"
export default function Landing() {
  return (
    <section className="landing flex">
      <div className="left">
        <div className="p-avatar flex">
          <motion.img
          initial={{ scale: 0}}
          animate={{ scale : 1}}
          transition={{ damping: 8, type: "spring", stiffness:100}}
           className="avatar" src={verified} alt="" />
          <div className="icon-verified" />
        </div>
        <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9}}
         className="title">
          Shireff Nady <br />
          Front-End Developer
        </motion.h1>
        <p className="subtitle">
          I`m Shireff , Front-End Developer adept at translating creative visions into engaging user interfaces using HTML, CSS, JavaScript, and React. Dedicated to staying updated on industry trends, Shireff aims to enhance digital experiences collaboratively.
          {/* I am Shireff, Front-End Developer with a passion for transforming creative visions
          into captivating user interfaces with a strong foundation in
          HTML, CSS, JavaScript, and React, I specialize in crafting seamless and
          responsive web experiences. Skilled in translating design concepts
          into functional, user-friendly interfaces, I am dedicated to staying
          abreast of the latest industry trends and technologies,
          Lets elevate the digital experience together */}
        </p>
        <div className="all-icons flex">
          <a rel="noreferrer" target='_blank' href="https://github.com/shireff" className="icon icon-github">
          </a>
          <a rel="noreferrer" target='_blank' href="https://www.linkedin.com/in/shireff-nady-67bb11280/" className="icon icon-linkedin-square"></a>
          <a rel="noreferrer" target='_blank' href="https://wa.me/+201274068946" className="icon icon-whatsapp"></a>
        </div>

      </div>
      <div className="right animation">
        <Lottie  className="animat" animationData={landingAnimation} />
      </div>
    </section>
  );
}

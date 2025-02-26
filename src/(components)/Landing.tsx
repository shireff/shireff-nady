"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "./Landing.css";

const verified = "/bb3.png";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Landing() {
  const [landingAnimation, setLandingAnimation] = useState<object| null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ Ensures Lottie is only used in client-side
    import("@/assets/animation/Landing-Animation.json")
      .then((module) => setLandingAnimation(module.default))
      .catch((err) => console.error("Error loading animation:", err));
  }, []);

  return (
    <section className="landing flex">
      <div className="left">
        <div className="p-avatar flex">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ damping: 8, type: "spring", stiffness: 100 }}
            className="avatar"
            src={verified}
            alt="Verified Avatar"
          />
          <div className="icon-verified" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="title"
        >
          Shireff Nady <br />
          Front-End Developer
        </motion.h1>
        <p className="subtitle">
          I&apos;m Shireff, a Front-End Developer adept at translating creative
          visions into engaging user interfaces using HTML, CSS, JavaScript, and
          React. Dedicated to staying updated on industry trends, I aim to
          enhance digital experiences collaboratively.
        </p>
        <div className="all-icons flex">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/shireff"
            className="icon icon-github"
          ></a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/shireff-nady-5b7791340/"
            className="icon icon-linkedin-square"
          ></a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://wa.me/+201274068946"
            className="icon icon-whatsapp"
          ></a>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="right animation"
      >
        {/* ✅ Render Lottie only on the client after animation is loaded */}
        {isClient && landingAnimation && (
          <Lottie className="animat" animationData={landingAnimation} />
        )}
      </motion.div>
    </section>
  );
}

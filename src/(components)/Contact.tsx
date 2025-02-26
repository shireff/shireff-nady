"use client";

import React, { useEffect, useState } from "react";
import "./Contact.css";
import { useForm, ValidationError } from "@formspree/react";
import dynamic from "next/dynamic";

// ✅ Dynamically import Lottie (Prevents SSR error)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Contact() {
  const [state, handleSubmit] = useForm("xqkrawrb");
  const [contactAnimation, setContactAnimation] = useState<object | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("@/assets/animation/Animation.json")
      .then((module) => setContactAnimation(module.default))
      .catch((err) => console.error("Error loading animation:", err));
  }, []);

  return (
    <section id="contact" className="contact">
      <h1 className="title">
        <span className="icon-envelope" />
        Contact Me
      </h1>
      <p className="subtitle">
        Contact me for more information and get notified when I publish
        something new.
      </p>
      <div className="email flex">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input required type="email" name="email" id="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="form-massage flex">
            <label htmlFor="massage">Your message:</label>
            <textarea required name="message" id="massage"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button type="submit" disabled={state.submitting} className="send">
            Send
          </button>
          {state.succeeded && (
            <p className="msgAlert">
              Your message has been sent successfully 👌
            </p>
          )}
        </form>
        <div className="animation">
          {isClient && contactAnimation && (
            <Lottie className="animat" animationData={contactAnimation} />
          )}
        </div>
      </div>
    </section>
  );
}

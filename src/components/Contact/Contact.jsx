import React from "react";
import "./Contact.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
// @ts-ignore
import contactAnimation from './../../../public/animation/Animation.json'
export default function Contact() {
  const [state, handleSubmit] = useForm("xqkrawrb");
  // if (state.succeeded) {
  //   return <h1>Thanks for joining!</h1>;
  // }
  return (
    <section id="contact" className="contact">
      <h1 className="title">
        <span className="icon-envelope" />
        Contact Me
      </h1>
      <p className="subtitle">
        Contact me for more information and get notified when i publish somthing
        new.
      </p>
      <div className="email flex">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input required type="email" name="email" id="email" />
            {/* autoComplete="off" */}
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="form-massage flex">
            <label htmlFor="massage">Your massage:</label>
            <textarea required name="message" id="massage"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button type="submit" disabled={state.submitting} className="send">Send</button>
          {state.submitting && (
            <p className="msgAlert">Your message has been send successfully 👌</p>
          )}
        </form>
        <div className="animation">
          {/* https://lottiereact.com/ */}
          {/* https://lottiefiles.com/ */}
        <Lottie className="animat" animationData={contactAnimation} />
          
          </div>
      </div>
    </section>
  );
}

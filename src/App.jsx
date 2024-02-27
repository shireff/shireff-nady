// import { useState } from 'react'
import React, { useEffect, useState } from "react"
import Header from "./components/Header/Header"
import Landing from "./components/Landing/Landing"
import Projects from "./components/Projects/Projects"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"
function App() {
  const [showBtn, setShowBtn]= useState(false)
  useEffect (()=> {
    window.addEventListener("scroll", ()=> {
      if (window.scrollY >= 300) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    })
  },[])
  return (
    <div id="app" className="contianer">
      <Header />
      {/* <div className="line" /> */}
      <Landing />
      <div className="line" />
      <Projects/>
      <div className="line" />
      <Contact/>
      <div className="line" />
      <Footer />
      {showBtn && (
        <a href="#app">
        <button id="up" className="icon-keyboard_arrow_up scrollToTop"></button>
      </a>
      )}
    </div>
  )
}

export default App

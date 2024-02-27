import React, { useEffect, useState } from 'react'
import "./Header.css"
export default function Header() {
  const [showModel, setShowMoldel] = useState(false)
  const [mode, setMode] = useState(localStorage.getItem("currentMode") ?? "dark")
  useEffect(() => {
    if (mode === "light") {
      document.body.classList.remove("dark")
      document.body.classList.add("light")
    } else {
      document.body.classList.remove("light")
      document.body.classList.add("dark")
    }
  }, [mode])
  return (
    <header id='header' className='flex'>
      <div className='hide' />
      <button
        className='menu flex'
        onClick={() => {
          setShowMoldel(true)
        }}
      >
        <span className='icon-menu' />
      </button>

      <nav>

        <ul className='flex'>

          {/* <li><a href="">About</a></li> */}
          {/* <li><a href="">Articales</a></li> */}
          <li><a href="#projects">Projects</a></li>
          {/* <li><a href="">Speaking</a></li> */}
          <li><a href="#contact">Contact</a></li>
        </ul>

      </nav>

      <button
        onClick={() => {
          localStorage.setItem("currentMode", mode === "dark" ? "light" : "dark")
          setMode(localStorage.getItem("currentMode"))


          // setMode( mode === "dark" ? "light" : "dark")
        }}
        className='mood flex'>
        {mode === "dark" ? (
          <span className='icon-moon-o' />
        ) : (
          <span className='icon-sun' />
        )
        }
      </button>


      {showModel && (
        <div className="fixed">
          <ul className='modal'>
            <li>
              <button
                className='clear'
                onClick={() => {
                  setShowMoldel(false)
                }}
              >

                <span className='icon-clear' />
              </button>
            </li>
            {/* <li><a href="">About</a></li> */}
            {/* <li><a href="">Articales</a></li> */}
            <li><a href="#projects">Projects</a></li>
            {/* <li><a href="">Speaking</a></li> */}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  )
}

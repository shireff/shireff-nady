import React, { useState } from "react";
import "./Projects.css";
import { motion, AnimatePresence } from "framer-motion";
export default function Projects() {
  let projects = [
    {
      title: "Puik Bags E-Commerce",
      category: "React",
      desc: `Revolutionize your finances with our intuitive web app. Effortlessly manage expenses, create budgets, and set goals with real-time tracking. Personalized insights empower smart financial decisions for a stress-free and brighter future.`,
      img: "./imgs/React/Puik Bags E-Commerce.png",
      categ: "React",
      demo: "https://puik-bags.vercel.app/",
      git: "https://github.com/shireff/Puik-Bags-E-Commerce",
    },
    {
      title: "Alert Components",
      category: "React",
      desc: `React component for customizable alerts, styled with SCSS. Alerts are categorized by types such as info, default, warning, error, and success, each with unique visual styles.`,
      img: "./imgs/React/alerts.png",
      categ: "React",
      // demo: "https://github.com/shireff/Puik-Bags-E-Commerce",
      git: "https://github.com/shireff/Alert-Component",
    },
    {
      title: "AI-MAX",
      category: "ui",
      desc: `Explore the evolution and impact of Artificial Intelligence (AI)
      from science fiction to current advancements, delving into its
      past, present, potential future developments, and
      societal/economic consequences in this page.`,
      img: "./imgs/ui/AI-MAX.png",
      categ: "ui",
      git: "https://github.com/shireff/AI-MAX",
      demo: "https://shireff.github.io/AI-MAX/",
    },
    {
      title: "Next E-Commerce",
      category: "React",
      desc: `Explore the future of e-commerce with our cutting-edge Next.js project. Seamlessly integrating HyperUi, Tailwind, Strapi, Stripe, Cloudinary, and React Mail, it delivers a robust and dynamic shopping experience`,
      img: "./imgs/React/next e-commerce.png",
      categ: "React",
      git: "https://github.com/shireff/nextecommerce",
      // demo: "",
    },
    {
      title: "Travel",
      category: "ui",
      desc: `GitHub's "Travel" repository is a valuable resource for trip planning, providing details on climate, attractions, and top hotels. Streamlining research, it enables users to confidently plan memorable journeys.`,
      img: "./imgs/ui/Travel.png",
      categ: "ui",
      git: "https://github.com/shireff/Travel",
      demo: "https://shireff.github.io/Travel/",
    },
    {
      title: "Movies app",
      category: "React",
      desc: `Explore films and entertainment effortlessly with our user-friendly platform. Discover the latest releases, classics, and hidden gems. Join our movie-loving community for personalized recommendations and an immersive cinematic experience.`,
      img: "./imgs/React/movies-app.png",
      categ: "React",
      git: "https://github.com/shireff/movies-app",
      demo: "https://movies-app-rose-zeta.vercel.app/",
    },
    {
      title: "Capital-Shop",
      category: "ui",
      desc: `Your go-to hub for outdoor enthusiasts! Explore gear recommendations, wilderness tips, and connect with a vibrant community. Unleash your adventurous spirit and gear up for memorable outdoor experiences.`,
      img: "./imgs/ui/Capital-Shop.png",
      categ: "ui",
      git: "https://github.com/shireff/CapitalShop",
      demo: "https://shireff.github.io/Capital-Shop/",
    },
    {
      title: "Simple ecommerce",
      category: "React",
      desc: `Your ultimate fitness and wellness guide! Discover workout tips, nutrition advice, and more. Whether you're a pro or beginner, find valuable information and inspiration to reach your health goals.`,
      img: "./imgs/React/simple-ecommerce.png",
      categ: "React",
      // git: "https://github.com/shireff/SHOPPE-E-Commerce",
      // demo: "https://github.com/shireff/Puik-Bags-E-Commerce"
    },
    {
      title: "SHOPPE E-Commerce",
      category: "ui",
      desc: `Your one-stop for sustainable living: tips to cut your carbon footprint, eco-friendly products, and renewable energy info. Join our community, embark on a greener lifestyle, and impact the planet positively.`,
      img: "./imgs/ui/SHOPPE-E.png",
      categ: "ui",
      git: "https://github.com/shireff/SHOPPE-E-Commerce",
      demo: "https://shireff.github.io/SHOPPE-E-Commerce/",
    },
  ];

  const [active, setActive] = useState("all");

  const [arr, setArr] = useState(projects);

  const handleClick = (btnCat) => {
    setActive(btnCat);
    const newArr = projects.filter((item) => {
      return item.categ === btnCat;
    });
    setArr(newArr);
  };

  return (
    <main id="projects" className="flex">
      <section className="pro-left flex">
        <button
          onClick={() => {
            setActive("all");
            setArr(projects);
          }}
          className={active === "all" ? "active" : null}
        >
          {" "}
          All Projects
        </button>
        <button
          onClick={() => {
            handleClick("ui");
          }}
          className={active === "ui" ? "active" : null}
        >
          UI
        </button>
        <button
          onClick={() => {
            handleClick("React");
          }}
          className={active === "React" ? "active" : null}
        >
          React
        </button>
        {/* <button></button> */}
      </section>

      <section className="pro-right flex">
        <AnimatePresence>
          {arr.map((item, key) => {
            return (
              <motion.article
                layout
                initial={{ transform: "scale(0.4)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ type: "spring", damping: 8, stiffness: 50 }}
                key={key}
                className="card"
              >
                <img width={266} src={item.img} alt="" />
                <div className="box">
                  <h1 className="title">{item.title}</h1>
                  <p className="subtitle">{item.desc}</p>
                  <div className="flex">
                    {item.demo && (
                      <a className="btn-4" rel="noreferrer" target="_blank" href={item.demo}>
                        Demo
                      </a>
                    )}
                    {!item.demo && <p>No Demo</p>}
                    {item.git && (
                      <a className="btn-4"  rel="noreferrer" target="_blank" href={item.git}>
                        Show Code
                      </a>
                    )}
                    {!item.git && <p>Private Repo</p>}
                  </div>
                  {/* <div className="flex">
                    <a rel="noreferrer" target="_blank" href={item.demo}>
                      Demo
                    </a>
                    <a rel="noreferrer" target="_blank" href={item.git}>
                      Show Code
                    </a>
                  </div> */}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
}

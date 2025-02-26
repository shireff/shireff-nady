"use client";
import { useState } from "react";
import "./Projects.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
export default function Projects() {
  const projects = [
    {
      title: "Puik Bags E-Commerce",
      category: "React",
      desc: `Revolutionize your finances with our intuitive web app. Effortlessly manage expenses, create budgets, and set goals with real-time tracking. Personalized insights empower smart financial decisions for a stress-free and brighter future.`,
      img: "/imgs/React/Puik Bags E-Commerce.png",
      categ: "React",
      demo: "https://puik-bags.vercel.app/",
      git: "https://github.com/shireff/Puik-Bags-E-Commerce",
    },
    {
      title: "Alert Components",
      category: "React",
      desc: `React component for customizable alerts, styled with SCSS. Alerts are categorized by types such as info, default, warning, error, and success, each with unique visual styles.`,
      img: "/imgs/React/alerts.png",
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
      img: "/imgs/ui/AI-MAX.png",
      categ: "ui",
      git: "https://github.com/shireff/AI-MAX",
      demo: "https://shireff.github.io/AI-MAX/",
    },
    {
      title: "Next E-Commerce",
      category: "next",
      desc: `Explore the future of e-commerce with our cutting-edge Next.js project. Seamlessly integrating HyperUi, Tailwind, Strapi, Stripe, Cloudinary, and React Mail, it delivers a robust and dynamic shopping experience`,
      img: "/imgs/React/next e-commerce.png",
      categ: "next",
      git: "https://github.com/shireff/nextecommerce",
      // demo: "",
    },
    {
      title: "Travel",
      category: "ui",
      desc: `GitHub's "Travel" repository is a valuable resource for trip planning, providing details on climate, attractions, and top hotels. Streamlining research, it enables users to confidently plan memorable journeys.`,
      img: "/imgs/ui/Travel.png",
      categ: "ui",
      git: "https://github.com/shireff/Travel",
      demo: "https://shireff.github.io/Travel/",
    },
    {
      title: "Movies app",
      category: "React",
      desc: `Explore films and entertainment effortlessly with our user-friendly platform. Discover the latest releases, classics, and hidden gems. Join our movie-loving community for personalized recommendations and an immersive cinematic experience.`,
      img: "/imgs/React/movies-app.png",
      categ: "React",
      git: "https://github.com/shireff/movies-app",
      demo: "https://movies-app-rose-zeta.vercel.app/",
    },
    {
      title: "Capital-Shop",
      category: "ui",
      desc: `Your go-to hub for outdoor enthusiasts! Explore gear recommendations, wilderness tips, and connect with a vibrant community. Unleash your adventurous spirit and gear up for memorable outdoor experiences.`,
      img: "/imgs/ui/Capital-Shop.png",
      categ: "ui",
      git: "https://github.com/shireff/CapitalShop",
      demo: "https://shireff.github.io/Capital-Shop/",
    },
    {
      title: "Simple ecommerce",
      category: "React",
      desc: `Your ultimate fitness and wellness guide! Discover workout tips, nutrition advice, and more. Whether you're a pro or beginner, find valuable information and inspiration to reach your health goals.`,
      img: "/imgs/React/simple-ecommerce.png",
      categ: "React",
      // git: "https://github.com/shireff/SHOPPE-E-Commerce",
      // demo: "https://github.com/shireff/Puik-Bags-E-Commerce"
    },
    {
      title: "My Computer 2000",
      category: "React",
      desc: `MyComputer2000! Specializing in surveillance setup, swift internet fixes, and computer upkeep to ensure seamless digital operations.`,
      img: "/imgs/React/mycomputer2000.png",
      categ: "React",
      // git: "https://github.com/shireff/mycomputer2000",
      demo: "https://mycomputer2000.vercel.app/",
    },
    {
      title: "SHOPPE E-Commerce",
      category: "ui",
      desc: `Your one-stop for sustainable living: tips to cut your carbon footprint, eco-friendly products, and renewable energy info. Join our community, embark on a greener lifestyle, and impact the planet positively.`,
      img: "/imgs/ui/SHOPPE-E.png",
      categ: "ui",
      git: "https://github.com/shireff/SHOPPE-E-Commerce",
      demo: "https://shireff.github.io/SHOPPE-E-Commerce/",
    },
    {
      title: "Shop API",
      category: "node",
      desc: `A robust back-end built with Node.js, Express, and MongoDB. It features an efficient product search API with regex-based filtering, error handling, and seamless integration with Redux Toolkit for front-end communication. Designed with a modular and scalable architecture.`,
      //img: "./imgs/ui/SHOPPE-E.png",
      categ: "node",
      // git: "https://github.com/shireff/shoppy-ecommerce-server",
      demo: "https://shoppy-server.vercel.app/api-docs/",
    },
    {
      title: "Shop E-Commerce",
      category: "React",
      desc: `A full-stack e-commerce application featuring a React front-end with Redux Toolkit for state management and Tailwind CSS for responsive design. Users can search products with live results and skeleton loaders. The back-end is powered by Node.js, Express, and MongoDB, providing robust APIs for efficient data handling.`,
      img: "/imgs/React/fullstackecommerce.png",
      categ: "React",
      // git: "https://github.com/shireff/shoppy-ecommerce-client",
      demo: "https://shoppy-ochre.vercel.app/",
    },
    {
      title: "Inventory Management",
      category: "next",
      desc: `Inventory Management System built with Next.js, TypeScript, and Tailwind CSS This Inventory Management System is a modern, scalable web application designed to streamline the tracking, management, and organization of products within a business. Built with Next.js, TypeScript, and Tailwind CSS, the application leverages these powerful technologies to ensure an efficient, high-performance user experience.Users can search products with live results and skeleton loaders. The back-end is powered by Node.js, Express, and MongoDB, providing robust APIs for efficient data handling.`,
      img: "/imgs/React/InventoryManagement.png",
      categ: "next",
      // git: "https://github.com/shireff/inventory-management-client",
      demo: "https://inventory-management-client-bay.vercel.app/",
    },
    {
      title: "Inventory Management API",
      category: "node",
      desc: `Inventory Management System built with Next.js, TypeScript, and Tailwind CSS This Inventory Management System is a modern, scalable web application designed to streamline the tracking, management, and organization of products within a business. Built with Next.js, TypeScript, and Tailwind CSS, the application leverages these powerful technologies to ensure an efficient, high-performance user experience.Users can search products with live results and skeleton loaders. The back-end is powered by Node.js, Express, and MongoDB, providing robust APIs for efficient data handling.`,
      // img: "./imgs/React/InventoryManagement.png",
      categ: "node",
      // git: "https://github.com/shireff/inventory-management-server",
      demo: "https://inventory-management-server-production.up.railway.app/api-docs/",
    },
    {
      title: "LMS Management API",
      category: "node",
      desc: `The LMS Management API is a backend system designed to manage online learning platforms. It provides essential functionalities for handling users, courses, enrollments, authentication, and content management. The API is structured using RESTful principles and documented using Swagger to ensure clarity and ease of integration`,
      // img: "./imgs/React/InventoryManagement.png",
      categ: "node",
      // git: "https://github.com/shireff/inventory-management-server",
      demo: "https://lms-server-production-589d.up.railway.app/api-docs/#/",
    },
  ];

  const [active, setActive] = useState("all");

  const [arr, setArr] = useState(projects);

  const handleClick = (btnCat: string) => {
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
          className={active === "all" ? "active" : undefined}
        >
          {" "}
          All Projects
        </button>
        <button
          onClick={() => {
            handleClick("ui");
          }}
          className={active === "ui" ? "active" : undefined}
        >
          UI
        </button>
        <button
          onClick={() => {
            handleClick("React");
          }}
          className={active === "React" ? "active" : undefined}
        >
          React
        </button>
        <button
          onClick={() => {
            handleClick("next");
          }}
          className={active === "next" ? "active" : undefined}
        >
          Next.Js
        </button>
        <button
          onClick={() => {
            handleClick("node");
          }}
          className={active === "node" ? "active" : undefined}
        >
          NodeJs
        </button>
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
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.title || "Project"}
                    width={266}
                    height={150}
                    priority
                    //   unoptimized // Remove if using external images (Optional)
                  />
                ) : (
                  <div className="placeholder">
                    <i
                      className="fas fa-image"
                      style={{ fontSize: "36px", color: "#888" }}
                    ></i>
                  </div>
                )}
                <div className="box">
                  <h1 className="title">{item.title}</h1>
                  <p
                    className="subtitle"
                    title={item.desc.length > 215 ? item.desc : ""}
                  >
                    {item.desc.length > 215
                      ? `${item.desc.slice(0, 215)}...`
                      : item.desc}
                  </p>

                  <div className="flex">
                    {item.demo && (
                      <a
                        className="btn-4"
                        rel="noreferrer"
                        target="_blank"
                        href={item.demo}
                      >
                        Demo
                      </a>
                    )}
                    {!item.demo && <p>No Demo</p>}
                    {item.git && (
                      <a
                        className="btn-4"
                        rel="noreferrer"
                        target="_blank"
                        href={item.git}
                      >
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

import About from "@/(components)/About";
import Contact from "@/(components)/Contact";
import Experience from "@/(components)/Experience";
import Footer from "@/(components)/Footer";
import Header from "@/(components)/Header";
import Landing from "@/(components)/Landing";
import Projects from "@/(components)/Projects";
import ScrollToTop from "@/(components)/ScrollToTop";
//import Image from "next/image";

export default function Home() {
  return (
    <div id="app" className="contianer">
      <Header />
      {/* <div className="line" /> */}
      <Landing />
      <div className="line" />
      <About />
      <div className="line" />
      <Experience />
      <div className="line" />
      <Projects />
      <div className="line" />
      <Contact />
      <div className="line" />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

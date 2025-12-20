import About from "@/(components)/About";
import AIHelper from "@/(components)/AIHelper";
import Contact from "@/(components)/Contact";
import Experience from "@/(components)/Experience";
import Footer from "@/(components)/Footer";
import Header from "@/(components)/Header";
import Landing from "@/(components)/Landing";
import Projects from "@/(components)/Projects";
import ScrollToTop from "@/(components)/ScrollToTop";
import StateComparisonSection from "@/(components)/StateComparisonSection";
//import Image from "next/image";
import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export default function Home() {
  return (
    <div id="app" className={`container ${poppins.variable} ${roboto.variable}`}>
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
      <StateComparisonSection />
      <div className="line" />
      <Contact />
      <div className="line" />
      <Footer />
      <AIHelper />

      <ScrollToTop />
    </div>
  );
}

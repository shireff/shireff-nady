"use client";
import { motion } from "framer-motion";
//import { Briefcase } from "lucide-react";
import "./Experience.css";

const experiences = [
  {
    id: "3",
    company: "Appy - Poland",
    position: "Senior Front-End Engineer",
    period: "November 2023 - Present",
    description: [
      "Created reusable components to optimize application efficiency using React and Next.js.",
      "Led the testing process, including unit, integration, and end-to-end testing with Cypress.",
      "Delivered high-performance user experiences for large-scale projects.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Jest",
      "Cypress",
    ],
  },
  {
    id: "2",
    company: "Instant",
    position: "Mid Front-End Engineer",
    period: "July 2021 - November 2022",
    description: [
      "Developed and integrated APIs for seamless front-end and back-end communication.",
      "Resolved technical issues adhering to coding standards.",
      "Created reusable components to enhance application performance using React and TypeScript.",
    ],
    technologies: ["React", "TypeScript", "APIs", "Tailwind CSS"],
  },
  {
    id: "1",
    company: "Digital Innovations Ltd",
    position: "Front-End Developer",
    period: "November 2020 - June 2021",
    description: [
      "Developed responsive designs and animations.",
      "Collaborated with the design team to ensure optimal user experiences.",
      "Assisted in developing and maintaining multiple client websites.",
    ],
    technologies: ["React", "JavaScript", "SCSS", "Redux"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          My professional journey in web development
        </p>
      </motion.div>

      <div className="experience-container">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="experience-card"
          >
            {/* <div className="experience-header">
              <Briefcase className="experience-icon" />
              <span className="experience-period">{exp.period}</span>
            </div> */}
            <h3 className="experience-position">{exp.position}</h3>
            <h4 className="experience-company">{exp.company}</h4>
            <ul className="experience-description">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <div className="experience-technologies">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="technology-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

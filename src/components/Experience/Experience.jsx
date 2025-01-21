import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import "./Experience.css";

const experiences = [
  {
    id: "3",
    company: "Appy - Poland",
    position: "Senior Front-End Developer",
    period: "2022 - Present",
    description: [
      "Led the development of scalable and maintainable front-end architectures",
      "Collaborated closely with cross-functional teams to deliver business-critical features",
      "Optimized application performance and implemented modern best practices",
    ],
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Redux",
      "Webpack",
    ],
  },
  {
    id: "2",
    company: "Tech Solutions Inc.",
    position: "Mid Front-End Developer",
    period: "2021 - 2022",
    description: [
      "Developed and maintained multiple client websites",
      "Implemented modern UI/UX designs with Tailwind CSS",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: "1",
    company: "Digital Innovations Ltd",
    position: "Front-End Developer",
    period: "2020 - 2021",
    description: [
      "Developed and maintained multiple client websites",
      "Implemented responsive designs and animations",
      "Collaborated with design team for optimal user experiences",
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
            <div className="experience-header">
              <Briefcase className="experience-icon" />
              <span className="experience-period">{exp.period}</span>
            </div>
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

"use client";
import { motion } from "framer-motion";
import { Code2, Layout, Rocket, Zap } from "lucide-react";
import "./About.css";

const skills = [
  {
    icon: <Code2 className="skill-icon" />,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: <Layout className="skill-icon" />,
    title: "Responsive Design",
    description: "Creating fluid layouts that work across all devices",
  },
  {
    icon: <Rocket className="skill-icon" />,
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
  },
  {
    icon: <Zap className="skill-icon" />,
    title: "Modern Tech",
    description: "Using the latest frameworks and development tools",
  },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            I&apos;m a passionate Front-End Developer with expertise in creating
            engaging user interfaces. With a strong foundation in modern web
            technologies and a commitment to clean code, I transform creative
            visions into seamless digital experiences.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="skill-card glass"
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

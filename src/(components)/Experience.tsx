/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
//import { Briefcase } from "lucide-react";
import "./Experience.css";
import { useEffect, useState } from "react";
import { experienceAPI } from "@/lib/api";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await experienceAPI.getExperience();

        const normalized = res.data.data.map((item: any) => ({
          ...item,
          desc: item.description,
        }));

        const sorted = normalized.sort((a: any, b: any) => {
          const getStartDate = (period: string) =>
            new Date(period.split("-")[0].trim() + " 1");
          return (
            getStartDate(b.period).getTime() - getStartDate(a.period).getTime()
          );
        });

        setExperience(sorted);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

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
        {experience.map((exp, index) => (
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
              {exp.description.map((desc: string[], i: number) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <div className="experience-technologies">
              {exp.technologies.map((tech: string[], i: number) => (
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

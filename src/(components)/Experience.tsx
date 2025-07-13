/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
//import { Briefcase } from "lucide-react";
import "./Experience.css";
import { JSX, useEffect, useState } from "react";
import { experienceAPI } from "@/lib/api";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [structuredSchemas, setStructuredSchemas] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
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

        const schemas = sorted.map((exp: any, index: number) => {
          const schema = {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: exp.position,
            description: Array.isArray(exp.desc)
              ? exp.desc.join(" ")
              : exp.desc,
            datePublished: exp.period.split("-")[0].trim(),
            dateModified: exp.period.split("-")[1]?.trim(),
            creator: {
              "@type": "Organization",
              name: exp.company,
            },
            keywords: exp.technologies?.join(", "),
            inLanguage: "en",
          };

          return (
            <script
              key={`exp-schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          );
        });

        setStructuredSchemas(schemas);
      } catch (error) {
        console.error("Error fetching experience:", error);
        setError("Failed to load experience. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <>
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

        {loading ? (
          <p className="status-text text-center mt-8">Loading experiences...</p>
        ) : error ? (
          <p className="error-text text-center mt-8 text-red-600">{error}</p>
        ) : experience.length === 0 ? (
          <p className="text-center mt-8">No experience added yet.</p>
        ) : (
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
                  {exp.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="experience-technologies">
                  {exp.technologies.map((tech: string, i: number) => (
                    <span key={i} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {structuredSchemas}
    </>
  );
};

export default Experience;

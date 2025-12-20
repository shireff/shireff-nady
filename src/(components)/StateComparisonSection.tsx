"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "./StateComparisonSection.css";

interface StateComparison {
  id: string;
  title: string;
  category: string;
  description?: string;
  stateBefore: {
    label: string;
    image: string;
  };
  stateAfter: {
    label: string;
    image: string;
  };
}

export default function StateComparisonSection() {
  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const res = await fetch(
          "https://shireff-nady-server.vercel.app/api/state-comparisons?isActive=true"
        );
        const data = await res.json();

        // Defensive: Only show if we have minimum 3 items
        if (data.success && data.data.length >= 3) {
          setComparisons(data.data);
        } else {
          // Hide section if less than 3 items
          setError("Insufficient data available");
        }
      } catch (err) {
        console.error("Error fetching state comparisons:", err);
        setError("Failed to load comparisons");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, []);

  // Defensive: Don't render section if loading, error, or insufficient data
  if (loading) {
    return (
      <section className="state-comparison-section">
        <div className="container">
          <p className="loading-text">Loading transformations...</p>
        </div>
      </section>
    );
  }

  if (error || comparisons.length < 3) {
    return null; // Hide section completely
  }

  return (
    <section className="state-comparison-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          State Transformations
        </motion.h2>

        <div className="comparison-grid">
          <AnimatePresence>
            {comparisons.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="comparison-card glass"
              >
                <h3 className="comparison-title">{item.title}</h3>
                {item.description && (
                  <p className="comparison-description">{item.description}</p>
                )}

                <div className="states-container">
                  {/* Before State */}
                  <div className="state-box">
                    <span className="state-label">{item.stateBefore.label}</span>
                    <div className="image-wrapper">
                      <Image
                        src={item.stateBefore.image}
                        alt={`${item.title} - ${item.stateBefore.label}`}
                        width={400}
                        height={300}
                        className="state-image"
                        priority={index < 3}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="divider">
                    <span className="arrow">→</span>
                  </div>

                  {/* After State */}
                  <div className="state-box">
                    <span className="state-label">{item.stateAfter.label}</span>
                    <div className="image-wrapper">
                      <Image
                        src={item.stateAfter.image}
                        alt={`${item.title} - ${item.stateAfter.label}`}
                        width={400}
                        height={300}
                        className="state-image"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

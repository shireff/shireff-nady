/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import FormData from "form-data";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const experiences = [
  {
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

const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MjMxMjM2MiwiZXhwIjoxNzUyOTE3MTYyfQ.xKHnGmJjbcgsG9UPicf8cpTd6FYHH0mwl9xSNvVnHuA`;
// async function uploadImage(localPath) {
//   try {
//     const fullImagePath = path.join(__dirname, "..", "..", "public", localPath);
//     const form = new FormData();
//     form.append("file", fs.createReadStream(fullImagePath));

//     const res = await axios.post(
//       "http://localhost:5000/api/projects/upload-image",
//       form,
//       {
//         headers: {
//           ...form.getHeaders(),
//           Authorization: AUTH_TOKEN,
//         },
//       }
//     );

//     return res.data.result.secure_url;
//   } catch (error) {
//     console.error(
//       `❌ Failed to upload image "${localPath}":`,
//       error.response?.data || error.message
//     );
//     return null;
//   }
// }

async function seedProjects() {
  for (const experience of experiences) {
    try {
      // Upload image if available
      // if (project.img) {
      //   const uploadedUrl = await uploadImage(project.img);
      //   if (uploadedUrl) {
      //     project.img = uploadedUrl;
      //   } else {
      //     console.warn(
      //       `⚠️ Skipping "${project.title}" due to image upload failure.`
      //     );
      //     continue;
      //   }
      // }

      // Send project data to backend
      await axios.post("http://localhost:5000/api/experiences", experience, {
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
      });

      console.log(`✅ Added: ${experience.company}`);
    } catch (error) {
      console.error(
        `❌ Error uploading project "${experience.company}":`,
        error.response?.data || error.message
      );
    }
  }
}

seedProjects();

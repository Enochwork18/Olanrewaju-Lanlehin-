export const personalInfo = {
  name: "Olanrewaju Lanlehin",
  role: "Project Manager",
  email: "Justwaju@gmail.com",
  phone: "09065011800",
  roles: ["Project Manager", "Team Leader", "Event Strategist"],
};

export const aboutText =
  "I'm Olanrewaju Lanlehin, a Project Manager with over 2 years of experience leading projects, coordinating cross-functional teams, and delivering successful events and organizational initiatives. Skilled in project planning, stakeholder management, operations, and execution, with a strong track record of driving results and achieving project objectives.";

export const visionText =
  "Aiming to lead impactful projects that create value, drive innovation, and deliver measurable results while fostering collaboration, excellence, and sustainable growth.";

export const education = {
  degree: "B.Sc. Computer Science",
  university: "Federal University Lokoja, Kogi State",
  certifications: [{ title: "Certified Project Manager", year: "2023" }],
};

export const skills = [
  "Leadership",
  "Strategic Planning",
  "Problem Solving",
  "Communication",
];

export const workExperience = [
  {
    title: "Project Manager",
    period: "2023\u2013Present",
    description:
      "Led the team to plan a major event tagged \"Creatives Conference,\" with over 100 attendees and positive reviews recorded afterwards.",
  },
  {
    title: "Hangout with Wajuwears",
    period: "2022\u20132023",
    description:
      "A mini hangout for entrepreneurs, creatives, etc.",
  },
];

export const projects = [
  {
    title: "Creatives Conference",
    period: "2024\u20132026",
    description:
      "Successfully planned and executed the Creatives Conference: coordinated project timelines, stakeholder engagement, speaker management, team operations, and event logistics to deliver a high-impact experience for creatives, professionals, and emerging talents.",
  },
];

export const closingText =
  "Project Manager with a passion for delivering impactful and well-executed projects. Experienced in leading teams, managing events, and driving creative initiatives from concept to completion. Committed to excellence, collaboration, and continuous growth in every project delivered.";

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const sectionIds = [
  "hero",
  "about",
  "vision",
  "education",
  "skills",
  "experience",
  "projects",
  "contact",
] as const;

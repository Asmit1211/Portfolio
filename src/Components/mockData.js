// Mock data for Asmit's portfolio
export const personalInfo = {
  name: "Asmit Nagesh Samal",
  title: "Web Dev Enthusiast | CS Student | Backend Logic Builder",
  email: "asmitsamal32@gmail.com",
  phone: "+91-7977840952",
  location: "Mumbai, India",
  linkedin: "https://www.linkedin.com/in/asmitsamal",
  github: "https://github.com/Asmit1211",
  education: "Final-Year BSc CS Student – Maharshi Dayanand College (Mumbai University)",
  bio: "Passionate computer science student with a strong foundation in web development and currently expanding my expertise in backend technologies. I love solving complex problems and creating efficient, scalable solutions with Node.js, Express, and database systems.",
  motto: "Code with purpose, build with passion.",
  profileImage: "https://customer-assets.emergentagent.com/job_asmit-portfolio/artifacts/3g12tsn1_profile.jpg"
};

export const skills = {
  frontend: [
    { name: "HTML", level: 90, icon: "Code" },
    { name: "CSS", level: 85, icon: "Code" },
    { name: "JavaScript", level: 80, icon: "Code" },
    { name: "React.js", level: 40, icon: "Code", learning: true }
  ],
  backend: [
    { name: "Node.js", level: 60, icon: "Server", learning: true },
    { name: "Express.js", level: 55, icon: "Server", learning: true },
    { name: "REST APIs", level: 65, icon: "Server", learning: true }
  ],
  database: [
    { name: "MongoDB", level: 50, icon: "Database", learning: true },
    { name: "MySQL", level: 45, icon: "Database", learning: true }
  ],
  tools: [
    { name: "Git", level: 80, icon: "Code" },
    { name: "GitHub", level: 80, icon: "Code" },
    { name: "VS Code", level: 90, icon: "Code" },
    { name: "Postman", level: 75, icon: "Wrench" },
    { name: "Razorpay", level: 60, icon: "Wrench" }
  ]
};

export const projects = [
  {
    id: 1,
    title: "eRTO System",
    description: "A comprehensive digital platform for Regional Transport Office operations, streamlining vehicle registration, license management, and administrative processes.",
    technologies: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript"],
    status: "In Progress",
    github: "https://github.com/Asmit1211/eRTO-System",
    features: [
      "Vehicle registration management",
      "License application processing",
      "Payment integration with Razorpay",
      "Admin dashboard",
      "Document verification system"
    ]
  },
  {
    id: 2,
    title: "Software Engineering Planning Project",
    description: "Academic project demonstrating comprehensive software development lifecycle including SRS documentation, UML diagrams, and system design.",
    technologies: ["UML", "SRS", "DFD", "System Design", "Documentation"],
    status: "Completed",
    github: "https://github.com/Asmit1211",
    features: [
      "Complete SRS documentation",
      "UML diagrams and modeling",
      "Data Flow Diagrams",
      "System architecture design",
      "Project planning and management"
    ]
  },
  {
    id: 3,
    title: "Python Mini-Projects Collection",
    description: "A collection of Python-based mini projects showcasing problem-solving skills and programming fundamentals.",
    technologies: ["Python", "Algorithms", "Data Structures"],
    status: "Ongoing",
    github: "https://github.com/Asmit1211",
    features: [
      "Algorithm implementations",
      "Data structure projects",
      "Problem-solving exercises",
      "Code optimization examples"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Digital Skills: Artificial Intelligence",
    provider: "Accenture / FutureLearn",
    issueDate: "February 2024",
    type: "link",
    url: "https://www.futurelearn.com/certificates/fat9xuy",
    description: "Comprehensive course covering AI fundamentals, machine learning concepts, and practical applications in business."
  },
  {
    id: 2,
    title: "Responsive Web Design",
    provider: "freeCodeCamp",
    issueDate: "May 2025",
    type: "link",
    url: "https://www.freecodecamp.org/certification/fccfa4bc376-661f-49f1-a320-d91e4f84d9c8/responsive-web-design",
    description: "300-hour curriculum covering HTML, CSS, responsive design principles, and accessibility."
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    provider: "Cisco",
    issueDate: "April 2025",
    type: "link",
    url: "https://www.credly.com/badges/a527a01f-6246-4fd2-8d73-333296c6e1b4/linked_in_profile",
    description: "Fundamentals of cybersecurity, threat landscape, and security best practices."
  },
  {
    id: 4,
    title: "Goldman Sachs Engineering Virtual Experience",
    provider: "Goldman Sachs",
    issueDate: "November 2024",
    type: "pdf",
    url: "https://customer-assets.emergentagent.com/job_asmit-portfolio/artifacts/36dt4h0g_GoldmanSachs%20certification.pdf",
    description: "Virtual work experience program focusing on software engineering practices and financial technology."
  },
  {
    id: 5,
    title: "AWS APAC – Cloud Basics Job Simulation",
    provider: "AWS",
    issueDate: "November 2024",
    type: "pdf",
    url: "https://customer-assets.emergentagent.com/job_asmit-portfolio/artifacts/3aksjy5r_Aws%20certification.pdf",
    description: "Hands-on experience with AWS cloud services, deployment, and infrastructure management."
  }
];

export const softSkills = [
  "Problem Solving",
  "Team Collaboration", 
  "Time Management",
  "Critical Thinking",
  "Communication",
  "Adaptability"
];

export const resumeUrl = "https://customer-assets.emergentagent.com/job_0794c517-dc15-4970-9ada-da969c8b5ae1/artifacts/whcay9bo_Asmit%20Resume%20Updated.pdf";
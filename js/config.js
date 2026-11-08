/* ==========================================================
   EDIT THIS FILE to control everything: text, images, links.
   Images: put files in the /images folder and change the path.
   ========================================================== */
const CONFIG = {
  site: {
    name: "MD. Rifatul Islam",
    initials: "MD. Rifatul Islam",
    badge: "Open for work",
    tagline:
      "I design and build fast, beautiful websites that people enjoy using.",
    roles: ["Web Designer", "Critical Thinker", "Problem Solver"],
  },

  images: {
    hero: "images/Profile.png", // main photo (square works best)
    about: "images/about.jpg", // about photo (portrait works best)
  },

  about: {
    text1:
      "I'm a developer who loves turning ideas into clean, living interfaces. I care about details, speed and good design.",
    text2:
      "When I'm not coding, I explore new tools, learn something new and help others grow.",
    stats: [
      // { value: 3,  label: "Years experience" },
      // { value: 25, label: "Projects done" },
      // { value: 15, label: "Happy clients" }
    ],
  },

  services: [
    {
      icon: "💻",
      title: "Web Development",
      text: "Fast, responsive websites built with clean code.",
    },
    {
      icon: "🎨",
      title: "UI / UX Design",
      text: "Interfaces that look great and feel natural.",
    },
    {
      icon: "📱",
      title: "Mobile-first Apps",
      text: "App-like experiences that work on every device.",
    },
    {
      icon: "🚀",
      title: "SEO & Speed",
      text: "Faster loading and better search visibility.",
    },
  ],

  skills: [
    { name: "HTML & CSS", level: 60 },
    { name: "JavaScript", level: 40 },
    { name: "Bootstrap", level: 30 },
    { name: "Git", level: 20 },
  ],

  projects: [
    {
      title: "A Modern Calculator",
      text: "A Functional Calculator",
      image: "images/calculator.png",
      link: "https://rifatul-islam-rifat.github.io/simple_calculator/",
      tags: ["HTML", "CSS", "JS"],
    },
    {
      title: "Task Manager App",
      text: "A simple and fast to-do web app.",
      image: "images/project2.svg",
      link: "https://example.com/project-2",
      tags: ["React", "API"],
    },
    {
      title: "Travel Blog",
      text: "A photo-first blog for travellers.",
      image: "images/project3.svg",
      link: "https://example.com/project-3",
      tags: ["Design", "CMS"],
    },
  ],

  contact: {
    email: "islammdrifatul776@gmail.com",
    phone: "+880 1875608253",
    location: "Feni, Bangladesh",
  },

  socials: [
    { name: "GitHub", url: "https://github.com/rifatul-islam-rifat" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/md-rifatul-islam-583765334/" },
    { name: "Facebook", url: "https://www.facebook.com/rifatulislam667" },
    { name: "X", url: "https://x.com/MDRifatulI98650" },
  ],

  /* Navigation (icon + name). Change names, ids or icons here. */
  nav: [
    {
      id: "home",
      label: "Home",
      icon: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    },
    {
      id: "about",
      label: "About",
      icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0z",
    },
    {
      id: "services",
      label: "Services",
      icon: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z",
    },
    { id: "skills", label: "Skills", icon: "M13 2L4 14h7l-1 8 9-12h-7z" },
    {
      id: "projects",
      label: "Projects",
      icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    },
    { id: "contact", label: "Contact", icon: "M3 5h18v14H3zm0 1l9 7 9-7" },
  ],
};

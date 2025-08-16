import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  expressjs,
  mongodb,
  java,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  quickpick,
  jobit,
  tripguide,
  threejs,
  elsner,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "Java Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "React Developer",
    icon: reactjs,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name:"Express JS",
    icon: expressjs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name:"Java",
    icon: java,
  },
  {
    name: "git",
    icon: git,
  },
 
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Elsner Technologies Pvt Ltd Ahmedabad",
    icon: elsner,
    iconBg: "#383E56",
    date: "April 2025",
    points: [
      "Gained hands-on experience in building modern front-end applications using React.js - got to work with the latest React features and best practices.",
      "Developed reusable UI components, implemented navigation with React Router, and integrated APIs for real-time data - built the building blocks that made our apps work smoothly.",
      "Optimized app performance and ensured a seamless user experience through best coding practices - made sure everything loaded fast and felt responsive.",
      "Worked closely with our design team to turn their creative visions into working code that looks and feels amazing.",
    ],
  },
 
 
  {
    title: "Full Stack Developer",
    company_name: "HP PARAM IT Solutions Anand",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "June 2024",
    points: [
      "Designed and developed web apps with React.js, Node.js, and Express.js - got to work with the full modern JavaScript stack.",
      "Built and integrated REST APIs for dynamic data handling - made sure all the data flowed smoothly between frontend and backend.",
      "Worked with MongoDB for database operations and queries - learned how to structure data and write efficient database queries.",
      "Gained hands-on experience in deployment and version control (Git) - got to see how code goes from development to production.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Quickpick",
    description:
      "E-commerce fashion platform featuring the latest trends and collections for everyone. Discover new arrivals with a modern, responsive design. Integrated payment processing using Stripe for secure and seamless checkout experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Node",
        color: "pink-text-gradient",
      },
      {
        name: "Express",
        color: "pink-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: quickpick,
    source_code_link: "https://github.com/Parmarbharatp/Quickpick-server",
    live_demo_link: "https://quickpick-server.onrender.com/",
  },
  {
    name: "FinWise",
    description:
      "A comprehensive full-stack financial wellness platform with smart budgeting, multi-account tracking, and AI-powered features. Integrated Clerk for secure auth, Razorpay for payments, Gemini API for AI receipt scanning, and Inngest for automated budget alerts and reports.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "Prisma",
        color: "pink-text-gradient",
      },
      {
        name: "Gemini API",
        color: "blue-text-gradient",
      },
      
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };

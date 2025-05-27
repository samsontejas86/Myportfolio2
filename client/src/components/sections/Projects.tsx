import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Github, ExternalLink } from "lucide-react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { cn } from "@/lib/utils";

// Shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio 2.0",
    description: "A modern, responsive portfolio website showcasing my projects and skills. Features include dark/light theme, smooth animations, responsive design, SEO optimization, and a fully functional contact form with form validation.",
    category: "frontend",
    image: "/images/personalportfolio.png",
    technologies: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "Vite"
    ],
    demoLink: "https://samsontejas.vercel.app",
    sourceLink: "https://github.com/samsontejas86/myportfolio2"
  },
  {
    id: 7,
    title: "AR Science Lab",
    description: "An immersive AR-based educational platform that won 1st place at Brainovision Hackathon. Features include virtual lab simulations and an AI chatbot for real-time query resolution, making science education more interactive and engaging.",
    category: "web",
    image: "/images/AR.png",
    technologies: [
      "Unity 3D",
      "C#",
      "AR Foundation",
      "AI/ML",
      "Virtual Reality",
      "3D Modeling"
    ],
    demoLink: "#",  // Add demo link if available
    sourceLink: "#", // Add GitHub link if available
    achievements: "1st Place - Brainovision Hackathon (Rs.7,000 prize)"
  },
  {
    id: 8,
    title: "EvaSafe - Women Safety Application",
    description: "An innovative women safety application that combines IoT sensors with AI/ML for real-time safety monitoring. Features include AI-powered fight detection and distress recognition systems, providing immediate assistance in emergency situations.",
    category: "web",
    image: "/images/evasafe.png",
    technologies: [
      "Python",
      "TensorFlow",
      "IoT Sensors",
      "React Native",
      "Cloud Services",
      "Machine Learning",
      "Real-time Processing"
    ],
    demoLink: "#",  // Add demo link if available
    sourceLink: "#", // Add GitHub link if available
    achievements: "1st Prize - Smart India Hackathon (Internal Round) 2024"
  },
  {
    id: 9,
    title: "Home360 - Home Services Platform",
    description: "A modern home services platform with an intuitive user interface. Features include service category management, step-by-step booking process, testimonials, newsletter integration, and location-based service provider matching. Achieved 89% SEO score through optimized performance and accessibility.",
    category: "frontend",
    image: "/images/home360.png",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "SEO Optimization",
      "Responsive Design",
      "Vercel Deployment"
    ],
    demoLink: "https://home360-bu99.vercel.app/",
    sourceLink: "#", // Add GitHub link if available
    achievements: "8th Place among 55 teams - Pivotial Soft Hackathon 2024"
  },
  {
    id: 10,
    title: "Customer Service Messaging Platform",
    description: "A comprehensive web-based platform for streamlining customer support communication. Features include real-time message status updates, priority management system, advanced search functionality, and efficient message organization with filtering capabilities.",
    category: "web",
    image: "/images/messagingapp.png",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "SQLAlchemy",
      "JavaScript",
      "WebSocket",
      "HTML5",
      "CSS3",
      "Jinja2"
    ],
    demoLink: "#", // Placeholder for future deployment
    sourceLink: "https://github.com/samsontejas86/Messaging-app",
    achievements: "Implemented real-time updates and efficient message organization system"
  },
  {
    id: 11,
    title: "School Management API",
    description: "A comprehensive Node.js API service for managing school data with location-based sorting capabilities. Features include proximity-based school searching using Haversine formula, comprehensive data validation, and a database of 230+ schools across 10 major US cities.",
    category: "backend",
    image: "/images/schoolmanagement.png",
    technologies: [
      "Node.js",
      "Express",
      "MySQL",
      "Railway",
      "RESTful API",
      "Postman",
      "Haversine Algorithm",
      "Environment Variables"
    ],
    demoLink: "https://web-production-33b1c.up.railway.app",
    sourceLink: "https://github.com/samsontejas86/school-api-node",
    achievements: "Successfully deployed on Railway with 230+ schools data across major US cities"
  },
  {
    id: 12,
    title: "CashCurve - Financial Management Application",
    description: "An innovative full-stack expense management application featuring AI-driven financial recommendations and smart budgeting. Integrates blockchain technology for secure transactions and leverages machine learning for personalized financial insights.",
    category: "web",
    image: "/images/cashcurve.jpg",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Python",
      "AI/ML",
      "Blockchain",
      "RESTful API",
      "Smart Contracts"
    ],
    demoLink: "#", // Under development
    sourceLink: "#", // Under development
    achievements: "Successfully implemented AI-driven financial recommendations and blockchain integration (Under Development)"
  }
];

// Categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Initialize shuffled projects
  useEffect(() => {
    setShuffledProjects(shuffleArray(projects));
  }, []);
  
  // Filter projects based on active category
  const filteredProjects = shuffledProjects.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  );
  
  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    // Reshuffle projects when changing categories
    setShuffledProjects(shuffleArray(projects));
  };
  
  return (
    <section id="projects" ref={ref} className="py-20 bg-background dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            My <span>Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one is built with a focus on responsive design and optimal user experience.
          </p>
        </motion.div>
        
        {/* Project filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => handleFilterChange(category.id)}
              className="px-4 py-2"
            >
              {category.label}
            </Button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card-hover-effect bg-card dark:bg-card rounded-xl overflow-hidden shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              layout
            >
              <img
                src={project.image}
                alt={project.title}
                key={project.image}
                className="w-full h-56 object-cover object-center"
                onError={(e) => {
                  console.error(`Error loading image: ${project.image}`);
                  e.currentTarget.src = '/images/placeholder.png';
                }}
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span 
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      {
                        "bg-primary/10 text-primary dark:bg-primary/20": project.category === "web",
                        "bg-secondary/10 text-secondary dark:bg-secondary/20": project.category === "frontend",
                        "bg-accent/10 text-accent dark:bg-accent/20": project.category === "backend"
                      }
                    )}
                  >
                    {project.category === "web" ? "Full Stack" : 
                     project.category === "frontend" ? "Frontend" : 
                     "Backend"}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                {project.achievements && (
                  <div className="mb-4 text-sm">
                    <span className="text-primary dark:text-primary font-semibold">
                      🏆 Achievement:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      {project.achievements}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs px-2 py-1 bg-muted dark:bg-muted rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.sourceLink && (
                    <a 
                      href={project.sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary hover:underline flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.behanceLink && (
                    <a 
                      href={project.behanceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary hover:underline flex items-center gap-1"
                    >
                      <SiBehance className="h-4 w-4" />
                      <span>Behance</span>
                    </a>
                  )}
                  {project.caseStudyLink && (
                    <a 
                      href={project.caseStudyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary hover:underline flex items-center gap-1"
                    >
                      <Link className="h-4 w-4" />
                      <span>Case Study</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all projects button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="px-6 py-6 gap-2">
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

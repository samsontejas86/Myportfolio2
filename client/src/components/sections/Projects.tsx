import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Github, ExternalLink } from "lucide-react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { cn } from "@/lib/utils";

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "Expense Tracker",
    description: "A full-stack expense tracking application built with React and Node.js.",
    category: "web",
    image: "/images/expense-tracker.png",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "#",
    sourceLink: "https://github.com/samsontejas86/Expense-Tracker"
  },
  {
    id: 2,
    title: "Task Manager",
    description: "A task management application with real-time updates and collaboration features.",
    category: "web",
    image: "/images/task-manager.png",
    technologies: ["React", "Firebase", "Material-UI"],
    demoLink: "#",
    sourceLink: "https://github.com/samsontejas86/Task-Manager"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "My personal portfolio website built with React and Tailwind CSS.",
    category: "web",
    image: "/images/portfolio.png",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    demoLink: "#",
    sourceLink: "https://github.com/samsontejas86/Portfolio"
  },
  {
    id: 4,
    title: "Chat Application",
    description: "Real-time chat application with private messaging and group chat features.",
    category: "web",
    image: "/images/chat-app.png",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    demoLink: "#",
    sourceLink: "https://github.com/samsontejas86/Chat-App"
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "A cross-platform mobile app for tracking workouts, nutrition, and progress. Includes data visualization, goal setting, and social sharing features.",
    category: "mobile",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React Native", "Firebase", "Redux", "D3.js"],
    demoLink: "#",
    sourceLink: "#"
  },
  {
    id: 6,
    title: "Banking App UI",
    description: "A complete UI/UX design for a mobile banking application. Features include account management, transaction history, budget planning, and financial insights.",
    category: "ui",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
    technologies: ["Adobe XD", "Illustrator", "Prototyping", "User Testing"],
    caseStudyLink: "#",
    behanceLink: "#"
  }
];

// Categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "ui", label: "UI/UX Design" }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Filter projects based on active category
  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  );
  
  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
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
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span 
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      project.category === "web" ? "bg-primary/10 text-primary dark:bg-primary/20" : 
                      project.category === "mobile" ? "bg-secondary/10 text-secondary dark:bg-secondary/20" : 
                      "bg-accent/10 text-accent dark:bg-accent/20"
                    )}
                  >
                    {project.category === "web" ? "Web App" : 
                    project.category === "mobile" ? "Mobile App" : 
                    "UI/UX Design"}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
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
                      <span>{project.category === "mobile" ? "App Store" : "Live Demo"}</span>
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

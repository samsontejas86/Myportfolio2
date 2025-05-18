import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Languages, 
  Download 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Bio Info
const bioInfo = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Education",
    content: "B.Tech in Information Technology"
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Experience",
    content: "Experienced in making personal projects"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Location",
    content: "Vishakapatnam, India"
  },
  {
    icon: <Languages className="h-5 w-5" />,
    title: "Languages",
    content: "English, Telugu, Hindi"
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <section id="about" ref={ref} className="py-20 bg-background dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* About image */}
          <motion.div 
            className="lg:w-1/3 max-w-md"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/images/aboutimage.jpeg"
              alt="About Me"
              className="rounded-xl shadow-lg w-full h-auto object-cover aspect-[4/5]"
            />
          </motion.div>
          
          {/* About content */}
          <motion.div 
            className="lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants} 
              className="text-2xl font-semibold mb-4"
            >
              Full Stack Developer
            </motion.h3>
            
            <motion.p 
              variants={itemVariants} 
              className="text-muted-foreground mb-6"
            >
              I am a passionate Full Stack Developer with expertise in MERN Stack Development. 
              My journey in web development has equipped me with strong problem-solving skills and 
              a deep understanding of both frontend and backend technologies.
            </motion.p>
            
            <motion.p 
              variants={itemVariants} 
              className="text-muted-foreground mb-6"
            >
              I specialize in building scalable web applications using React.js, Node.js, and MongoDB. 
              My focus is on creating efficient, maintainable code while ensuring excellent user experiences. 
              I'm constantly learning and adapting to new technologies to stay current in this ever-evolving field.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              {bioInfo.map((info, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "bg-muted/50 dark:bg-muted/20 p-4 rounded-lg shadow-sm transition-all duration-300",
                    "hover:bg-muted/70 dark:hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary dark:text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.title}</h4>
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-8"
            >
              <a 
                href="/public/resume.pdf"
                download="SamsonTejas_Resume.pdf"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download Resume</span>
                <Download className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

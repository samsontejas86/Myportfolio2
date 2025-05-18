import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SocialLink } from "@/types";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Social links
const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/samsontejas86", icon: "github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/samsontejas86/", icon: "linkedin" },
  { platform: "X", url: "https://x.com/samsontejas12", icon: "x" },
  { platform: "Email", url: "mailto:samsontejas.p@gmail.com", icon: "mail" }
];

// Function to get the appropriate icon
const getIcon = (icon: string) => {
  switch (icon) {
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'x':
      return <X className="h-5 w-5" />;
    case 'mail':
      return <Mail className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Animation for typing effect
  const roles = ["Fullstack Developer", "UI/UX Designer", "Web Enthusiast"];
  const [typedText, setTypedText] = useTypingEffect(roles, 150, 2000);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Variants for staggered animations
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
    <section 
      id="home" 
      ref={ref}
      className={cn(
        "relative min-h-screen flex items-center pt-16",
        "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-background/60 before:via-background/40 before:to-transparent dark:before:from-background/70 dark:before:via-background/50 dark:before:to-transparent/30",
        "transition-colors duration-300"
      )}
      style={{
        backgroundImage: "url('/images/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container relative mx-auto px-4 md:px-6 py-12 z-10">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-primary dark:text-primary font-medium text-shadow-sm">
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-slate-50 text-shadow-lg"
            >
              Samson Tejas
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary dark:text-primary typing-indicator text-shadow-md"
            >
              {typedText}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants} 
              className="text-foreground dark:text-slate-200 max-w-xl text-shadow-md bg-background/30 dark:bg-background/40 backdrop-blur-sm p-4 rounded-lg"
            >
              A passionate Full Stack Developer. 
              I specialize in creating responsive web applications and have a strong foundation in both frontend and backend technologies.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="pt-4 flex flex-wrap gap-4"
            >
              <Button 
                onClick={() => scrollToElement('projects')}
                className="px-6 py-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground backdrop-blur-sm"
              >
                View My Work 
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => scrollToElement('contact')}
                variant="outline" 
                className="px-6 py-6 bg-background/20 hover:bg-background/40 backdrop-blur-sm border-2 text-foreground dark:text-slate-50"
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex space-x-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground dark:text-slate-50 hover:text-primary dark:hover:text-primary transition-colors bg-background/20 hover:bg-background/40 backdrop-blur-sm p-2 rounded-full"
                aria-label={link.platform}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        .text-shadow-sm {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        .text-shadow-md {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        }
        .text-shadow-lg {
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}

// Custom hook for typing effect
function useTypingEffect(
  texts: string[], 
  typingSpeed = 150, 
  delayBetweenTexts = 2000
) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout: number;
    
    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timeout = window.setTimeout(type, delayBetweenTexts);
      } else {
        timeout = window.setTimeout(type, typingSpeed / 2);
      }
    } else {
      if (currentText === texts[currentTextIndex]) {
        timeout = window.setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      } else {
        timeout = window.setTimeout(type, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
    
    function type() {
      const text = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(text.substring(0, currentText.length - 1));
      } else {
        setCurrentText(text.substring(0, currentText.length + 1));
      }
    }
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, delayBetweenTexts]);
  
  return [currentText, setCurrentText] as const;
}

// Import useState
import { useState } from "react";

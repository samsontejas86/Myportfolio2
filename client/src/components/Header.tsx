import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NavLink } from "@/types";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { scrollToElement } from "@/lib/utils";

// Navigation links
const navLinks: NavLink[] = [
  { label: "Home", href: "#home", section: "home" },
  { label: "About", href: "#about", section: "about" },
  { label: "Skills", href: "#skills", section: "skills" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection } = useScrollSpy(navLinks.map(link => link.section));
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);
  
  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToElement(sectionId);
    setMobileMenuOpen(false);
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/90 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2">
              <span className="font-mono font-semibold text-lg text-primary dark:text-primary">
                Samson<span className="text-secondary">Tejas</span>
              </span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.section}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    activeSection === link.section 
                      ? "text-primary dark:text-primary" 
                      : "text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary"
                  )}
                >
                  {link.label}
                  {activeSection === link.section && (
                    <motion.div 
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground" 
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-background dark:bg-background border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.section}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className={cn(
                    "block py-2 text-base font-medium transition-colors",
                    activeSection === link.section 
                      ? "text-primary dark:text-primary" 
                      : "text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

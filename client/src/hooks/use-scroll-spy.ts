import { useState, useEffect, useCallback } from "react";

export function useScrollSpy(
  sectionIds: string[],
  offset = 100
): { activeSection: string | null } {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    // Find which section is currently in view
    const currentPosition = window.scrollY + offset;
    
    let currentSection: string | null = null;
    
    // Check if we're at the top of the page (before any section)
    if (window.scrollY < 10) {
      setActiveSection(sectionIds[0]);
      return;
    }
    
    // Find which section we're currently viewing
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      
      if (!element) continue;
      
      const { offsetTop, offsetHeight } = element;
      
      if (
        currentPosition >= offsetTop && 
        currentPosition < offsetTop + offsetHeight
      ) {
        currentSection = sectionId;
        break;
      }
    }
    
    // Special case for when we reach the bottom of the page
    if (
      !currentSection && 
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
    ) {
      currentSection = sectionIds[sectionIds.length - 1];
    }
    
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection, sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    // Call once on mount to set initial value
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { activeSection };
}

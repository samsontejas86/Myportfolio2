import { useThemeToggle } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Motion, Variants, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const iconVariants: Variants = {
  initial: { scale: 0.6, opacity: 0, rotate: -90 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0.6, opacity: 0, rotate: 90 },
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <motion.div
          key="sun"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
      )}
    </Button>
  );
}

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { SkillCategory } from "@/types";
import { 
  Code, 
  PaintbrushVertical, 
  Wrench, 
  Server 
} from "lucide-react";

// Skill categories data
const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "code",
    colorClass: "primary",
    skills: [
      { name: "React & Next.js", percentage: 90 },
      { name: "TypeScript", percentage: 85 },
      { name: "Tailwind CSS", percentage: 90 },
      { name: "Framer Motion", percentage: 85 },
      { name: "UI/UX Design", percentage: 80 }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "server",
    colorClass: "secondary",
    skills: [
      { name: "Node.js & Express", percentage: 85 },
      { name: "Python & Flask", percentage: 80 },
      { name: "MongoDB & MySQL", percentage: 85 },
      { name: "RESTful APIs", percentage: 90 },
      { name: "WebSocket", percentage: 80 }
    ]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: "wrench",
    colorClass: "accent",
    skills: [
      { name: "Git & GitHub", percentage: 90 },
      { name: "Railway & Vercel", percentage: 85 },
      { name: "Docker", percentage: 75 },
      { name: "AWS Services", percentage: 75 },
      { name: "CI/CD Pipelines", percentage: 80 }
    ]
  },
  {
    id: "other",
    title: "Emerging Tech",
    icon: "paintbrush",
    colorClass: "secondary",
    skills: [
      { name: "AI/ML Integration", percentage: 80 },
      { name: "AR/VR Development", percentage: 75 },
      { name: "IoT & Sensors", percentage: 75 },
      { name: "Blockchain", percentage: 70 },
      { name: "System Design", percentage: 85 }
    ]
  }
];

// Function to get the appropriate icon
const getIcon = (icon: string) => {
  switch (icon) {
    case 'code':
      return <Code className="h-5 w-5" />;
    case 'paintbrush':
      return <PaintbrushVertical className="h-5 w-5" />;
    case 'wrench':
      return <Wrench className="h-5 w-5" />;
    case 'server':
      return <Server className="h-5 w-5" />;
    default:
      return <Code className="h-5 w-5" />;
  }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <section 
      id="skills" 
      ref={ref} 
      className="py-20 bg-muted/30 dark:bg-muted/10 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            My <span>Skills</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Here are the technologies and tools I work with. I'm constantly learning and adapting to new technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-primary dark:text-primary">
                  {getIcon(category.icon)}
                </span>
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <Progress 
                      value={skill.percentage} 
                      color={category.colorClass}
                      delay={0.1 * skillIndex} 
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

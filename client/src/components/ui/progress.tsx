import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "framer-motion"

const progressVariants = cva(
  "relative h-[8px] w-full overflow-hidden rounded-full bg-secondary/20",
  {
    variants: {
      size: {
        default: "h-[8px]",
        sm: "h-[6px]",
        lg: "h-[10px]",
      },
      color: {
        default: "bg-primary/20",
        secondary: "bg-secondary/20",
        accent: "bg-accent/20",
        destructive: "bg-destructive/20",
      }
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number
  max?: number
  delay?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size, color, delay = 0, ...props }, ref) => {
    const progressRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(progressRef, { once: true, amount: 0.3 })
    const controls = useAnimation()

    const percent = (value / max) * 100

    useEffect(() => {
      if (isInView) {
        controls.start({
          width: `${percent}%`,
          transition: { duration: 1, delay: delay, ease: "easeOut" }
        })
      }
    }, [isInView, percent, controls, delay])
    
    return (
      <div
        ref={ref}
        className={cn(progressVariants({ size, color }), className)}
        {...props}
      >
        <div ref={progressRef} className="h-full w-full">
          <motion.div 
            className={cn(
              "h-full", 
              color === "default" ? "bg-primary" : 
              color === "secondary" ? "bg-secondary" : 
              color === "accent" ? "bg-accent" : 
              "bg-destructive"
            )}
            initial={{ width: 0 }}
            animate={controls}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }

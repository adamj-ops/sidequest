import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion as m } from "framer-motion"

import { cn } from "@/lib/utils"

// Card container with hover animation
const cardVariants = cva(
  "rounded-lg p-6 bg-transparent border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
  {
    variants: {
      variant: {
        default: "",
        accent: "border-l-2 border-l-brand-red",
      },
      animation: {
        default: "", 
        static: "hover:transform-none",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "default",
    },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof cardVariants>["variant"];
  animation?: VariantProps<typeof cardVariants>["animation"];
  delay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, animation, delay = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, animation, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-medium", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      className
    )}
    {...props}
  />
))
CardAction.displayName = "CardAction"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardAction, 
  CardDescription, 
  CardContent 
}

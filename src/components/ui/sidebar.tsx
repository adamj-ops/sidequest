'use client'

import * as React from "react"
import { createContext, useContext, useState } from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

// Sidebar context to manage open/closed state
interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = () => setOpen(!open)

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] group/sidebar-wrapper">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggle } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("h-8 w-8 p-0", className)}
      onClick={toggle}
      {...props}
    >
      <Menu className="h-4 w-4" />
    </Button>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col transition-all",
        open ? "ml-0 md:ml-64" : "ml-0",
        className
      )}
      {...props}
    />
  )
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarContent({ children, className, ...props }: SidebarContentProps) {
  const { open } = useSidebar()

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={cn(
        "hidden md:flex flex-col h-screen group/sidebar",
        open ? "w-64" : "w-16",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

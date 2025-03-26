import React, { useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeViewElement {
  id: string;
  name: string;
  children?: TreeViewElement[];
}

interface FileProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface FolderProps {
  element: React.ReactNode;
  value: string;
  className?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface TreeProps {
  elements?: TreeViewElement[];
  children: React.ReactNode;
  className?: string;
}

// File component represents leaf nodes (no children)
export function File({ children, value, className }: FileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded px-2 py-1 hover:bg-white/5 text-sm",
        className
      )}
      data-file={value}
    >
      <div className="opacity-70">
        <FileIcon />
      </div>
      <span>{children}</span>
    </div>
  );
}

// Folder component represents non-leaf nodes (has children)
export function Folder({
  element,
  children,
  value,
  className,
  defaultOpen = false,
}: FolderProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible defaultValue={defaultOpen ? value : undefined}>
      <AccordionPrimitive.Item value={value} className="overflow-hidden">
        <AccordionPrimitive.Trigger
          className={cn(
            "flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-white/5 text-sm",
            className
          )}
        >
          <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 ui-open:rotate-90" />
          <div className="opacity-70">
            <FolderIcon />
          </div>
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="pl-6 pt-1 text-sm">
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

// Tree component is the container for files and folders
export function Tree({ elements, children, className }: TreeProps) {
  return (
    <div className={cn("select-none", className)}>
      {children}
    </div>
  );
}

// Icon components
function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

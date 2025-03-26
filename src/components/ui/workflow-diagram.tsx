"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Icons
const TriggerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 12L10 8V16L16 12Z" fill="currentColor" />
  </svg>
);

const SwitchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 7H16C18.2091 7 20 8.79086 20 11V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 21L20 17L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 17H8C5.79086 17 4 15.2091 4 13V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EnrollIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CompletedBadge = () => (
  <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs">
    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span>Completed</span>
  </div>
);

// Node types
interface WorkflowNodeProps {
  title: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  type: 'trigger' | 'action' | 'condition';
  position?: 'top' | 'middle' | 'bottom' | 'branch-left' | 'branch-right';
  id: string;
  isHighlighted?: boolean;
  className?: string;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  title,
  description,
  badge,
  icon,
  type,
  position = 'middle',
  id,
  isHighlighted = false,
  className,
}) => {
  // Default icons based on type
  let defaultIcon;
  switch (type) {
    case 'trigger':
      defaultIcon = <TriggerIcon />;
      break;
    case 'condition':
      defaultIcon = <SwitchIcon />;
      break;
    case 'action':
      defaultIcon = <EnrollIcon />;
      break;
  }

  // Background color based on type
  let bgColor = 'bg-white';
  let borderColor = 'border-gray-200';
  let badgeColor = '';

  if (isHighlighted) {
    borderColor = 'border-blue-200';
    bgColor = 'bg-blue-50';
  }

  // Badge styling
  if (badge === 'Triggered') {
    badgeColor = 'bg-green-50 text-green-600';
  } else if (badge === 'Completed') {
    badgeColor = 'bg-green-50 text-green-600';
  } else if (badge === 'Pending') {
    badgeColor = 'bg-yellow-50 text-yellow-600';
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative rounded-lg border p-4 shadow-sm',
        bgColor,
        borderColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon || defaultIcon ? (
          <div className="flex-shrink-0 mt-0.5">
            {icon || defaultIcon}
          </div>
        ) : null}
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="font-medium text-sm">{title}</div>
            {badge && (
              <span className={cn("text-xs px-2 py-0.5 rounded-full", badgeColor)}>
                {badge}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Connector types
interface ConnectorProps {
  from: string;
  to: string;
  label?: string;
  type?: 'straight' | 'curved' | 'angled';
  isActive?: boolean;
}

export const WorkflowConnector: React.FC<ConnectorProps> = ({
  from,
  to,
  label,
  type = 'straight',
  isActive = false,
}) => {
  // This will be a placeholder for now - in a real implementation
  // we would calculate the SVG path between elements
  return (
    <div 
      className={cn(
        "absolute w-px h-8 bg-gray-200 left-1/2 -translate-x-1/2", 
        isActive && "bg-blue-400"
      )}
    >
      {label && (
        <span className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
          {label}
        </span>
      )}
    </div>
  );
};

// Workflow container
interface WorkflowDiagramProps {
  children: React.ReactNode;
  className?: string;
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative p-4", className)}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

// Example usage component
export const AutomationWorkflow: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Workflow Automation</h3>
      
      <WorkflowDiagram>
        <div className="space-y-8">
          <WorkflowNode
            id="trigger"
            type="trigger"
            title="When Deal updated"
            description="Trigger when a Deal's status is updated"
            badge="Triggered"
          />
          
          <div className="relative">
            <div className="absolute top-[-32px] left-1/2 w-px h-8 bg-gray-200"></div>
            <WorkflowNode
              id="condition"
              type="condition"
              title="Switch"
              description="Route to upsell or nurture"
              badge="Completed"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute top-[-32px] left-1/2 w-px h-8 bg-gray-200"></div>
                <div className="absolute top-[-32px] left-1/2 w-20 h-px bg-gray-200"></div>
                <WorkflowNode
                  id="branch1"
                  type="action"
                  title="Enroll in sequence"
                  description="Enroll person in 'Power user upsell'"
                  badge="Completed"
                  className="relative"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute top-[-32px] left-1/2 w-px h-8 bg-gray-200"></div>
                <div className="absolute top-[-32px] left-1/2 w-20 h-px bg-gray-200"></div>
                <WorkflowNode
                  id="branch2"
                  type="action"
                  title="Enroll in sequence"
                  description="Enroll person in 'Nurture'"
                  className="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </WorkflowDiagram>
    </div>
  );
};

export const AutomationExample: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-xl font-semibold mb-4">Automate everything</h3>
        <p className="text-gray-500 mb-4">
          You're in control. Automate even the most complex business processes with our powerful, intelligent automation engine.
        </p>
        <button className="text-sm font-medium text-black flex items-center group">
          Explore automations
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
      
      <AutomationWorkflow />
    </div>
  );
};

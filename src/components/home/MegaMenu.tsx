'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

type MenuSection = {
  id: string;
  title: string;
  description: string;
  links: {
    title: string;
    href: string;
    description?: string;
  }[];
};

const menuSections: MenuSection[] = [
  {
    id: 'services',
    title: 'Services',
    description: 'Comprehensive services to support your operations',
    links: [
      {
        title: 'Digital Transformation',
        href: '#digital-transformation',
        description: 'Modernize your operations with cutting-edge technology',
      },
      {
        title: 'Process Optimization',
        href: '#process-optimization',
        description: 'Streamline workflows for maximum efficiency',
      },
      {
        title: 'Technology Implementation',
        href: '#technology-implementation',
        description: 'Deploy the right solutions for your business needs',
      },
      {
        title: 'Custom Development',
        href: '#custom-development',
        description: 'Tailor-made solutions for unique challenges',
      },
    ],
  },
  {
    id: 'solutions',
    title: 'Solutions',
    description: 'Specialized tools to address your challenges',
    links: [
      {
        title: 'Project Management',
        href: '/auth/login',
        description: 'Track and manage projects with comprehensive tools',
      },
      {
        title: 'Document Management',
        href: '/auth/login',
        description: 'Organize, store, and collaborate on documents',
      },
      {
        title: 'Resource Planning',
        href: '/auth/login',
        description: 'Efficiently allocate resources across your organization',
      },
      {
        title: 'Analytics Dashboard',
        href: '/auth/login',
        description: 'Gain insights with real-time performance metrics',
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    description: 'Learn more about our mission and team',
    links: [
      {
        title: 'About Us',
        href: '#about',
        description: 'Our story, mission, and values',
      },
      {
        title: 'Team',
        href: '#team',
        description: 'Meet the experts behind OpsFX',
      },
      {
        title: 'Careers',
        href: '#careers',
        description: 'Join our growing team of professionals',
      },
      {
        title: 'Contact',
        href: '#contact',
        description: 'Get in touch with us',
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none text-foreground group-hover:text-brand-red transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MegaMenu: React.FC = () => {
  return (
    <NavigationMenu className="max-w-full justify-center mx-auto">
      <NavigationMenuList className="px-2">
        {menuSections.map((section) => (
          <NavigationMenuItem key={section.id}>
            <NavigationMenuTrigger className="bg-white text-brand-black hover:text-brand-red data-[state=open]:text-brand-red">
              {section.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[500px] lg:w-[800px] py-6 px-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-brand-black mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm max-w-[400px]">{section.description}</p>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  {section.links.map((link) => (
                    <ListItem key={link.title} title={link.title} href={link.href}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;

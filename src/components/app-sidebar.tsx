'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  MessagesSquare, 
  FolderArchive, 
  CreditCard, 
  Settings, 
  LogOut 
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { SidebarContent } from '@/components/ui/sidebar'
import { Logo } from '@/components/ui/Logo'

const sidebarLinks = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    title: 'Projects',
    icon: FolderArchive,
    href: '/projects',
  },
  {
    title: 'Documents',
    icon: FileText,
    href: '/documents',
  },
  {
    title: 'Messages',
    icon: MessagesSquare,
    href: '/messages',
  },
  {
    title: 'Invoices',
    icon: CreditCard,
    href: '/invoices',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <SidebarContent className="border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 px-4"
        >
          <Logo size="small" className="flex-shrink-0" />
          <span className="text-lg font-semibold text-gray-900 group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
            Customer Portal
          </span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
                  {link.title}
                </span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-primary group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {user && (
        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
              <span className="text-sm font-medium text-gray-900">
                {user.email}
              </span>
              <span className="text-xs text-gray-600">
                Customer
              </span>
            </div>
          </div>
          
          <button
            onClick={() => signOut()}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 group-has-[[data-collapsible=icon]]/sidebar-wrapper:justify-center"
          >
            <LogOut className="h-4 w-4" />
            <span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
              Log out
            </span>
          </button>
        </div>
      )}
    </SidebarContent>
  )
}

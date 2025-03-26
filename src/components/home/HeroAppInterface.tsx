'use client';

import React from 'react';
import { BarChart, Bell, Files, Home, Layers, Menu, Search, Settings, Users } from 'lucide-react';

export function HeroAppInterface() {
  return (
    <div className="w-full h-full flex bg-white font-sans">
      {/* Sidebar */}
      <div className="w-16 md:w-56 h-full flex flex-col border-r border-gray-100 flex-shrink-0">
        <div className="h-14 border-b border-gray-100 flex items-center justify-center md:justify-start px-4">
          <div className="w-8 h-8 bg-brand-red rounded-md flex items-center justify-center">
            <div className="font-bold text-white">O</div>
          </div>
          <div className="hidden md:block font-medium text-lg ml-2 text-brand-black">OpsFX</div>
        </div>
        
        <div className="flex-1 py-4">
          <div className="space-y-1">
            {[
              { icon: <Home size={18} />, label: 'Dashboard' },
              { icon: <Users size={18} />, label: 'Teams' },
              { icon: <Files size={18} />, label: 'Documents' },
              { icon: <Layers size={18} />, label: 'Projects' },
              { icon: <BarChart size={18} />, label: 'Analytics' },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center py-2 px-3 mx-2 rounded-md ${index === 0 ? 'bg-gray-50 text-brand-black' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="hidden md:block ml-3 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="font-medium text-xs text-gray-700">AJ</div>
            </div>
            <div className="hidden md:block ml-2">
              <div className="text-sm font-medium text-gray-700">Adam Judeh</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
          <div className="flex items-center">
            <button className="md:hidden w-8 h-8 flex items-center justify-center text-gray-500 mr-2">
              <Menu size={18} />
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-56 md:w-72 h-9 pl-10 pr-4 rounded-md bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red/30 focus:border-brand-red/30"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-md">
              <Bell size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-md">
              <Settings size={18} />
            </button>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-brand-black">Welcome back, Adam</h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your projects today.</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Active Projects', 'Team Members', 'Tasks Completed'].map((stat, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-500">{stat}</div>
                <div className="text-2xl font-bold mt-1 text-brand-black">{12 + index * 8}</div>
                <div className="flex items-center mt-2">
                  <div className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">+{4 + index}%</div>
                  <div className="text-xs text-gray-500 ml-2">from last week</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Projects & Activities Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Projects */}
            <div className="lg:col-span-2 border border-gray-100 rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-medium text-brand-black">Recent Projects</h2>
                <button className="text-xs font-medium text-brand-red hover:text-brand-red/80">View All</button>
              </div>
              <div className="divide-y divide-gray-100">
                {['Website Redesign', 'Mobile App Development', 'Marketing Campaign', 'Product Launch'].map((project, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm text-brand-black">{project}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Last updated {index + 1} days ago</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                              <div className="text-xs font-medium text-gray-700">{String.fromCharCode(65 + i)}</div>
                            </div>
                          ))}
                        </div>
                        <div className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {index === 0 ? 'In Progress' : index === 1 ? 'Reviewing' : index === 2 ? 'Planning' : 'Completed'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Activity Feed */}
            <div className="border border-gray-100 rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="font-medium text-brand-black">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { user: 'Sara', action: 'added a new document' },
                  { user: 'Mark', action: 'completed task "Design Review"' },
                  { user: 'Alex', action: 'commented on Project X' },
                  { user: 'Taylor', action: 'updated the timeline' },
                  { user: 'Jamie', action: 'joined the team' },
                ].map((activity, index) => (
                  <div key={index} className="px-4 py-2.5 hover:bg-gray-50">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="text-xs font-medium text-gray-700">{activity.user.charAt(0)}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-brand-black">{activity.user}</span>{' '}
                          <span className="text-gray-500">{activity.action}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{index + 1}h ago</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  BarChart3, 
  Clock, 
  FileCheck, 
  FolderKanban, 
  TrendingUp, 
  TrendingDown,
  MessageSquare
} from 'lucide-react';

// Card component for stats
const StatCard = ({ 
  title, 
  value, 
  trend, 
  percentage, 
  icon: Icon 
}: { 
  title: string; 
  value: number | string; 
  trend: 'up' | 'down'; 
  percentage: number; 
  icon: React.ElementType 
}) => (
  <motion.div 
    className="rounded-xl bg-gray-900 border border-gray-800 p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-gray-800 rounded-md p-3">
        <Icon className="h-5 w-5 text-accent-primary" />
      </div>
      <div className="ml-5 w-0 flex-1">
        <p className="text-sm font-medium text-gray-400 truncate">
          {title}
        </p>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold text-white">
            {value}
          </p>
          <div
            className={`ml-2 flex items-baseline text-sm font-medium ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Project card component
const ProjectCard = ({ 
  project 
}: { 
  project: { 
    id: string; 
    name: string; 
    description: string; 
    progress: number; 
    tasks: { total: number; completed: number }; 
  } 
}) => (
  <motion.div 
    className="rounded-xl bg-gray-900 border border-gray-800 p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <h3 className="text-lg font-medium text-white truncate">{project.name}</h3>
    <p className="mt-1 text-sm text-gray-400 line-clamp-2">{project.description}</p>
    
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-400">Progress</span>
        <span className="text-xs font-medium text-white">{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div 
          className="bg-accent-primary h-2 rounded-full" 
          style={{ width: `${project.progress}%` }} 
        />
      </div>
    </div>
    
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center">
        <FileCheck className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-xs text-gray-400">
          {project.tasks.completed}/{project.tasks.total} tasks
        </span>
      </div>
      <button className="text-xs text-accent-primary hover:text-accent-hover transition-colors">
        View details
      </button>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: { count: 0, trend: 'up' as const, percentage: 12 },
    tasks: { count: 0, trend: 'down' as const, percentage: 5 },
    completed: { count: 0, trend: 'up' as const, percentage: 22 },
    timeSpent: { hours: 0, trend: 'up' as const, percentage: 8 },
    messages: { count: 0, trend: 'up' as const, percentage: 15 },
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setStats({
        projects: { count: 12, trend: 'up', percentage: 12 },
        tasks: { count: 42, trend: 'down', percentage: 5 },
        completed: { count: 18, trend: 'up', percentage: 22 },
        timeSpent: { hours: 164, trend: 'up', percentage: 8 },
        messages: { count: 8, trend: 'up', percentage: 15 },
      });

      // Mock projects data
      setRecentProjects([
        {
          id: '1',
          name: 'Website Redesign',
          description: 'Complete overhaul of the company website with new branding elements and improved user experience.',
          progress: 75,
          tasks: { total: 24, completed: 18 },
        },
        {
          id: '2',
          name: 'Mobile Application',
          description: 'Development of a cross-platform mobile application for customer engagement and loyalty program.',
          progress: 45,
          tasks: { total: 32, completed: 14 },
        },
        {
          id: '3',
          name: 'Marketing Campaign',
          description: 'Q2 integrated marketing campaign across digital and traditional channels.',
          progress: 30,
          tasks: { total: 18, completed: 5 },
        },
      ]);
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Welcome back, {user?.email?.split('@')[0] || 'User'}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          title="Total Projects" 
          value={stats.projects.count} 
          trend={stats.projects.trend} 
          percentage={stats.projects.percentage} 
          icon={FolderKanban} 
        />
        <StatCard 
          title="Active Tasks" 
          value={stats.tasks.count} 
          trend={stats.tasks.trend} 
          percentage={stats.tasks.percentage} 
          icon={BarChart3} 
        />
        <StatCard 
          title="Completed Tasks" 
          value={stats.completed.count} 
          trend={stats.completed.trend} 
          percentage={stats.completed.percentage} 
          icon={FileCheck} 
        />
        <StatCard 
          title="Time Logged" 
          value={`${stats.timeSpent.hours}h`} 
          trend={stats.timeSpent.trend} 
          percentage={stats.timeSpent.percentage} 
          icon={Clock} 
        />
        <StatCard 
          title="New Messages" 
          value={stats.messages.count} 
          trend={stats.messages.trend} 
          percentage={stats.messages.percentage} 
          icon={MessageSquare} 
        />
      </div>

      {/* Recent Projects */}
      <h2 className="mt-8 text-xl font-semibold text-white">Recent Projects</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Activity Feed */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <div className="mt-4 rounded-xl bg-gray-900 border border-gray-800 p-6 shadow-lg">
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
              >
                <div className="flex-shrink-0 rounded-full h-10 w-10 bg-gray-800 flex items-center justify-center">
                  <span className="text-accent-primary text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    Task updated: <span className="text-accent-primary">Website design review</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {i === 1 
                      ? 'Updated task status to "In Progress"' 
                      : i === 2 
                        ? 'Added a new comment to the task' 
                        : 'Uploaded a new document for review'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {i === 1 ? '10 minutes ago' : i === 2 ? '2 hours ago' : 'Yesterday'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

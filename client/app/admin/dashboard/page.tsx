'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/userContext';
import { useProjectContext } from '@/context/projectContext';
import type { Project, User } from '@/types';
import { FiPieChart, FiUsers, FiCalendar, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

interface AdminDashboardProps {
  user: User | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  getProjectStats: () => Promise<{
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    overdueTasks: number;
    teamStats: Record<string, {
      assignedTasks: number;
      completedTasks: number;
      pendingTasks: number;
    }>;
  }>;
}

export default function AdminDashboard() {
  const { user } = useAuthContext();
  const { projects, loading, error, getProjectStats } = useProjectContext();
  const [stats, setStats] = useState<{
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    overdueTasks: number;
    teamStats: Record<string, {
      assignedTasks: number;
      completedTasks: number;
      pendingTasks: number;
    }>;
  } | null>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      getProjectStats().then((data: {
        totalProjects: number;
        activeProjects: number;
        completedProjects: number;
        overdueTasks: number;
        teamStats: Record<string, {
          assignedTasks: number;
          completedTasks: number;
          pendingTasks: number;
        }>;
      }) => setStats(data));
    }
  }, [user, getProjectStats]);

  if (!user || user?.role !== 'admin') {
    return <div>You do not have permission to access this page</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Projects"
            value={stats?.totalProjects || 0}
            icon={<FiPieChart className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            label="Active Projects"
            value={stats?.activeProjects || 0}
            icon={<FiCalendar className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            label="Completed Projects"
            value={stats?.completedProjects || 0}
            icon={<FiCheckCircle className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            label="Overdue Tasks"
            value={stats?.overdueTasks || 0}
            icon={<FiClock className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard
            label="Total Users"
            value={projects.reduce((acc: number, p: Project) => acc + p.teamMembers.length, 0)}
            icon={<FiUsers className="w-6 h-6" />}
            color="pink"
          />
          <StatCard
            label="Active Users"
            value={projects.filter((p: Project) => p.status === 'active').reduce((acc: number, p: Project) => acc + p.teamMembers.length, 0)}
            icon={<FiUsers className="w-6 h-6" />}
            color="teal"
          />
        </div>

        {/* Projects Table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Active Projects
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Team Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {projects
                    .filter((p: Project) => p.status === 'active')
                    .map((project: Project) => (
                      <tr key={project._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {project.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {project.description?.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {project.teamMembers.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(project.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
    <div className="p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-full p-3 bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400`}>{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
              {label}
            </dt>
            <dd className="text-3xl font-semibold text-gray-900 dark:text-white">
              {value}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

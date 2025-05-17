'use client';

import { useAuthContext } from '@/context/userContext';
import { useProjectContext } from '@/context/projectContext';
import { Project } from '@/types';
import { FiPlus, FiSearch, FiFilter, FiCalendar, FiUsers, FiPieChart } from 'react-icons/fi';
import { Button, Input, Select, Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const { projects, selectedProject, setSelectedProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          {user?.role === 'admin' && (
            <Link href="/projects/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </Link>
          )}
        </div>

        <div className="flex space-x-4 mb-6">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftElement={<FiSearch />}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </Select>
          <Select
            placeholder="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              isSelected={selectedProject?._id === project._id}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}

const ProjectCard = ({ project, isSelected, onSelect }: {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div
    className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden cursor-pointer ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
    onClick={onSelect}
  >
    <div className="p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'active' ? 'bg-green-100 text-green-800' :
            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {project.description?.substring(0, 100)}...
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FiCalendar className="mr-2" />
          <span>{new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FiUsers className="mr-2" />
          <span>{project.teamMembers.length} members</span>
        </div>
      </div>
    </div>
  </div>
);

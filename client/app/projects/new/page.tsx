'use client';

import { useAuthContext } from '@/context/userContext';
import { useProjectContext } from '@/context/projectContext';
import { Project } from '@/types';
import { FiCalendar, FiUsers, FiStar, FiCheck, FiX } from 'react-icons/fi';
import { Button, Input, Select, Textarea, Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProjectPage() {
  const { user } = useAuthContext();
  const { createProject } = useProjectContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createProject({
        ...formData,
        manager: user?._id || '',
        teamMembers: [user?._id || ''],
        tasks: [],
      });
      router.push('/projects');
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div>You do not have permission to access this page</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Create New Project
        </h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 text-red-700 dark:text-red-300 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Name
            </label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <div className="mt-1">
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <div className="mt-1">
                <Select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <div className="mt-1">
                <Select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <div className="mt-1">
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <div className="mt-1">
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              leftIcon={<FiCheck />}
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

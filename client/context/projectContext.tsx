'use client';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { Project, DashboardStats, ProjectContextType } from '@/types';
import config from '@/utils/config';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Project[]>(
        `${config.api.baseUrl}${config.api.endpoints.projects.base}`
      );
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: Partial<Project>) => {
    try {
      setLoading(true);
      const { data: projectData } = await axios.post<Project>(
        `${config.api.baseUrl}${config.api.endpoints.projects.base}`,
        data
      );
      setProjects([...projects, projectData]);
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      setLoading(true);
      const { data: projectData } = await axios.put<Project>(
        `${config.api.baseUrl}${config.api.endpoints.projects.byId(id)}`,
        data
      );
      setProjects(projects.map(project => 
        project._id === id ? projectData : project
      ));
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(
        `${config.api.baseUrl}${config.api.endpoints.projects.byId(id)}`
      );
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      setError('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const assignUserToProject = async (projectId: string, userId: string) => {
    try {
      setLoading(true);
      await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.projects.base}/${projectId}/assign`,
        { userId }
      );
      fetchProjects();
    } catch (err) {
      console.error('Failed to assign user to project:', err);
      setError('Failed to assign user to project');
    } finally {
      setLoading(false);
    }
  };

  const removeUserFromProject = async (projectId: string, userId: string) => {
    try {
      setLoading(true);
      await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.projects.base}/${projectId}/remove`,
        { userId }
      );
      fetchProjects();
    } catch (err) {
      console.error('Failed to remove user from project:', err);
      setError('Failed to remove user from project');
      setError('Failed to remove user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProjectStats = async (): Promise<DashboardStats> => {
    try {
      setLoading(true);
      const { data } = await axios.get<DashboardStats>(
        `${config.api.baseUrl}${config.api.endpoints.projects.stats}`
      );
      return data;
    } catch (err) {
      console.error('Failed to fetch project stats:', err);
      setError('Failed to fetch project stats');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        loading,
        error,
        createProject,
        updateProject,
        deleteProject,
        assignUserToProject,
        removeUserFromProject,
        getProjectStats,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

export { ProjectContext };

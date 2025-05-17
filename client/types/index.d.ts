// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  photo?: string;
  tasks?: Array<string>;
  activeTasks?: Array<string>;
  completedTasks?: Array<string>;
}

export interface UserState {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
}

// Project Types
export interface Project {
  _id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  startDate: string;
  endDate?: string;
  priority: 'low' | 'medium' | 'high';
  teamMembers: string[];
  manager: string;
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

// Task Types
export interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  dueDate?: string;
  userId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

// Export types for use in other files
export {
  User,
  UserState,
  Project,
  Task,
  Admin,
  DashboardStats,
  ProjectContextType,
  UserContextType,
  UserContextValue,
  TasksContextType
};

// Admin Types
export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: {
    canCreateProjects: boolean;
    canAssignTasks: boolean;
    canManageUsers: boolean;
    canViewReports: boolean;
  };
}

// Dashboard Stats
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueTasks: number;
  teamStats: {
    [userId: string]: {
      assignedTasks: number;
      completedTasks: number;
      pendingTasks: number;
    };
  };
}

// Project Management Context Types
export interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  assignUserToProject: (projectId: string, userId: string) => Promise<void>;
  removeUserFromProject: (projectId: string, userId: string) => Promise<void>;
  getProjectStats: () => Promise<DashboardStats>;
}

// Context Types
export interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (data: { name: string; email: string; password: string }) => Promise<void>;
  loginUser: (data: { email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  checkUserLoggedIn: () => Promise<void>;
  updateUserProfile: (data: { name?: string; avatar?: string }) => Promise<void>;
  updatePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  githubLogin: () => Promise<void>;
  githubLogout: () => Promise<void>;
}

export type UserContextValue = UserContextType;

export interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  task: Partial<Task>;
  isEditing: boolean;
  priority: string;
  activeTask: Task | null;
  modalMode: string;
  profileModal: boolean;
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  openProfileModal: () => void;
  closeModal: () => void;
  getTasks: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setPriority: (priority: string) => void;
  // Add other task context methods as needed
}

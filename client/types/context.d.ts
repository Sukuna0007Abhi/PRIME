import { User, UserState, UserContextType, TasksContextType } from './index';

declare global {
  // Extend the Window interface to include any global browser APIs
  interface Window {
    // Add any global browser APIs you're using
  }
}

declare module '@/context/userContext' {
  // Export the context value type
  export interface UserContextValue {
    user: User | null;
    userState: UserState;
    loading: boolean;
    registerUser: (e: React.FormEvent) => Promise<void>;
    loginUser: (e: React.FormEvent) => Promise<void>;
    logoutUser: () => Promise<void>;
    handlerUserInput: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    // Add other methods from your context
  }

  // Export the context
  export const UserContext: React.Context<UserContextValue>;
  
  // Export the provider component
  export const UserContextProvider: React.FC<{ children: React.ReactNode }>;
  
  // Export the hook
  export const useAuthContext: () => UserContextValue;
}

declare module '@/context/taskContext' {
  // Export the context value type
  export interface Task {
    _id: string;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'completed' | 'overdue';
    dueDate?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface TasksContextValue {
    tasks: Task[];
    loading: boolean;
    task: Task | null;
    isEditing: boolean;
    priority: string;
    activeTasks: Task[];
    completedTasks: Task[];
    overdueTasks: Task[];
    openModalForAdd: () => void;
    openModalForEdit: (task: Task) => void;
    closeModal: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    toggleTaskStatus: (taskId: string, currentStatus: Task['status']) => Promise<void>;
    fetchTasks: () => Promise<void>;
    fetchActiveTasks: () => Promise<void>;
    fetchCompletedTasks: () => Promise<void>;
    fetchOverdueTasks: () => Promise<void>;
    searchTasks: (query: string) => Promise<void>;
    setPriority: (priority: string) => void;
    modalMode: string;
    profileModal: boolean;
    openModalForAdd: () => void;
    openModalForEdit: (task: any) => void; // You might want to replace 'any' with a proper type
    openProfileModal: () => void;
    closeModal: () => void;
    getTasks: () => Promise<void>;
    createTask: (taskData: any) => Promise<void>; // You might want to replace 'any' with a proper type
    updateTask: (id: string, taskData: any) => Promise<void>; // You might want to replace 'any' with a proper type
    deleteTask: (id: string) => Promise<void>;
    setPriority: (priority: string) => void;
  }

  // Export the context
  export const TasksContext: React.Context<TasksContextValue>;
  
  // Export the provider component
  export const TasksProvider: React.FC<{ children: React.ReactNode }>;
  
  // Export the hook
  export const useTasks: () => TasksContextValue;
}

// This file is a module and has no exports
export {};

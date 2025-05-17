import { Task } from '.';

declare module '@/context/taskContext' {
  // Export the context value type
  export interface TasksContextValue {
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

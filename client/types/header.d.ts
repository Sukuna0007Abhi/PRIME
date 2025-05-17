import { Task } from './index';

declare module '@/app/Components/Header/Header' {
  interface HeaderProps {
    // Any additional props if needed
  }
}

declare module '@/context/taskContext' {
  interface TasksContextType {
    openModalForAdd: () => void;
    activeTasks: Task[];
    // Add other task-related methods and properties as needed
  }
}

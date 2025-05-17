// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  // Add other user properties as needed
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  name: string;
  email: string;
  password: string;
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
  createdAt: string;
  updatedAt: string;
}

// Re-export types from other files
export * from './user';
export * from './tasks';

import { User, UserState } from './types';

declare global {
  // Extend the Window interface if needed
  interface Window {
    // Add any global browser APIs you're using
  }
}

declare module '@/context/userContext' {
  // Export the context value type
  export interface UserContextValue {
    user: User | null;
    loading: boolean;
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
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

  // Export the context
  export const UserContext: React.Context<UserContextValue>;
  
  // Export the provider component
  export const UserProvider: React.FC<{ children: React.ReactNode }>;
  
  // Export the hook
  export const useAuthContext: () => UserContextValue;
}

// This file is a module and has no exports
export {};

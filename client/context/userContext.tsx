'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useContext, createContext, useCallback } from 'react';
import toast from 'react-hot-toast';
import config, { ApiEndpoints } from '@/utils/config';
import type { User, UserState } from '@/types';

// Set axios defaults
axios.defaults.withCredentials = true;

// Types
interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  registerUser: (data: { name: string; email: string; password: string }) => Promise<void>;
  loginUser: (data: { email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  checkUserLoggedIn: () => Promise<void>;
  updateUserProfile: (data: { name?: string; avatar?: string }) => Promise<void>;
  updatePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  resetPassword: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  githubLogin: () => Promise<void>;
  githubLogout: () => Promise<void>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Export hook
const useAuthContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const serverUrl = config.api.baseUrl;
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState>(() => ({
    name: '',
    email: '',
    password: '',
    role: 'user' as const,
  }));

  // Check if user is logged in on mount
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{ success: boolean; user: User }>(
        `${serverUrl}${config.api.endpoints.auth.me}`
      );
      
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  const registerUser = async (data: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      const { data: res } = await axios.post<AuthResponse>(
        `${serverUrl}${config.api.endpoints.auth.register}`,
        data
      );

      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('token', res.token);
        toast.success('Registration successful!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data: res } = await axios.post<AuthResponse>(
        `${serverUrl}${config.api.endpoints.auth.login}`,
        data
      );

      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('token', res.token);
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.logout}`);
      setUser(null);
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: { name?: string; avatar?: string }) => {
    try {
      setLoading(true);
      const { data: res } = await axios.put<{ success: boolean; user: User }>(
        `${serverUrl}${config.api.endpoints.user.profile}`,
        data
      );

      if (res.success && res.user) {
        setUser(res.user);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      setLoading(true);
      await axios.put(
        `${serverUrl}${config.api.endpoints.user.password}`,
        data
      );
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Update password error:', error);
      toast.error('Failed to update password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.forgotPassword}`, { email });
      toast.success('Password reset link sent to your email');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Failed to send password reset email');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string) => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.resetPassword}`, { token });
      toast.success('Password reset successfully');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.verifyEmail}`, { token });
      toast.success('Email verified successfully');
    } catch (error) {
      console.error('Verify email error:', error);
      toast.error('Failed to verify email');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.resendVerification}`);
      toast.success('Verification email sent');
    } catch (error) {
      console.error('Resend verification email error:', error);
      toast.error('Failed to send verification email');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{ success: boolean; user: User; token: string }>(
        `${serverUrl}${config.api.endpoints.auth.github}`
      );

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('GitHub login successful!');
        router.push('/');
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      toast.error('GitHub login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const githubLogout = async () => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}${config.api.endpoints.auth.logout}`);
      setUser(null);
      localStorage.removeItem('token');
      toast.success('GitHub logout successful');
      router.push('/login');
    } catch (error) {
      console.error('GitHub logout error:', error);
      toast.error('GitHub logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubCallback = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        await githubLogin();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('GitHub callback error:', error);
      toast.error('GitHub callback failed');
      router.push('/login');
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/auth/github/callback') {
      handleGitHubCallback();
    }
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        userState,
        setUserState,
        registerUser,
        loginUser,
        logoutUser,
        checkUserLoggedIn,
        updateUserProfile,
        updatePassword,
        resetPassword,
        forgotPassword,
        verifyEmail,
        resendVerificationEmail,
        githubLogin,
        githubLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


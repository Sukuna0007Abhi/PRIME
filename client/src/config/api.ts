export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://taskfyer.onrender.com',
  endpoints: {
    auth: {
      login: '/api/v1/login',
      register: '/api/v1/register',
      logout: '/api/v1/logout',
      me: '/api/v1/me',
    },
    tasks: {
      base: '/api/v1/tasks',
      byId: (id: string) => `/api/v1/tasks/${id}`,
    },
    users: {
      base: '/api/v1/users',
      byId: (id: string) => `/api/v1/users/${id}`,
    },
  },
} as const;

export const getFullUrl = (path: string): string => {
  return `${API_CONFIG.baseUrl}${path}`;
};

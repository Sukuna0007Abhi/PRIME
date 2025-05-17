// Environment variables with type safety

const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        me: '/auth/me',
        github: '/auth/github',
        githubCallback: '/auth/github/callback',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        verifyEmail: '/auth/verify-email',
        resendVerification: '/auth/resend-verification'
      },
      user: {
        profile: '/users/profile',
        password: '/users/password',
        avatar: '/users/avatar'
      },
      tasks: {
        base: '/tasks',
        byId: (id: string) => `/tasks/${id}`,
      },
      users: {
        base: '/users',
        byId: (id: string) => `/users/${id}`,
      },
      projects: {
        base: '/projects',
        byId: (id: string) => `/projects/${id}`,
        stats: '/projects/stats',
      },
    },
  },
} as const;

export type ApiEndpoints = typeof config.api.endpoints;
export default config;

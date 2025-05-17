# Task Management App

A modern task management application built with Next.js, React, and Tailwind CSS.

## Features

- User authentication (login/register)
- Create, read, update, and delete tasks
- Filter tasks by priority
- Responsive design
- TypeScript support
- Context API for state management

## Prerequisites

- Node.js 16.14.0 or later
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the environment variables as needed
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

- `/app` - Next.js 13+ app directory with page routing
- `/components` - Reusable UI components
- `/context` - React context providers and hooks
- `/public` - Static assets
- `/types` - TypeScript type definitions
- `/utils` - Utility functions and configuration

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Axios](https://axios-http.com/) - HTTP client
- [React Hot Toast](https://react-hot-toast.com/) - Notifications
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

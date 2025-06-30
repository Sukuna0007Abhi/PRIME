# 🚀 PRIME - Project Management Application
//Dayummm
[![PRIME](https://img.shields.io/badge/PRIME-Project%20Management-blueviolet)](https://github.com/yourusername/prime)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

PRIME is a modern, full-stack project management application designed to help teams collaborate and manage their projects efficiently. Built with a robust tech stack, PRIME offers real-time task management, user authentication, and an intuitive user interface.

## ✨ Features

- **User Authentication**
  - Email/Password registration and login
  - GitHub OAuth integration
  - JWT-based authentication
  - Password reset functionality
  - Email verification

- **Task Management**
  - Create, read, update, and delete tasks
  - Drag-and-drop task status updates
  - Task prioritization (Low, Medium, High)
  - Due date tracking
  - Task filtering and searching

- **Project Organization**
  - Create and manage multiple projects
  - Assign tasks to team members
  - Track project progress
  - Team collaboration

- **User Experience**
  - Responsive design for all devices
  - Dark/Light theme support
  - Real-time updates
  - Intuitive UI/UX

## 🛠 Tech Stack

- **Frontend**
  - Next.js 13+ (App Router)
  - TypeScript
  - React Context API (State Management)
  - Tailwind CSS (Styling)
  - React Hook Form (Form Handling)
  - Framer Motion (Animations)

- **Backend**
  - Node.js with Express
  - MongoDB with Mongoose
  - JWT Authentication
  - Nodemailer (Email Services)
  - Socket.io (Real-time updates)

- **Development Tools**
  - ESLint & Prettier (Code Quality)
  - TypeScript (Type Checking)
  - Husky (Git Hooks)
  - Jest & React Testing Library (Testing)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prime.git
   cd prime
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     # Server Configuration
     PORT=8000
     NODE_ENV=development
     
     # MongoDB
     MONGO_URI=your_mongodb_connection_string
     
     # JWT
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRE=30d
     
     # Frontend URL
     FRONTEND_URL=http://localhost:3000
     
     # Email Configuration (for password reset, etc.)
     SMTP_HOST=your_smtp_host
     SMTP_PORT=587
     SMTP_EMAIL=your_email@example.com
     SMTP_PASSWORD=your_email_password
     
     # GitHub OAuth (optional)
     GITHUB_CLIENT_ID=your_github_client_id
     GITHUB_CLIENT_SECRET=your_github_client_secret
     GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback
     ```

4. **Start the application**
   ```bash
   # Start the backend server
   cd backend
   npm run dev
   
   # In a new terminal, start the frontend
   cd ../client
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to access the application.

## 📚 API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

- **Your Name** - [@Sukuna0007Abhi](https://github.com/Sukuna0007Abhi)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📧 Contact

Your Name - appsonly310@gmail.com

Project Link: [https://github.com/Sukuna0007Abhi/prime](https://github.com/Sukuna0007Abhi/prime)

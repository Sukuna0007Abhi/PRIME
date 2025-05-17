"use client";
import { useTheme } from "@/context/ThemeContext";
import { useAuthContext } from "@/context/userContext";
import type { User } from "@/types";
import { github, moon, sun } from "@/utils/Icons";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

function Header() {
  const { user, logoutUser } = useAuthContext();
  const isAuthenticated = !!user?._id;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Get theme context
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  // Handle click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Extract user data with defaults
  const userData = user as User | null;
  const { name = 'Guest', email = '', avatar } = userData || {};
  const userId = userData?._id;
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsProfileOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9] dark:bg-gray-800 dark:text-white transition-colors duration-200">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {isAuthenticated ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className="text-sm">
          {isAuthenticated ? "Welcome back!" : "Please login or register to view your tasks"}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-6">
        <button
          className="px-6 py-2.5 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out text-sm sm:text-base"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/tasks");
            } else {
              router.push("/login");
            }
          }}
        >
          {isAuthenticated ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-3 items-center">
          <button
            onClick={toggleDarkMode}
            className="h-9 w-9 md:h-10 md:w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? sun : moon}
          </button>
          
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 md:h-10 md:w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="View project on GitHub"
          >
            {github}
          </Link>
          
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#3aafae] transition-colors flex items-center justify-center bg-gray-200 dark:bg-gray-700"
              aria-label="User menu"
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <FiLogOut className="text-base"/>
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-100 dark:border-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

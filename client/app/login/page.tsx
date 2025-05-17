"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useAuthContext } from "@/context/userContext";

/**
 * Login page component
 * Handles redirection if user is already logged in
 */
const LoginPage: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page if user is already logged in
    if (user?._id) {
      router.push("/");
    }
  }, [user, router]);

  // Show nothing or a loading spinner while redirecting
  if (user?._id) {
    return null;
  }

  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

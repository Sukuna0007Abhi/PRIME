"use client";
import React, { useState, useCallback } from "react";
import { useAuthContext } from "@/context/userContext";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * LoginForm component for user authentication
 */
const LoginForm: React.FC = () => {
  const router = useRouter();
  const { loginUser } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative m-[2rem] px-6 sm:px-10 py-10 sm:py-14 rounded-lg bg-white w-full max-w-[520px] shadow-lg"
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h1>
        <p className="mb-8 px-2 sm:px-8 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-[#2ECC71] hover:text-[#25a55f] transition-colors duration-200"
          >
            Sign up
          </a>
        </p>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-sm font-medium text-[#2ECC71] hover:text-[#25a55f]"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-[#2ECC71] sm:text-sm"
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2ECC71] hover:bg-[#25a55f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ECC71] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        {error && (
          <div className="mt-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <img src="/flurry.png" alt="" />
    </form>
  );
};

export default LoginForm;

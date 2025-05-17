"use client";
import { useAuthContext } from "@/context/userContext";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const { registerUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Create an account. Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
          >
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#999]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            name="name"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="John Doe"
          />
        </div>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.password}
            className="w-full px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Register Now'}
          </button>
          
          {error && (
            <div className="mt-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
      <img src="/flurry.png" alt="" />
    </form>
  );
}

export default RegisterForm;

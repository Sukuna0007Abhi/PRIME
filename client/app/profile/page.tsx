"use client";

import { useAuthContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiX } from "react-icons/fi";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuthContext();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user?._id) {
      router.push("/login");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserProfile({
        name: formData.name,
      });
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?._id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-[#3aafae] to-[#00A1F1] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-white/90">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md flex items-center gap-2 transition-colors"
              >
                {isEditing ? (
                  <>
                    <FiX size={16} /> Cancel
                  </>
                ) : (
                  <>
                    <FiEdit2 size={16} /> Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-[#3aafae] focus:border-[#3aafae]' 
                          : 'border-transparent bg-gray-50 dark:bg-gray-700'
                      } rounded-md shadow-sm`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-[#3aafae] focus:border-[#3aafae]' 
                          : 'border-transparent bg-gray-50 dark:bg-gray-700'
                      } rounded-md shadow-sm`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member Since
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={new Date(user.createdAt || new Date()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      disabled
                      className="block w-full pl-10 pr-3 py-2 border border-transparent bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm text-gray-500 dark:text-gray-400"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3aafae] hover:bg-[#2e8d8c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3aafae] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        'Saving...'
                      ) : (
                        <>
                          <FiSave className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

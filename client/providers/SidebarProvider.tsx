"use client";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import { useAuthContext } from "@/context/userContext";
import React from "react";

function SidebarProvider() {
  const userId = useAuthContext().user._id;
  return <>{userId && <Sidebar />}</>;
}

export default SidebarProvider;

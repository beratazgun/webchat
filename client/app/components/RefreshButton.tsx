"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FcRefresh } from "@react-icons/all-files/fc/FcRefresh";

const RefreshButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.refresh();
      }}
    >
      <FcRefresh className="w-6 h-6" />
    </button>
  );
};

export default RefreshButton;

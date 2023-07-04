"use client";
import React, { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <input
      onChange={(e) => handleChange(e)}
      type="text"
      className="w-full bg-[#1f2937] outline-none px-4 py-2 rounded-lg"
      placeholder="Type a message..."
    />
  );
};

export default ChatInput;

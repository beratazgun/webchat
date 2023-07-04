"use client";
import React from "react";
// import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'
import { IconType } from "@react-icons/all-files";

interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disable?: boolean;
  actionLabel?: string;
  style?: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  actionLabel,
  onClick,
  isLoading,
  style,
  disable,
  icon: Icon,
}) => {
  return (
    <button
      className={`flex justify-center items-center bg-orange-600 py-3 rounded-xl outline-none text-center text-white text-lg hover:bg-violet-600 ${style}`}
      onClick={onClick}
      disabled={disable}
    >
      {isLoading ? (
        <div
          className={`flex flex-row justify-center items-center 
					${actionLabel ? "gap-2" : ""}
					${style}`}
        >
          {actionLabel ? actionLabel : ""}
        </div>
      ) : (
        <div
          className={`flex flex-row justify-center items-center 
					${Icon ? "gap-2" : ""}
					${style}`}
        >
          {Icon && <Icon className="text-2xl text-white text-center" />}
          {label}
        </div>
      )}
    </button>
  );
};

export default Button;

import React from "react";
import { motion } from "framer-motion";

function Button({
  children,
  size = "medium",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-transparent text-[#57aee8] border border-[#57aee8] hover:border-[#4a9cd6]",
    outline:
      "bg-transparent font-semibold rounded-lg text-red-400 border border-[#57aee8] hover:bg-[#57aee8] hover:text-[#57aee8]",
    secondary:
      "bg-gray-600 text-white border border-gray-600 font-semibold rounded-xl hover:bg-gray-700 hover:border-gray-700",
  };

  const baseClasses = `
  
    focus:outline-none focus:ring-2 focus:ring-[#57aee8] focus:ring-opacity-50
    disabled:opacity-60 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
   <motion.button
  whileHover={{
    scale: disabled ? 0.95 : 0.90,
    y: disabled ? 0 : -2,
    transition: { duration: 0.1 },
  }}
  whileTap={{
    scale: disabled ? 0.95 : 1,
    transition: { duration: 0.3 },
  }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: [0, -15, 0, -7, 0] }}   // bounce twice
  transition={{
    duration: 1.5,
    ease: "easeOut",
    delay: 0.1,
    times: [0, 0.6, 0.9, 1.5, 1],   // controls timing of each bounce
  }}
  className={baseClasses}
  onClick={disabled ? undefined : onClick}
  disabled={disabled}
>
  {children}
</motion.button>

  );
}

export default Button;

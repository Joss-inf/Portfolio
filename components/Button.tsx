import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary';
}

export const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', children, className = '', variant = 'primary' }) => {
  const baseClasses = "font-bold text-lg py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg active:scale-95";
  
  const variantClasses = {
    primary: "bg-ios-primary text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

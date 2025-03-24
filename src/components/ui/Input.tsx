'use client';

import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      variant = 'outlined',
      className = '',
      ...props
    },
    ref
  ) => {
    // Determine various classes based on props
    const containerClasses = `
      relative ${fullWidth ? 'w-full' : ''} ${className}
    `;

    const labelClasses = `
      block text-sm font-medium text-gray-300 mb-1
      ${error ? 'text-status-error' : ''}
    `;

    const variantClasses = {
      outlined: 'bg-transparent border border-gray-700 focus:border-accent-primary',
      filled: 'bg-gray-900 border border-gray-800 focus:bg-gray-800 focus:border-accent-primary',
    };

    const inputClasses = `
      block px-4 py-2 w-full
      text-white placeholder-gray-500
      rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-30
      disabled:opacity-60 disabled:cursor-not-allowed
      ${variantClasses[variant]}
      ${error ? 'border-status-error focus:border-status-error focus:ring-status-error' : ''}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
    `;

    const helperTextClasses = `
      mt-1 text-sm 
      ${error ? 'text-status-error' : 'text-gray-500'}
    `;

    return (
      <div className={containerClasses}>
        {label && <label className={labelClasses}>{label}</label>}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input ref={ref} className={inputClasses} {...props} />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={helperTextClasses}>{error || helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

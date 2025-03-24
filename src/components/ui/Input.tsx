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
      block text-sm font-medium text-gray-600 mb-1
      ${error ? 'text-brand-red' : ''}
    `;

    const variantClasses = {
      outlined: 'bg-white border border-gray-300 focus:border-brand-red',
      filled: 'bg-brand-grey border border-gray-300 focus:bg-white focus:border-brand-red',
    };

    const inputClasses = `
      block px-4 py-2 w-full
      text-brand-black placeholder-gray-500
      rounded-md
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-opacity-30
      disabled:opacity-60 disabled:cursor-not-allowed
      ${variantClasses[variant]}
      ${error ? 'border-brand-red focus:border-brand-red focus:ring-brand-red' : ''}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
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
        
        {error && (
          <p className="mt-1 text-sm text-brand-red">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

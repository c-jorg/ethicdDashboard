'use client';

import React from 'react';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/utils/auth';

type SignOutButtonProps = {
  loading: boolean;  // The loading state to disable the button
  title?: string;  // Optional title for the button (default "Sign Out")
  size?: string;  // Optional size for the button (default 'w-12 h-12')
};

const SignOutButton: React.FC<SignOutButtonProps> = ({
  loading,
  title = 'Sign Out',  // Default title is "Sign Out"
  size = 'w-12 h-12',  // Default size is 'w-12 h-12'
}) => {
  return (
    <button
      onClick={signOut}  // Handle the sign out logic
      className={`flex items-center justify-center rounded-md text-white hover:bg-white hover:text-blue-500 transition-colors ${size}`}
      disabled={loading}  // Disable button while loading
      title={title}
    >
      <ArrowRightStartOnRectangleIcon className="w-8 h-8 md:w-12 md:h-12" />
    </button>
  );
};

export default SignOutButton;

'use client';  // This is a client-side component

import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type ProfileButtonProps = {
  size?: string;  // Optional size prop to control button size
  title?: string;  // Optional title prop for the button
  link: string;  // URL to navigate when the button is clicked
};

const ProfileButton: React.FC<ProfileButtonProps> = ({
  size = 'w-12 h-12',  // Default size
  title = 'Profile',
  link,
}) => {
  return (
    <Link href={link}>
      <button
        className={`flex items-center justify-center rounded-md text-white hover:bg-white hover:text-blue-500 transition-colors ${size}`}
        title={title}
      >
        <UserCircleIcon className="w-8 h-8 md:w-12 md:h-12" />
      </button>
    </Link>
  );
};

export default ProfileButton;

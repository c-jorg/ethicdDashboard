'use client';  // This is a client-side component

import React from 'react';
import { PresentationChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type DashboardButtonProps = {
  size?: string;  // Optional size prop to control button size
  title?: string;  // Optional title prop for the button
  link: string;  // URL to navigate when the button is clicked
};

const DashboardButton: React.FC<DashboardButtonProps> = ({
  size = 'w-12 h-12',  // Default size
  title = 'Dashboard',
  link,
}) => {
  return (
    <Link href={link}>
      <button
        className={`flex items-center justify-center rounded-md text-white hover:bg-white hover:text-blue-500 transition-colors ${size}`}
        title={title}
      >
        <PresentationChartBarIcon className="w-8 h-8 md:w-12 md:h-12" />
      </button>
    </Link>
  );
};

export default DashboardButton;

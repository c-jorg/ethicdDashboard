'use client';

import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type AssignmentsButtonProps = {
  size?: string;  // Optional size prop to control button size (default 'w-12 h-12')
  title?: string;  // Optional title for the button
  link: string;  // URL to navigate to when clicked
};

const AssignmentsButton: React.FC<AssignmentsButtonProps> = ({
  size = 'w-12 h-12',  // Default size is 'w-12 h-12'
  title = 'Assignments',  // Default title is 'Assignments'
  link,  // Link passed via prop
}) => {
  return (
    <Link href={link}>
      <button
        className={`flex items-center justify-center rounded-md text-white hover:bg-white hover:text-blue-500 transition-colors ${size}`}
        title={title}
      >
        <PencilSquareIcon className="w-8 h-8 md:w-12 md:h-12" />
      </button>
    </Link>
  );
};

export default AssignmentsButton;

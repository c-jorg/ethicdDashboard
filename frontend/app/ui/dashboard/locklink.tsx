'use client';

import { LockClosedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

interface LockLinkProps {
  href: string;
  name: string;
  isLocked?: boolean;
  isActive: boolean;
  tooltip?: string; // Prop for the custom tooltip
}

export default function LockLink({ href, name, isLocked = false, isActive, tooltip = 'This section is locked' }: LockLinkProps) {
  return (
    <div className="relative group">
      {isLocked ? (
        <div
          className="flex h-[40px] items-center gap-2 rounded-md p-2 text-md font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
        >
          <LockClosedIcon className="w-4 h-4 text-gray-500" />
          <p>{name}</p>
          {/* Tooltip */}
          <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-md hidden group-hover:block">
            {tooltip}
          </div>
        </div>
      ) : (
        <Link
          href={href}
          className={clsx(
            'flex h-[40px] items-center gap-2 rounded-md p-2 text-md font-medium hover:bg-sky-100 hover:text-blue-600',
            {
              'bg-sky-100 text-blue-600': isActive,
            }
          )}
        >
          <p>{name}</p>
        </Link>
      )}
    </div>
  );
}

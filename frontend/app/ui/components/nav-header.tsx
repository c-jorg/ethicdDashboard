'use client';
import AcmeLogo from '@/app/ui/acme-logo';
import { useState } from 'react';
import NavLinks from '@/app/ui/components/nav-links';
import ProfileButton from '@/app/ui/components/profile-button';
import DashboardButton from '@/app/ui/components/dashboard-button';
import AssignmentsButton from './assignment-button';
import SignOutButton from './signout-button';
import ClassesButton from './classes-button';
import { usePathname } from 'next/navigation';
import MoralMeter from './moral-meter';

export default function HeaderNav() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-20 items-center justify-between bg-blue-500 px-6">

      {/* Logo and Hamburger Menu for Case Study */}
      <div className="flex items-center gap-6">
        {/* Conditionally render NavLinks only if 'dashboard' is in the URL */}
        {pathname && pathname.includes('dashboard') && <NavLinks />}

        <div className="px-3 py-4 md:block hidden">
          <AcmeLogo />
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="flex items-center gap-2 md:gap-6">
        {pathname && pathname.includes('dashboard/') && (
          <div className="hidden md:block">
            <MoralMeter width={96} height={48} />
          </div>
        )}

        <ProfileButton link="/profile" />

        {pathname && pathname.includes('dashboard') && <DashboardButton link="/dashboard" />}

        <AssignmentsButton link="/assignments" />

        <ClassesButton link="/classes" />        

        <SignOutButton loading={loading} />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import ClassCards from '@/app/ui/classes/classes-cards';
import HeaderNav from '@/app/ui/components/nav-header';

export default function AssignmentsPage() {
  

    const [storedName, setStoredName] = useState<string | null>(null);

    useEffect(() => {
        // Safely access localStorage on the client side
        const name = localStorage.getItem('student_name');
        setStoredName(name);
    }, []);

  return (
    <>
    <head>
        <title>Classes</title>
    </head>
    <body>
      <main className="flex min-h-screen flex-col">
        {/* Top bar with the Acme logo */}
        <HeaderNav />

        {/* Page title */}
        <div className="flex justify-center p-6">
          <h1 className="text-3xl font-bold text-gray-800">Classes for {storedName}</h1>
        </div>

        {/* Assignment cards */}
        <div className="flex grow justify-center p-6">
          <div className="w-full max-w-5xl">
            <ClassCards />
          </div>
        </div>
      </main>
    </body>
    </>
  );
}

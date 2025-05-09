'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import AssignmentCards from '@/app/ui/assignments/assignment-cards';
import HeaderNav from '@/app/ui/components/nav-header';
import DotsLoading from '@/app/ui/components/loading';

// Child component that uses useSearchParams
function AssignmentsContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('Assignments');

  useEffect(() => {
    const class_id = searchParams.get('class_id');
    const class_name = searchParams.get('class_name');
    console.log(class_id);

    if (class_id) {
      setPageTitle(`Assignments for ${class_name}`);
    } else {
      setPageTitle('Assignments');
    }
  }, [searchParams, pathname]);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top bar with the Acme logo */}
      <HeaderNav />

      {/* Page title */}
      <div className="flex justify-center p-6">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Assignment cards */}
      <div className="flex grow justify-center p-6">
        <div className="w-full max-w-5xl">
          <Suspense fallback={<DotsLoading/>}>
            <AssignmentCards />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default function AssignmentsPage() {
  const [isClient, setIsClient] = useState(false);

  // Ensure the code only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a fallback UI while waiting for the client-side initialization
    return <DotsLoading />;
  }

  return (
    <>
    <head>
        <title>Assignments</title>
    </head>
    <body>
    <Suspense fallback={<DotsLoading />}>
      <AssignmentsContent />
    </Suspense>
    </body>
    </>
  );
}
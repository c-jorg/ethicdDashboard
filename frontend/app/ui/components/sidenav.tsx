'use client'

import NavLinks from '@/app/ui/components/nav-links';
import { useState } from 'react';

export default function SideNav() {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

 

  return (
    
    <div className="flex flex-col px-3 py-4 md:px-2 h-12">

      <div >
        <NavLinks/>
      </div>
    </div>
  );
}
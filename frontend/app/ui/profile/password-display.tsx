'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PasswordDisplay() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md flex items-center">
      <h2 className="text-2xl font-semibold">Password:</h2>
      <div className="ml-4 text-lg"> ********* </div>
    </div>
  );
}

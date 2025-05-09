// components/MessageCard.js

import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid'; // Importing a lock icon from Heroicons

interface LockedFormProps {
  formName: string;
}

const LockedFormCard: React.FC<LockedFormProps> = ({ formName }) => {
  return (
   
     
      <div id="locked" className="relative p-6 max-w-md w-full bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-xl text-center mb-10">
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <LockClosedIcon className="h-12 w-12 text-gray-500" />
        </div>

        {/* Message text */}
        <h2 className="text-xl font-semibold text-gray-800">
          You must complete <span className="text-blue-600">{formName}</span> before you can access this form.
        </h2>
      </div>
    
  );
};

export default LockedFormCard;

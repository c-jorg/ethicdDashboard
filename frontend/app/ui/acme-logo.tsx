import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <AcademicCapIcon className="h-12 w-12 rotate-[15deg] hidden md:block" />
      {/* Adjust font size with responsive classes */}
      <p className="text-4xl md:text-4xl leading-8">Ethics Dashboard</p>
    </div>
  );
}

// app/ui/dashboard/Menu.tsx
//this is not currently linked anywhere
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMenu } from '@/app/context/menu-context';

export default function Menu() {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <button onClick={toggleMenu} className="absolute top-4 left-4 z-20 md:hidden">
      {isOpen ? <XMarkIcon className="w-8 h-8 text-blue-600" /> : <Bars3Icon className="w-8 h-8 text-blue-600" />}
    </button>
  );
}

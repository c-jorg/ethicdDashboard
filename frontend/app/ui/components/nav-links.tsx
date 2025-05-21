'use client';

import {
  UserCircleIcon,
  HomeIcon,
  PencilSquareIcon,
  ScaleIcon,
  MapIcon,
  GlobeAltIcon,
  StarIcon,
  ChartBarIcon,
  DocumentIcon,
  Bars3Icon,
  XMarkIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import styles from '../nav.module.css';
import LockLink from '../dashboard/locklink'; // Import LockLink component
import Cookie from 'js-cookie';
import axios from 'axios';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';


export interface SubLink {
  name: string;
  href: string;
  isLocked?: boolean; // isLocked can be optional and may be a boolean or string
  tooltip?: string; // tooltip is optional
  
}

export interface LinkType {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Use the correct type for the icon component
  subLinks?: SubLink[]; // Optional array of subLinks
  isLocked?: boolean; // isLocked can be optional and may be a boolean or string
}



export default function NavLinks(props: any) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Local state to track sidebar state
  const [loading, setLoading] = useState(false);
  const assignmentID = Cookie.get('assignment_id');
  const prefix = assignmentID + "-";
  let submitted = false;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  //form submission indicators
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    //i chose local storage for this over API call because it would get called often so i think it's better to store it locally
    //console.log(`looking for ${prefix}dilemma-submitted`);
    let dilemma = localStorage.getItem(`${prefix}dilemma-submitted`);
    //console.log("dilemma in nav links is: ", dilemma);
    if (dilemma) {
      setDilemmaSubmitted(true);
      //console.log("dilemma has been submitted so the NAV LINKS are unlocked");
    }else{
      //check by backend API call
      checkDilemmaForm();
    }
  }, [props.dilemmaSubmitted]);

  

  /**
   * Enforcing form completion order:
   * 
   * Check if the dilemma form has been submitted
   * If it has, set the state to true
   * If it hasn't, set the state to false
   * This will determine whether the user can access the page or not
   */
   const checkDilemmaForm = async () => {
      const isSubmitted = await dilemmaFormSubmitted(
        localStorage.getItem('id'),
        Cookie.get('assignment_id') || '',
        apiUrl
      );
      setDilemmaSubmitted(isSubmitted);
      if(isSubmitted === true){
        localStorage.setItem(`${prefix}dilemma-submitted`, "true");
      }
      console.log("API call says that dilemma form is submitted?: ", isSubmitted);
      return isSubmitted;
   };
    

  const links: LinkType[] = [
  
    {
      name: 'Describe your dilemma',
      href: '/dashboard/describe-dilemma',
      icon: PencilSquareIcon,
      subLinks: [
        { name: 'Start here', href: '/dashboard/describe-dilemma' },
      ],
    },
    {
      name: 'Consequences',
      href: '/dashboard/consequences/stakeholder-analysis',
      icon: ScaleIcon,
      isLocked: !dilemmaSubmitted,
      subLinks: [
        { name: 'Stakeholders', href: '/dashboard/consequences/stakeholder-analysis', isLocked: !dilemmaSubmitted },
        { name: 'Utilitarianism', href: '/dashboard/consequences/utilitarianism', isLocked: !dilemmaSubmitted },
      ],
    },
    {
      name: 'Action and Duty',
      href: '/dashboard/action-and-duty/reason',
      icon: MapIcon,
      isLocked: !dilemmaSubmitted,
      subLinks: [
        { 
          name: 'Reason', 
          href: '/dashboard/action-and-duty/reason', 
          isLocked: !dilemmaSubmitted,
        },
        { 
          name: 'Roles', 
          href: '/dashboard/action-and-duty/roles', 
          isLocked: !dilemmaSubmitted,
          tooltip: 'You must complete the Seven Step Method to access this page',
        },
        { 
          name: 'Past Actions', 
          href: '/dashboard/action-and-duty/past-actions', 
          isLocked: !dilemmaSubmitted,
          tooltip: 'You must complete the Seven Step Method to access this page',
        },
      ],
    },
    {
      name: 'Relations',
      href: '/dashboard/relations/care-ethics',
      isLocked: !dilemmaSubmitted,
      icon: GlobeAltIcon,
      subLinks: [
        { name: 'Care Ethics', href: '/dashboard/relations/care-ethics', isLocked: !dilemmaSubmitted },
        { name: 'Intersectionality', href: '/dashboard/relations/intersectionality', isLocked: !dilemmaSubmitted },
        { name: 'Seven Generations', href: '/dashboard/relations/seven-generations', isLocked: !dilemmaSubmitted },
      ],
    },
    {
      name: 'Character and Virtue',
      href: '/dashboard/character-and-virtue/virtue-ethics',
      icon: StarIcon,
      isLocked: !dilemmaSubmitted,
      subLinks: [
        { name: 'Virtue Ethics', href: '/dashboard/character-and-virtue/virtue-ethics', isLocked: !dilemmaSubmitted },
        { name: 'Life Path', href: '/dashboard/character-and-virtue/life-path', isLocked: !dilemmaSubmitted },
        { name: 'Universal Principles', href: '/dashboard/character-and-virtue/universal-principles', isLocked: !dilemmaSubmitted },
      ],
    },
    {
      name: 'View my progress',
      href: '/dashboard/view-my-progress',
      icon: ChartBarIcon,
    },
    {
      name: 'Generate reports',
      href: '/dashboard/generate-reports',
      isLocked: !dilemmaSubmitted,
      icon: DocumentIcon,
    },
  ];

  

  return (
    <div >
      {/* Overlay (dims background on mobile) */}
      <div className={`${styles.overlay} ${isSidebarOpen ? styles.open : ''}`} onClick={toggleSidebar}></div>

      <div className="flex items-center space-x-4">
        {/* Button to open the sidebar*/}
        <button onClick={toggleSidebar} className={clsx(styles['sidebar-open'], 'flex items-center justify-center rounded-md text-white hover:bg-white hover:text-blue-500 transition-colors w-12 h-12 md:w-14 md:h-14')}>
          {isSidebarOpen ? (
            <XMarkIcon className="w-8 h-8 md:w-12 md:h-12" />
          ) : (
            <Bars3Icon className="w-8 h-8 md:w-12 md:h-12" />
          )}
        </button>
       
      </div>

      {/* Sidebar: Visible when open, hidden otherwise */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.close } bg-gray-50 md:block`}>
        {/* Sidebar links */}
        <div>
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <div key={link.name}>
                {link.isLocked ? (
                  <LockLink
                  href={link.href}
                  name={link.name}
                  isLocked={link.isLocked} // Convert to boolean
                  isActive={pathname === link.href}
                  //tooltip={link.tooltip} // Pass custom tooltip message
                  />
                ) : (
                  <Link
                  href={link.href}
                  className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                    'bg-sky-100 text-blue-600': pathname === link.href,
                    },
                  )}
                  >
                  <LinkIcon className={`w-6`} />
                  <p className={`hidden md:block text-md`}>{link.name}</p>
                  </Link>
                )}

                {/* Sub-links */}
                {link.subLinks && link.subLinks.length > 0 && (
                  <div className={`ml-6 mt-2`}>
                    {link.subLinks.map((subLink) =>
                      subLink.isLocked ? (
                        <LockLink
                          key={subLink.name}
                          href={subLink.href}
                          name={subLink.name}
                          isLocked={subLink.isLocked} // Convert to boolean
                          isActive={pathname === subLink.href}
                          tooltip={subLink.tooltip} // Pass custom tooltip message
                        />
                      ) : (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className={clsx(
                            'flex h-[40px] grow items-center justify-start gap-2 rounded-md p-2 text-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none',
                            {
                              'bg-sky-100 text-blue-600': pathname === subLink.href,
                            },
                          )}
                        >
                          <p className={`md:block`}>{subLink.name}</p>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

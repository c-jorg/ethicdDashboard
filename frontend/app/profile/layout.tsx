// import SideNav from '@/app/ui/components/sidenav';
 
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
//       <div className="w-full flex-none md:w-64">
//         <SideNav />
//       </div>
//       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
//     </div>
//   );
// }


import SideNav from '@/app/ui/components/sidenav';
import HeaderNav from '@/app/ui/components/nav-header';

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <head>
        <title>Profile</title>
        <meta name="description" content="Profile page for Ethics Dashboard" />
    </head>
    <body>
      <div className="">
        <div className="w-full">
          <HeaderNav />
        </div>
        
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          
      
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </div>
    </body>
    </>
  );
}

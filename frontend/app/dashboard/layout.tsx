import SideNav from '@/app/ui/components/sidenav';
import HeaderNav from '@/app/ui/components/nav-header';

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <head>
        <title>Ethics Dashboard</title>
    </head>
    <body>
      <div className="">
        <div className="w-full">
          <HeaderNav />
        </div>
        
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          
          <div className="w-full flex-none md:w-64">
            {/* <SideNav /> */}
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
        </div>
      </div>
    </body>
    </>
  );
}

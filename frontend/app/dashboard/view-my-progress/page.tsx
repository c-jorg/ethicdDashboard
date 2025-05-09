import ViewMyProgressCards from '@/app/ui/dashboard/view-my-progress/view-my-progress-cards';

export default function ViewMyProgressPage() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-full space-y-2.5">

        {/* <div className="">
          <h1 className="font-semibold text-grey-800 md:text-3xl text-center">
            My Progress
          </h1>
        </div> */}

        <div>
          <ViewMyProgressCards />
        </div>
        
      </div>
    </main>
  );
}

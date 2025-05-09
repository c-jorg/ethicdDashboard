

'use client'
import JoinClassForm from '@/app/ui/profile/join-class-form'


export default function Page() {

  return (
    <main>
        <div className="flex h-20 w-full items-center justify-center md:h-36">
          <h1 className="text-5xl font-semibold text-gray-800 md:text-3xl text-center">
            Profile          
          </h1>
        </div>

        <JoinClassForm />
    </main>
  );
}

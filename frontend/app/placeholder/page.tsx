import AcmeLogo from '@/app/ui/acme-logo';

export default function AssignmentsPage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Top bar with the Acme logo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        { <AcmeLogo /> }
      </div>

      {/* Assignment cards */}
      <div className="flex grow justify-center p-6">
        <div className="w-full max-w-5xl">
          This page is a placeholder for the professor/TA dashboard being developed by the other team. We plan to integrate the two together by end of February.
        </div>
      </div>
    </main>
  );
}

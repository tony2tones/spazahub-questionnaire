import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center gap-8">
         <h1 className="text-4xl font-bold text-center mt-4 py-4">
  Welcome to Spaza<span className="text-green-500">Hub</span> Questionnaire App
</h1>
<hr className="border-t border-white my-4" />
          <div>
            <h2>Where to start</h2>
            <div className="flex flex-col gap-3">
              <Link href="/company-questions" className="p-4 bg-green-500 text-black rounded hover:bg-green-600">
                Go to Company Questions
              </Link>
               <Link href="/supplier-questions" className="p-4 bg-green-500 text-black rounded hover:bg-green-600">
                Are you a supplier? Go to Supplier Questions
              </Link>
            </div>
          </div>
      </main>
  );
}
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
            <Link href="/company-questions" className="text-blue-500 underline">
              Go to Company Questions
            </Link>
          </div>
      </main>
  );
}
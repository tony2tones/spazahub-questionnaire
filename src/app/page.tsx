import { Questionaire } from "./components/Questionaire";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 sm:p-20">
      <main className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to SpazaHub Questionnaire App
        </h1>
        <p className="text-center text-lg max-w-2xl">
          This is a simple questionnaire application built with Next.js and
          Tailwind CSS.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Questionaire />
          </div>
    </main>
    </div>   
  );
}

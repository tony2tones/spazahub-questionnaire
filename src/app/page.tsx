import {Questionnaire} from "@/app/components/Questionaire";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center gap-8">
    <div className="font-sans items-center justify-items-center p-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-center mb-4 px-4 py-4">
                  Welcome to Spaza<span className="text-green-500">Hub</span> Questionnaire App
                </h1>
          <Questionnaire />
        </div>
    </div>   
      </main>
  );
}
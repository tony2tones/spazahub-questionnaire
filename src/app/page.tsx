import {Questionnaire} from "@/app/components/Questionaire";
import { spazaQuestions } from "./spazaHub-questions/company-questions";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center gap-8">
      <div className="font-sans items-center justify-items-center p-8">
         <h1 className="text-4xl font-bold text-center mt-4 py-4">
  Welcome to Spaza<span className="text-green-500">Hub</span> Questionnaire App
</h1>
<br className="bg-amber-50 h-1" />
          <Questionnaire spazaQuestions={spazaQuestions} />
        </div>
      </main>
  );
}
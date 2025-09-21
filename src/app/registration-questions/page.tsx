import { Questionnaire } from "@/app/components/Questionaire";
import { SpazaRegistrationQuestions } from "../spazaHub-questions/registration-questions";

export default function RegistrationQuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <h1>Spaza<span className="text-green-500">Hub</span> Registration Questions Page</h1>
        <Questionnaire spazaQuestions={SpazaRegistrationQuestions} />
    </div>
  );
}
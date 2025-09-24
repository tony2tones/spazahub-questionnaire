import { Questionnaire } from "@/app/components/Questionaire";
import { SpazaCompanyQuestions } from "../spazaHub-questions/company-questions";

export default function CompanyQuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <h1>Spaza<span className="text-green-500">Hub</span> Company Questions Page</h1>
        <Questionnaire 
          spazaQuestions={SpazaCompanyQuestions} 
          questionnaireType="company"
          isLinkedQuestionnaire={true}
          nextStepUrl="/registration-questions"
          />
    </div>
  );
}
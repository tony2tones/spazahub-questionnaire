import { Questionnaire } from "@/app/components/Questionaire";
import { SpazaCompanyQuestions } from "../spazaHub-questions/company-questions";
import CartIcon from "@/components/ui/icons/CartIcon";

export default function CompanyQuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl sm:text-5xl font-bold flex items-center flex-wrap gap-2">
        <span className="flex whitespace-nowrap items-center">
          Spaza<span className="text-green-500">Hub</span>
          <CartIcon width={70} height={70} color="#00c950" />
        </span>
        Company Questions
      </h1>
      {/* <h1>Spaza<span className="text-green-500">Hub</span> /h1> */}
      <Questionnaire
        spazaQuestions={SpazaCompanyQuestions}
        questionnaireType="company"
        isLinkedQuestionnaire={true}
        nextStepUrl="/registration-questions"
      />
    </div>
  );
}

import { Questionnaire } from "@/app/components/Questionaire";
import { SpazaSupplierQuestions } from "../spazaHub-questions/supplier-questions";

export default function SupplierQuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <h1>Spaza<span className="text-green-500">Hub</span> Supplier Questions Page</h1>
        <Questionnaire spazaQuestions={SpazaSupplierQuestions} />
    </div>
  );
}
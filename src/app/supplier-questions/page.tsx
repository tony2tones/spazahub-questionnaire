import { Questionnaire } from "@/app/components/Questionaire";
import { SpazaSupplierQuestions } from "../spazaHub-questions/supplier-questions";
import CartIcon from "@/components/ui/icons/CartIcon";
import NavMenu from "@/components/ui/NavMenu";

export default function SupplierQuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
         <h1 className="text-3xl sm:text-5xl font-bold flex items-center flex-wrap gap-2">
           <span className="flex whitespace-nowrap items-center">
             Spaza<span className="text-green-500">Hub</span>
             <CartIcon width={70} height={70} color="#00c950" />
           </span>
           Supplier Questions
         </h1>
        <Questionnaire 
          spazaQuestions={SpazaSupplierQuestions}
          questionnaireType="supplier" 
          isLinkedQuestionnaire={false}
          nextStepUrl="/"
          />
          <div className="flex justify-center align-middle w-3xs">
          <NavMenu />
          </div>
    </div>
  );
}
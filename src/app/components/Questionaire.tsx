"use client";

import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Question } from "../types";
import { supabase } from "../lib/superbaseClient";
import { useQuestionnaireStore } from "@/app/store/questionnaire"; 

interface QuestionnaireProps {
  spazaQuestions: Question[];
  questionnaireType: 'company' | 'registration' | 'supplier';
  nextStepUrl?: string; // URL to navigate to after completion
  isLinkedQuestionnaire?: boolean; // true for company+registration combo
}

export function Questionnaire({
  spazaQuestions, 
  questionnaireType, 
  nextStepUrl,
  isLinkedQuestionnaire = false
}: QuestionnaireProps) {
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Zustand store hooks
  const { 
    setRecordId, 
    getRecordId,
    markStepComplete,
    isStepComplete,
    saveCompanyData,
    saveRegistrationData,
    getCompanyData
  } = useQuestionnaireStore();
  
  // set default values for the form
  const defaultValues = useMemo(() => {
    const dv: Record<string, unknown> = {};
    spazaQuestions.forEach((q) => {
      if (q.inputType === "checkbox") dv[q.name] = []; // important
      else dv[q.name] = "";
    });
    return dv;
  }, [spazaQuestions]);
	
  const { register, handleSubmit, watch, reset } = useForm({ defaultValues });
  const watched = watch();

  const totalQuestions = spazaQuestions.length;
  const answeredQuestions = spazaQuestions.filter((q) => {
      const val = watched[q.name];
      if (q.inputType === "checkbox") return Array.isArray(val) && val.length > 0;
        return !!val && val !== "";
    }).length;

  // Helper that safely checks whether "Other" is selected for a given field
  const isOtherSelected = (fieldName: string) => {
    const val = watched[fieldName];
    if (!val) return false;
    if (Array.isArray(val)) return val.includes("Other"); // checkbox group
    if (typeof val === "string") return val === "Other"; // radio / text
    return false;
  };

  const onSubmit = async (answers: Record<string, unknown>) => {
    // Replace "Other" with the custom text from fieldname_other if present
    Object.keys(answers).forEach((key) => {
      if (Array.isArray(answers[key]) && answers[key].includes("Other") && answers[`${key}_other`]) {
        answers[key] = answers[key].map((v: string) => (v === "Other" ? answers[`${key}_other`] : v));
        delete answers[`${key}_other`];
      }
      // Optionally handle radio fields that might be "Other" too:
      if (typeof answers[key] === "string" && answers[key] === "Other" && answers[`${key}_other`]) {
        answers[key] = answers[`${key}_other`];
        delete answers[`${key}_other`];
      }
    });

    try {
      if (questionnaireType === 'company' && isLinkedQuestionnaire) {
        // First step: Create new record with company data
        const submissionJson = {
          questionnaire_type: "spaza_combined",
          company_data: answers,
          registration_data: null,
          is_complete: false
        };

        const { data, error } = await supabase
          .from("questionnaire_submissions")
          .insert([{ full_response: submissionJson }])
          .select();

        if (error) throw error;

        // Save to Zustand for next step
        setRecordId(data[0].id);
        saveCompanyData(answers);
        markStepComplete('company');
        
        toast.success('Company details saved! Please complete registration.');
        
      } else if (questionnaireType === 'registration' && isLinkedQuestionnaire) {
        // Second step: Update existing record with registration data
        const recordId = getRecordId();
        const companyData = getCompanyData();

        if (!recordId) {
          toast.error('Please complete company details first');
          return;
        }

        const submissionJson = {
          questionnaire_type: "spaza_combined",
          company_data: companyData,
          registration_data: answers,
          is_complete: true,
          completed_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from("questionnaire_submissions")
          .update({ full_response: submissionJson })
          .eq('id', recordId);

        if (error) throw error;

        saveRegistrationData(answers);
        markStepComplete('registration');
        
        toast.success('All questionnaires completed successfully!');
        
      } else {
        // Standalone questionnaire (like supplier questions)
        const submissionJson = {
          questionnaire_type: questionnaireType,
          ...answers
        };

        const { error } = await supabase
          .from("questionnaire_submissions")
          .insert([{ full_response: submissionJson }]);

        if (error) throw error;
        
        toast.success('Form submitted successfully!');
      }

      reset();
      setFormSubmitted(true);

    } catch (err) {
      console.error("Submission error:", err);
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  // Check if this step is already completed
  const stepCompleted = isStepComplete(questionnaireType);

  return (
    <>
    <div className="font-sans items-center justify-items-center p-4 relative">
      {/* Progress indicator for linked questionnaires */}
      {isLinkedQuestionnaire && (
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${isStepComplete('company') ? 'text-green-600' : 'text-gray-400'}`}>
              {isStepComplete('company') ? ' ✅' : ' ⭕'} 
              <span>Company Details</span>
            </div>
            <div className={`flex items-center space-x-2 ${isStepComplete('registration') ? 'text-green-600' : 'text-gray-400'}`}>
              {isStepComplete('registration') ? ' ✅' : ' ⭕'} 
              <span>Registration Info</span>
            </div>
          </div>
        </div>
      )}

      {stepCompleted && (
        <div className='flex flex-col items-center mb-4'> 
          <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            <p>✅ This questionnaire has already been completed!</p>
          </div>
        </div>
      )}

      {formSubmitted && (
        <div className='flex flex-col items-center mb-4'> 
          <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            <p>Thank you for submitting the questionnaire!</p>
          </div>
          {nextStepUrl && (
            <div>
              <Link href={nextStepUrl} className="p-4 bg-green-500 text-black rounded hover:bg-green-600">
                Continue to Next Step
              </Link>
            </div>
          )}
        </div>
      )}

      {!formSubmitted && !stepCompleted && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-2xl mx-auto p-6">
          {spazaQuestions.map((q) => (
            <div key={q.id} className="flex flex-col gap-2">
              <label className="font-medium">{q.label}</label>

              {q.inputType === "text" && (
                <input
                  {...register(q.name)}
                  type="text"
                  required={q.required}
                  className="h-10 px-2 border border-gray-300 rounded"
                />
              )}

              {q.inputType === "radio" &&
                q.options?.map((option) => (
                  <label key={option} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      value={option}
                      required={q.required}
                      {...register(q.name)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    {option}
                  </label>
                ))}

              {q.inputType === "checkbox" &&
                q.options?.map((option) => (
                  <div key={option} className="flex flex-col gap-1">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={option}
                        required={q.required}
                        {...register(q.name)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      {option}
                    </label>

                    {/* show free-text when "Other" is selected (safe check) */}
                    {option === "Other" && isOtherSelected(q.name) && (
                      <input
                        type="text"
                        required={q.required}
                        placeholder="Please specify"
                        {...register(`${q.name}_other`)}
                        className="ml-6 px-2 py-1 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {questionnaireType === 'company' && isLinkedQuestionnaire 
              ? 'Save & Continue to Registration' 
              : 'Submit'}
          </button>
        </form>
      )}
    </div>

    {stepCompleted ?? 
      <div className="fixed top-14 right-3 text-center mb-8 border text-gray-600 bg-green-500 rounded px-4 py-2 shadow-lg">
        <p>
          Progress: {answeredQuestions} / {totalQuestions} answered
        </p>
      </div>
      }
    </>
  );
}
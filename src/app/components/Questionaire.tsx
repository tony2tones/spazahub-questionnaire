"use client";

import { Form, useForm } from "react-hook-form";
import { useMemo } from "react";
import { Question } from "../types";
import { supabase } from "../lib/superbaseClient";

type QuestionProp = {
  question: Question
};

export function Questionnaire({spazaQuestions}: {spazaQuestions: Question[]}) {
  
  
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

    const submissionJson = {
  questionnaire_type: "spaza", // or whatever type you want
  ...answers
    }

  try {
    const { error } = await supabase
  .from("questionnaire_submissions")
  .insert([{ full_response: submissionJson }]);
  reset();


  if(error) {
    console.error("Supabase insert error:", error);
    alert("❌ Something went wrong.");
    return;
  }

  } catch (err) {
    console.error("Request error:", err);
    alert("❌ Something went wrong.");
  }


    console.log("Final data:", answers);
    // submit to your API / Supabase here
  };

  return (
    <>
    <div className="font-sans items-center justify-items-center p-4 relative">
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

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        // disabled={answeredQuestions === totalQuestions}
        >
          Submit
        </button>
      </form>
    </div>
    <div className="fixed top-14 right-3 text-center mb-8  border text-gray-600 bg-green-500 rounded px-4 py-2 shadow-lg">
      <p >
        Progress: {answeredQuestions} / {totalQuestions} answered
      </p>
    </div>
    </>
  );
}


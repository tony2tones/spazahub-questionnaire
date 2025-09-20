"use client";

import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { spazaQuestions } from "@/app/spazaHub-questions/company-questions";

export function Questionnaire() {
  
  // set default values for the form
	const defaultValues = useMemo(() => {
    const dv: Record<string, unknown> = {};
		spazaQuestions.forEach((q) => {
      if (q.inputType === "checkbox") dv[q.name] = []; // important
			else dv[q.name] = "";
		});
		return dv;
	}, []);
	
  const { register, handleSubmit, watch } = useForm({ defaultValues });
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

  	  const onSubmit = async (data: Record<string, unknown>) => {
    // Replace "Other" with the custom text from fieldname_other if present
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key]) && data[key].includes("Other") && data[`${key}_other`]) {
        data[key] = data[key].map((v: string) => (v === "Other" ? data[`${key}_other`] : v));
        delete data[`${key}_other`];
      }
      // Optionally handle radio fields that might be "Other" too:
      if (typeof data[key] === "string" && data[key] === "Other" && data[`${key}_other`]) {
        data[key] = data[`${key}_other`];
        delete data[`${key}_other`];
      }
    });

  try {
    const res = await fetch("/api/submit-questionnaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.error) {
      console.error("Error submitting:", result.error);
      alert("❌ Submission failed!");
    } else {
      console.log("✅ Submitted:", result);
      alert("✅ Thank you! Form submitted.");
    }
  } catch (err) {
    console.error("Request error:", err);
    alert("❌ Something went wrong.");
  }


    console.log("Final data:", data);
    // submit to your API / Supabase here
  };

  return (
    <>
    <div className="font-sans items-center justify-items-center p-8 pt-12 relative">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-2xl mx-auto p-6">
        {spazaQuestions.map((q) => (
          <div key={q.id} className="flex flex-col gap-2">
            <label className="font-medium">{q.label}</label>

            {q.inputType === "text" && (
              <input
                {...register(q.name)}
                type="text"
                className="h-10 px-2 border border-gray-300 rounded"
              />
            )}

            {q.inputType === "radio" &&
              q.options?.map((option) => (
                <label key={option} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value={option}
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
                      {...register(q.name)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    {option}
                  </label>

                  {/* show free-text when "Other" is selected (safe check) */}
                  {option === "Other" && isOtherSelected(q.name) && (
                    <input
                      type="text"
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
          Submit
        </button>
      </form>
    </div>
    <div className="fixed bottom-3 right-3 text-center mb-8  border text-gray-600 bg-green-500 rounded px-4 py-2 shadow-lg">
      <p className="p-5">
        Progress: {answeredQuestions} / {totalQuestions} answered
      </p>
    </div>
    </>
  );
}


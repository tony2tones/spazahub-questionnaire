"use client";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Question } from "../types";
import { supabase } from "../lib/superbaseClient";
import { useQuestionnaireStore } from "@/app/store/questionnaire";
import Button from "@/components/ui/Button";
import LoaderComponent from "@/components/ui/LoaderRename";
import NavMenu from "@/components/ui/NavMenu";

interface QuestionnaireProps {
  spazaQuestions: Question[];
  questionnaireType: "company" | "registration" | "supplier";
  nextStepUrl?: string;
  isLinkedQuestionnaire?: boolean;
}

export function Questionnaire({
  spazaQuestions,
  questionnaireType,
  nextStepUrl,
  isLinkedQuestionnaire = false,
}: QuestionnaireProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    setRecordId,
    getRecordId,
    markStepComplete,
    isStepComplete,
    saveCompanyData,
    saveRegistrationData,
    getCompanyData,
  } = useQuestionnaireStore();

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultValues = useMemo(() => {
    const dv: Record<string, unknown> = {};
    spazaQuestions.forEach((q) => {
      if (q.inputType === "checkbox") dv[q.name] = [];
      else dv[q.name] = "";
    });
    return dv;
  }, [spazaQuestions]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const watched = watch();

  // Validation functions
  const validateEmail = (value: unknown) => {
    const email = typeof value === "string" ? value : String(value ?? "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Please enter a valid email address";
  };

  const validateMobile = (value: unknown) => {
    const v = typeof value === "string" ? value : String(value ?? "");
    // If the field is empty, it's valid (not required)
    if (!v || v.trim() === "") {
      return true;
    }

    // Only validate format if a value is provided
    const cleaned = v.replace(/\D/g, "");

    if (cleaned.startsWith("27")) {
      if (cleaned.length !== 11) {
        return "Mobile number must be 11 digits with country code (e.g., +27821234567)";
      }
    } else if (cleaned.startsWith("0")) {
      if (cleaned.length !== 10) {
        return "Mobile number must be 10 digits (e.g., 0821234567)";
      }
    } else {
      return "Mobile number must start with 0 or +27";
    }

    return true;
  };

  const totalQuestions = spazaQuestions.length;
  const answeredQuestions = spazaQuestions.filter((q) => {
    const val = watched[q.name];
    if (q.inputType === "checkbox") return Array.isArray(val) && val.length > 0;
    return !!val && val !== "";
  }).length;

  const isOtherSelected = (fieldName: string) => {
    const val = watched[fieldName];
    if (!val) return false;
    if (Array.isArray(val)) return val.includes("Other");
    if (typeof val === "string") return val === "Other";
    return false;
  };

  const onSubmit = async (answers: Record<string, unknown>) => {
    Object.keys(answers).forEach((key) => {
      if (
        Array.isArray(answers[key]) &&
        answers[key].includes("Other") &&
        answers[`${key}_other`]
      ) {
        answers[key] = answers[key].map((v: string) =>
          v === "Other" ? answers[`${key}_other`] : v
        );
        delete answers[`${key}_other`];
      }
      if (
        typeof answers[key] === "string" &&
        answers[key] === "Other" &&
        answers[`${key}_other`]
      ) {
        answers[key] = answers[`${key}_other`];
        delete answers[`${key}_other`];
      }
    });

    try {
      setIsLoading(true);
      if (questionnaireType === "company" && isLinkedQuestionnaire) {
        const submissionJson = {
          questionnaire_type: "spaza_combined",
          company_data: answers,
          registration_data: null,
          is_complete: false,
        };

        const { data, error } = await supabase
          .from("questionnaire_submissions")
          .insert([{ full_response: submissionJson }])
          .select();

        if (error) throw error;

        setRecordId(data[0].id);
        saveCompanyData(answers);
        markStepComplete("company");

        toast.success("Company details saved! Please complete registration.");
      } else if (
        questionnaireType === "registration" &&
        isLinkedQuestionnaire
      ) {
        const recordId = getRecordId();
        const companyData = getCompanyData();

        if (!recordId) {
          toast.error("Please complete company details first");
          return;
        }

        const submissionJson = {
          questionnaire_type: "spaza_combined",
          company_data: companyData,
          registration_data: answers,
          is_complete: true,
          completed_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("questionnaire_submissions")
          .update({ full_response: submissionJson })
          .eq("id", recordId);

        if (error) throw error;

        saveRegistrationData(answers);
        markStepComplete("registration");

        toast.success("All questionnaires completed successfully!");
      } else {
        const submissionJson = {
          questionnaire_type: questionnaireType,
          ...answers,
        };

        const { error } = await supabase
          .from("questionnaire_submissions")
          .insert([{ full_response: submissionJson }]);

        if (error) throw error;

        setIsLoading(true);

        toast.success("Form submitted successfully!");
      }

      reset();
      setFormSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  const stepCompleted = isMounted && isStepComplete(questionnaireType);
  const companyStepComplete = isMounted && isStepComplete("company");
  const registrationStepComplete = isMounted && isStepComplete("registration");

  return (
    <>
      <div className="font-sans items-center justify-items-center p-4 relative">
        {isLinkedQuestionnaire && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <div
                className={`flex items-center space-x-3 ${companyStepComplete ? "text-green-600" : "text-gray-400"}`}
              >
                {companyStepComplete ? " ✅" : "  ❌"}
                <span className="pl-2">Company Details</span>
              </div>
              <div
                className={`flex items-center space-x-3 ${registrationStepComplete ? "text-green-600" : "text-gray-400"}`}
              >
                {registrationStepComplete ? " ✅" : "  ❌"}
                <span className="pl-2"> Registration Info</span>
              </div>
            </div>
            <NavMenu />
          </div>
        )}

        {(stepCompleted || formSubmitted) && (
          <div className="flex flex-col items-center mb-4">
            <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
              <p>Thank you for submitting the Company questions!</p>
            </div>
          </div>
        )}

        {!formSubmitted && !stepCompleted && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 max-w-2xl mx-auto p-6"
          >
            {spazaQuestions.map((q) => (
              <div key={q.id} className="flex flex-col gap-2">
                <h1 className="text-2xl">{q.section}</h1>
                <label className="font-medium">{q.label}</label>

                {q.inputType === "text" && (
                  <>
                    <input
                      {...register(q.name)}
                      type="text"
                      required={q.required}
                      placeholder={q.placeholder || ""}
                      className="h-10 px-2 border border-gray-300 rounded"
                    />
                  </>
                )}

                {q.inputType === "email" && (
                  <>
                    <input
                      {...register(q.name, {
                        required: q.required ? "Email is required" : false,
                        validate: validateEmail,
                      })}
                      type="email"
                      placeholder="example@email.com"
                      className={`h-10 px-2 border rounded ${errors[q.name] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[q.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[q.name]?.message as string}
                      </span>
                    )}
                  </>
                )}

                {q.inputType === "tel" && (
                  <>
                    <input
                      {...register(q.name, {
                        required: false,
                        validate: validateMobile,
                      })}
                      type="tel"
                      placeholder="0821234567 or +27821234567, optional"
                      className={`h-10 px-2 border rounded ${errors[q.name] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[q.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[q.name]?.message as string}
                      </span>
                    )}
                  </>
                )}

                {q.inputType === "radio" &&
                  q.options?.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center gap-2"
                    >
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

            {isLoading && <LoaderComponent isLoading={isLoading} />}
            {!isLoading && (
              <Button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {questionnaireType === "company" && isLinkedQuestionnaire
                  ? "Save & Continue to Registration"
                  : isLoading
                    ? "submitting"
                    : "Submit"}
              </Button>
            )}
          </form>
        )}
      </div>

      {!stepCompleted && (
        <div className="fixed bottom-40 text-2xl right-3 text-center mb-8 border text-black  bg-green-500 rounded px-4 py-2 shadow-lg">
          <p>
            Progress: {answeredQuestions} / {totalQuestions} answered
          </p>
        </div>
      )}
    </>
  );
}

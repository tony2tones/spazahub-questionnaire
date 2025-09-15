'use client';
import { Question } from "../types/types";
import { useState } from "react";

const questions:Question[] = [
  {
	id: "1",
	name: "favorite_color",
	question: "What is your favorite color?",
	options: ["Red", "Blue", "Green", "Yellow"],
	inputType: "radio",
  },
  {
	id: "2",
	name: "hobby",
	question: "What is your favorite hobby?",
	options: ["Reading", "Traveling", "Cooking", "Sports", "Other"],
	inputType: "checkbox",
  },
   {
	id: "3",
	name: "name",
	question: "What is your Name?",
	inputType: "text",
  },
];

export function Questionaire() {
	const [formState, setFormState] = useState<{ [key: string]: string[] }>({});
	const [otherAnswers, setOtherAnswers] = useState<{ [key: string]: string }>({});

	const handleChange = (qName: string, option: string, inputType: string) => {
  setFormState((prev) => {
	if (inputType === "text") {
		return {
			...prev,
			[qName]: [option],
		}
	}
    if (inputType === "radio") {
      return {
        ...prev,
        [qName]: [option], // Only one option selected for radio
      };
    } else {
      const prevOptions = prev[qName] || [];
      return {
        ...prev,
        [qName]: prevOptions.includes(option)
          ? prevOptions.filter((o) => o !== option)
          : [...prevOptions, option],
      };
    }
  });
	};

	const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	const result = { ...formState };
  // Replace "Other" with the custom answer if provided
  Object.keys(result).forEach((key) => {
    if (
		result[key]?.includes("Other") && 
		otherAnswers[key]
	) {
      result[key] = result[key].map((val) =>
        val === "Other" ? otherAnswers[key] : val
      );
    }
  });
  console.log(result);
}

	return (
	<div>
		<form onSubmit={handleSubmit} className="flex flex-col gap-6">
			{questions.map((q) => (
				<div key={q.id} className="flex flex-col gap-2">
					<label className="font-medium">{q.question}</label>
					<div className="flex flex-col gap-1">
						{q.inputType === "text" ? (
							<input
								type="text"
								name={q.name}
								value={formState[q.name]?.[0] || ""}
								onChange={(e) =>
									setFormState((prev) => ({
										...prev,
										[q.name]: [e.target.value],
									}))
								}
								className="h-10 px-2 border border-gray-300 rounded"
							/>
						) : (
						q.options?.map((option) => (
						<div key={option}>
							<div className="flex flex-col items-center gap-2">
							<label className="inline-flex items-center gap-2">
							<input
								type={q.inputType}
								name={q.name}
								value={option}
								checked={formState[q.name]?.includes(option) || false}
								onChange={() => handleChange(q.name, option, q.inputType)}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded"
							/>
							{option}
							</label>
							{option === "Other" && formState[q.name]?.includes("Other") && (
							<input
								type="text"
								placeholder="Please specify"
								value={otherAnswers[q.name] || ""}
								onChange={(e) =>
								setOtherAnswers((prev) => ({
									...prev,
									[q.name]: e.target.value,
								}))
								}
								className="ml-2 px-2 py-1 border border-gray-300 rounded"
							/>
							)}
							</div>
						</div>
						)))}
					</div>
				</div>
			))}
			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Submit
			</button>
			</form>
	</div>
	);
};

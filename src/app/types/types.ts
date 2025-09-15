export type Question = {
  id: string;
  name: string;
  question: string;
  options?: string[];
  inputType: "checkbox" | "radio" | "text"; 
};
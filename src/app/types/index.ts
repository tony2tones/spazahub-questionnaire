export type Question = {
  id: string;
  section: string;
  name: string;
  label: string;
  options?: string[];
  inputType: "checkbox" | "radio" | "text" | "tel" | 'email'; 
  required?: boolean;
};
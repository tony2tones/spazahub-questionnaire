import { Question } from "@/app/types";

export const SpazaRegistrationQuestions: Question[] = [
  {
    id: "1",
    section: "Municipal Registration",
    name: "municipal_trading_permit",
    label: "Do you have a Municipal Trading Permit (Local Municipality Registration)?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "2",
    section: "CIPC Registration",
    name: "cipc_registered",
    label: "Is your business registered with CIPC (Companies and Intellectual Property Commission)?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "3",
    section: "CIPC Registration",
    name: "cipc_registration_number",
    label: "CIPC Registration Number",
    inputType: "text",
    required: false,
  },
  {
    id: "4",
    section: "SARS Registration",
    name: "sars_registered",
    label: "Are you registered with SARS (South African Revenue Service) for a Tax Reference Number?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "5",
    section: "SARS Registration",
    name: "sars_tax_number",
    label: "Tax Reference Number",
    inputType: "text",
    required: false,
  },
  {
    id: "6",
    section: "Food Safety",
    name: "food_safety_certificate",
    label: "Do you have a valid Food Safety / Health Certificate (if selling cooked or perishable food)?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "7",
    section: "Employment Registration",
    name: "uif_registered",
    label: "Are you registered with UIF (Unemployment Insurance Fund) if you employ staff?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "8",
    section: "Banking",
    name: "business_bank_account",
    label: "Do you have a Business Bank Account registered under the business name?",
    inputType: "radio",
    required: true,
    options: [
      "Yes",
      "No"
    ],
  },
  {
    id: "9",
    section: "Banking",
    name: "business_bank_name",
    label: "Business Bank Name",
    inputType: "text",
    required: false,
  },
];
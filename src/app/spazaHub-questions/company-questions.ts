// spazaQuestions.ts
import { Question } from "@/app/types/types";

export const SpazaCompanyQuestions: Question[] = [
  {
    id: "1",
    section: "Basic Information",
    name: "company_name",
    label: "Company / Trading Name",
    inputType: "text",
    required: true,
  },
  {
    id: "2",
    section: "Basic Information",
    name: "owner_name",
    label: "Owner’s Full Name",
    inputType: "text",
  },
  {
    id: "3",
    section: "Business Type",
    name: "business_type",
    label: "What type of business?",
    inputType: "radio",
    options: [
        "Sole Proprietor", 
        "Pty Ltd", 
        "Cooperative", 
        "Informal (Not Yet Registered)"
    ],
  },
  {
    id: "4",
    section: "Financial Profile",
    name: "monthly_revenue",
    label: "Monthly Revenue",
    inputType: "radio",
    options: [
        "More than R50,000",
        "R10,000 – R50,000", 
        "Less than R10,000",
    ], 
  },
  {
    id: "5",
    section: "Banking & Financial Services",
    name: "banks_used",
    label: "Which bank(s) do you use?",
    inputType: "checkbox",
    options: [
        "Standard Bank", 
        "FNB", 
        "Nedbank", 
        "ABSA", 
        "Capitec", 
        "TymeBank", 
        "Other"
    ],
  },
  {
    id: "6",
    section: "Growth & Support Needs",
    name: "support_needs",
    label: "What support do you need?",
    inputType: "checkbox",
    options: [
      "Access to competitive suppliers and bulk stock",
      "Help with business registration",
      "Access to funding / loans / grants",
      "Training on running and growing the shop",
      "Digital tools for managing sales & stock",
    ],
  },
];

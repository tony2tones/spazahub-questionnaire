import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuestionnaireState {
  // Current session tracking (no user auth needed)
  currentRecordId: string | null
  completedSteps: string[]
  currentStep: 'company' | 'registration' | 'supplier' | null
  
  // Temporary form data storage
  companyData: any
  registrationData: any
  
  // Actions
  setCurrentStep: (step: 'company' | 'registration' | 'supplier') => void
  setRecordId: (recordId: string) => void
  getRecordId: () => string | null
  markStepComplete: (step: string) => void
  isStepComplete: (step: string) => boolean
  saveCompanyData: (data: any) => void
  getCompanyData: () => any
  saveRegistrationData: (data: any) => void
  getRegistrationData: () => any
  resetSession: () => void
  getBothQuestionnaires: () => { company: any, registration: any }
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentRecordId: null,
      completedSteps: [],
      currentStep: null,
      companyData: null,
      registrationData: null,

      // Set current active step
      setCurrentStep: (step) => set({ currentStep: step }),

      // Save database record ID
      setRecordId: (recordId) => set({ currentRecordId: recordId }),

      // Get current record ID
      getRecordId: () => get().currentRecordId,

      // Mark step as complete
      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: [
            ...state.completedSteps.filter(s => s !== step),
            step
          ]
        })),

      // Check if step is complete
      isStepComplete: (step) => {
        const state = get()
        return state.completedSteps.includes(step)
      },

      // Save company questionnaire data
      saveCompanyData: (data) => set({ companyData: data }),

      // Get company data
      getCompanyData: () => get().companyData,

      // Save registration questionnaire data
      saveRegistrationData: (data) => set({ registrationData: data }),

      // Get registration data
      getRegistrationData: () => get().registrationData,

      // Get both questionnaires combined
      getBothQuestionnaires: () => {
        const state = get()
        return {
          company: state.companyData,
          registration: state.registrationData
        }
      },

      // Reset everything (for new session)
      resetSession: () =>
        set({
          currentRecordId: null,
          completedSteps: [],
          currentStep: null,
          companyData: null,
          registrationData: null
        }),
    }),
    {
      name: 'questionnaire-session', // localStorage key
    }
  )
)
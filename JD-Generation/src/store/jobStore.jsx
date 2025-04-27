// src/store/jobStore.jsx

import { create } from 'zustand';

const initialFormData = {
  companyName: '',
  jobRole: '',
  yearsOfExperience: 0,
  keywords: [],
  jobLocation: '',
  employmentType: '',
  requiredSkills: [],
  additionalInfo: '',
  jobDeadline: '',
  educationRequirements: '',
};

export const useJobStore = create((set) => ({
  formData: initialFormData,
  linkedInDescription: '',
  twitterDescription: '',
  isLoading: false,
  error: null,
  linkedInAccessToken: null,

  // Set form data
  setFormData: (data) => set({ formData: data }),

  // Set generated descriptions from API
  setDescriptions: (linkedin, twitter) =>
    set({ linkedInDescription: linkedin, twitterDescription: twitter }),

  // Set loading state
  setLoading: (loading) => set({ isLoading: loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Set LinkedIn access token
  setLinkedInAccessToken: (token) => set({ linkedInAccessToken: token }),

  // Reset store to initial state
  resetStore: () => set({
    formData: initialFormData,
    linkedInDescription: '',
    twitterDescription: '',
    isLoading: false,
    error: null
  }),
}));

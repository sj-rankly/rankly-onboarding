import React, { createContext, useContext, useState, ReactNode } from 'react'

// Types
export interface Competitor {
  id: string
  name: string
  url: string
}

export interface Persona {
  id: string
  type: string
  description: string
}

export interface Topic {
  id: string
  name: string
}

export interface OnboardingData {
  email: string
  firstName: string
  lastName: string
  companyName: string
  websiteUrl: string
  competitors: Competitor[]
  selectedCompetitors: Set<string>
  personas: Persona[]
  selectedPersonas: Set<string>
  topics: Topic[]
  selectedTopics: Set<string>
  region: string
  language: string
}

interface OnboardingContextType {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  resetData: () => void
}

const defaultData: OnboardingData = {
  email: '',
  firstName: '',
  lastName: '',
  companyName: '',
  websiteUrl: '',
  competitors: [
    { id: '1', name: 'Competitor 1', url: 'https://competitor1.com' },
    { id: '2', name: 'Competitor 2', url: 'https://competitor2.com' },
    { id: '3', name: 'Competitor 3', url: 'https://competitor3.com' },
    { id: '4', name: 'Competitor 4', url: 'https://competitor4.com' }
  ],
  selectedCompetitors: new Set(),
  personas: [
    { 
      id: '1', 
      type: 'Marketer', 
      description: 'This persona represents marketing professionals who are looking to optimize their content strategy and improve their SEO performance through AI-powered tools.' 
    },
    { 
      id: '2', 
      type: 'Developer', 
      description: 'This persona represents developers and technical professionals who need to integrate AI solutions into their existing workflows and systems.' 
    },
    { 
      id: '3', 
      type: 'Executive', 
      description: 'This persona represents C-level executives and decision makers who are focused on ROI, business growth, and strategic implementation of new technologies.' 
    }
  ],
  selectedPersonas: new Set(),
  topics: [
    { id: '1', name: 'Topic 1' },
    { id: '2', name: 'Topic 2' },
    { id: '3', name: 'Topic 3' }
  ],
  selectedTopics: new Set(),
  region: 'Global',
  language: 'English'
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('onboarding-data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convert Set arrays back to Sets
        return {
          ...parsed,
          selectedCompetitors: new Set(parsed.selectedCompetitors || []),
          selectedPersonas: new Set(parsed.selectedPersonas || []),
          selectedTopics: new Set(parsed.selectedTopics || [])
        }
      } catch (e) {
        return defaultData
      }
    }
    return defaultData
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => {
      const newData = { ...prev, ...updates }
      // Save to localStorage (convert Sets to arrays)
      const toSave = {
        ...newData,
        selectedCompetitors: Array.from(newData.selectedCompetitors),
        selectedPersonas: Array.from(newData.selectedPersonas),
        selectedTopics: Array.from(newData.selectedTopics)
      }
      localStorage.setItem('onboarding-data', JSON.stringify(toSave))
      return newData
    })
  }

  const resetData = () => {
    setData(defaultData)
    localStorage.removeItem('onboarding-data')
  }

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}


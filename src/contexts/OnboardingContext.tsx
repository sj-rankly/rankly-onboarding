import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import apiService from '../services/api'

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
  saveToBackend: () => Promise<void>
  loadFromBackend: () => Promise<void>
  isLoading: boolean
  error: string | null
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

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const saveToBackend = async () => {
    if (!apiService.token) {
      setError('Not authenticated. Please login first.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Convert frontend data to backend format
      const backendData = {
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.companyName,
          website: data.websiteUrl
        },
        websiteUrl: data.websiteUrl,
        competitors: Array.from(data.selectedCompetitors).map(id => 
          data.competitors.find(c => c.id === id)?.url
        ).filter(Boolean),
        topics: Array.from(data.selectedTopics).map(id => 
          data.topics.find(t => t.id === id)?.name
        ).filter(Boolean),
        personas: Array.from(data.selectedPersonas).map(id => 
          data.personas.find(p => p.id === id)?.description
        ).filter(Boolean),
        regions: [data.region],
        languages: [data.language],
        preferences: {
          industry: data.companyName,
          targetAudience: Array.from(data.selectedPersonas).map(id => 
            data.personas.find(p => p.id === id)?.type
          ).filter(Boolean).join(', '),
          goals: ['Improve SEO', 'Increase visibility', 'Content optimization']
        },
        currentStep: 8,
        isCompleted: true
      }

      await apiService.updateOnboardingBulk(backendData)
      console.log('✅ Onboarding data saved to backend')
    } catch (err) {
      console.error('❌ Failed to save onboarding data:', err)
      setError(err instanceof Error ? err.message : 'Failed to save data')
    } finally {
      setIsLoading(false)
    }
  }

  const loadFromBackend = async () => {
    if (!apiService.token) {
      setError('Not authenticated. Please login first.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await apiService.getOnboardingData()
      const backendData = response.data.onboarding

      // Convert backend data to frontend format
      const frontendData: Partial<OnboardingData> = {
        firstName: backendData.profile?.firstName || '',
        lastName: backendData.profile?.lastName || '',
        companyName: backendData.profile?.company || '',
        websiteUrl: backendData.websiteUrl || '',
        region: backendData.regions?.[0] || 'Global',
        language: backendData.languages?.[0] || 'English'
      }

      // Update competitors selection
      if (backendData.competitors) {
        const selectedCompetitors = new Set<string>()
        backendData.competitors.forEach((url: string) => {
          const competitor = data.competitors.find(c => c.url === url)
          if (competitor) {
            selectedCompetitors.add(competitor.id)
          }
        })
        frontendData.selectedCompetitors = selectedCompetitors
      }

      // Update topics selection
      if (backendData.topics) {
        const selectedTopics = new Set<string>()
        backendData.topics.forEach((topicName: string) => {
          const topic = data.topics.find(t => t.name === topicName)
          if (topic) {
            selectedTopics.add(topic.id)
          }
        })
        frontendData.selectedTopics = selectedTopics
      }

      // Update personas selection
      if (backendData.personas) {
        const selectedPersonas = new Set<string>()
        backendData.personas.forEach((description: string) => {
          const persona = data.personas.find(p => p.description === description)
          if (persona) {
            selectedPersonas.add(persona.id)
          }
        })
        frontendData.selectedPersonas = selectedPersonas
      }

      updateData(frontendData)
      console.log('✅ Onboarding data loaded from backend')
    } catch (err) {
      console.error('❌ Failed to load onboarding data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingContext.Provider value={{ 
      data, 
      updateData, 
      resetData, 
      saveToBackend, 
      loadFromBackend,
      isLoading,
      error
    }}>
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


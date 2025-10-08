'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import { NavigationArrows } from '@/components/NavigationArrows'

interface Persona {
  id: number
  name: string
  details: string
}

const defaultPersonas: Persona[] = [
  {
    id: 1,
    name: 'Marketer',
    details: 'This persona represents marketing professionals who are looking to optimize their content strategy and improve their SEO performance through AI-powered tools.'
  },
  {
    id: 2,
    name: 'Content Creator',
    details: 'This persona represents content creators who want to understand how their brand appears in AI-generated answers and improve their visibility.'
  }
]

const MAX_PERSONAS = 2

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Load saved personas on mount
  useEffect(() => {
    const personasData = localStorage.getItem('personasData')
    if (personasData) {
      const data = JSON.parse(personasData)
      setPersonas(data.personas || defaultPersonas)
    } else {
      setPersonas(defaultPersonas)
    }
  }, [])

  const updatePersonaName = (id: number, value: string) => {
    setPersonas(prev => prev.map(persona => 
      persona.id === id ? { ...persona, name: value } : persona
    ))
  }

  const updatePersonaDetails = (id: number, value: string) => {
    setPersonas(prev => prev.map(persona => 
      persona.id === id ? { ...persona, details: value } : persona
    ))
  }

  const removePersona = (id: number) => {
    setPersonas(prev => prev.filter(persona => persona.id !== id))
  }

  const addPersona = () => {
    if (personas.length >= MAX_PERSONAS) {
      alert('Only 2 personas can be added at a time, remove one to add another')
      return
    }
    const newId = personas.length > 0 ? Math.max(...personas.map(p => p.id)) + 1 : 1
    setPersonas(prev => [...prev, {
      id: newId,
      name: '',
      details: ''
    }])
  }

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // Store personas data
      localStorage.setItem('personasData', JSON.stringify({ personas }))
      
      // Continue to LLM platforms step
      setTimeout(() => {
        router.push('/onboarding/llm-platforms')
      }, 500)
    } catch (err) {
      console.error('Failed to save personas:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center bg-background text-foreground">
      {/* Background Beams */}
      <BackgroundBeams className="absolute inset-0 z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl relative z-10"
      >
        <Card className="w-full overflow-hidden rounded-lg h-[600px] relative">
          {/* Navigation Arrows */}
          <NavigationArrows 
            previousPath="/onboarding/topics"
            nextPath="/onboarding/llm-platforms"
          />
          <CardContent className="p-6 sm:p-8 h-full flex flex-col">
            {/* Header */}
            <div className="text-center space-y-1 mb-6">
              <h1 className="mb-1 text-xl font-semibold tracking-tight text-foreground">
                User Personas
              </h1>
              <p className="text-center text-sm font-normal leading-[1.4] text-muted-foreground px-4">
                Select Personas to Generate Prompts
              </p>
            </div>

            {/* Persona List - Scrollable area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {personas.map((persona) => (
                <div key={persona.id} className="bg-muted/50 rounded-md p-3 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Input
                      type="text"
                      value={persona.name}
                      onChange={(e) => updatePersonaName(persona.id, e.target.value)}
                      placeholder="Persona name (e.g., Marketer)"
                      className="flex-1 h-8 text-sm bg-background border-border text-foreground font-medium"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => removePersona(persona.id)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    value={persona.details}
                    onChange={(e) => updatePersonaDetails(persona.id, e.target.value)}
                    placeholder="This persona represents marketing professionals who are looking to optimize their content strategy and improve their SEO performance through AI-powered tools."
                    className="w-full h-20 text-sm bg-background border border-border text-foreground rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            {/* Bottom section with buttons */}
            <div className="mt-6 space-y-4 flex flex-col items-center">
              {/* Add Persona Button */}
              <Button
                type="button"
                onClick={addPersona}
                variant="outline"
                className="w-[400px] h-10 font-medium"
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Persona
              </Button>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                className="w-[400px] h-10 font-semibold"
                disabled={isLoading || personas.length === 0}
              >
                {isLoading ? 'Continuing...' : 'Continue'}
              </Button>

              {/* Limit Note */}
              <p className="text-center text-xs font-normal text-muted-foreground">
                Up to 2 personas
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

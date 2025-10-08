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

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Load saved competitors on mount
  useEffect(() => {
    const competitorsData = localStorage.getItem('competitorsData')
    if (competitorsData) {
      const data = JSON.parse(competitorsData)
      setCompetitors(data.competitors || [])
    } else {
      // Default competitors - limit to 4
      setCompetitors([
        'https://competitor1.com',
        'https://competitor2.com', 
        'https://competitor3.com',
        'https://competitor4.com'
      ])
    }
  }, [])
  
  const MAX_COMPETITORS = 4

  const updateCompetitor = (index: number, value: string) => {
    const newCompetitors = [...competitors]
    newCompetitors[index] = value
    setCompetitors(newCompetitors)
  }

  const removeCompetitor = (index: number) => {
    const newCompetitors = competitors.filter((_, i) => i !== index)
    setCompetitors(newCompetitors)
  }

  const addCompetitor = () => {
    if (competitors.length >= MAX_COMPETITORS) {
      alert('Only 4 competitors can be added at a time, remove one to add another')
      return
    }
    setCompetitors([...competitors, ''])
  }

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // Store competitors data
      localStorage.setItem('competitorsData', JSON.stringify({ competitors }))
      
      // Continue to topics step
      setTimeout(() => {
        router.push('/onboarding/topics')
      }, 500)
    } catch (err) {
      console.error('Failed to save competitors:', err)
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
        className="w-full max-w-[400px] relative z-10"
      >
        <Card className="w-full rounded-lg p-6 sm:p-8 relative">
          {/* Navigation Arrows */}
          <NavigationArrows 
            previousPath="/onboarding/website"
            nextPath="/onboarding/topics"
          />
          <CardContent className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                Competitors Found for Your Page
              </h1>
              <p className="text-sm font-normal leading-[1.4] text-muted-foreground">
                Manage and refine your competitor list for more accurate analysis
              </p>
            </div>

            {/* Competitor List */}
            <div className="space-y-2">
              {competitors.map((competitor, index) => (
                <div key={index} className="flex items-center space-x-3 bg-muted/50 rounded-md p-2">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground min-w-[70px]">
                    Competitor {index + 1}
                  </span>
                  <Input
                    type="url"
                    value={competitor}
                    onChange={(e) => updateCompetitor(index, e.target.value)}
                    placeholder={`https://competitor${index + 1}.com`}
                    className="flex-1 h-8 text-sm bg-background border-border text-foreground"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeCompetitor(index)}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Competitor Button */}
            <Button
              type="button"
              onClick={addCompetitor}
              variant="outline"
              className="w-full h-10 font-medium"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Competitor
            </Button>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-10 font-semibold"
              disabled={isLoading || competitors.length === 0}
            >
              {isLoading ? 'Proceeding...' : 'Proceed to Topics'}
            </Button>

            {/* Limit Note */}
            <p className="text-center text-xs font-normal text-muted-foreground">
              Up to 4 competitors
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

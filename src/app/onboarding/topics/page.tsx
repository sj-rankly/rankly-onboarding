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

export default function TopicsPage() {
  const [topics, setTopics] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Load saved topics on mount
  useEffect(() => {
    const topicsData = localStorage.getItem('topicsData')
    if (topicsData) {
      const data = JSON.parse(topicsData)
      setTopics(data.topics || [])
    } else {
      // Default topics - limit to 2
      setTopics(['topic1', 'topic2'])
    }
  }, [])
  
  const MAX_TOPICS = 2

  const updateTopic = (index: number, value: string) => {
    const newTopics = [...topics]
    newTopics[index] = value
    setTopics(newTopics)
  }

  const removeTopic = (index: number) => {
    const newTopics = topics.filter((_, i) => i !== index)
    setTopics(newTopics)
  }

  const addTopic = () => {
    if (topics.length >= MAX_TOPICS) {
      alert('Only 2 topics can be added at a time, remove one to add another')
      return
    }
    setTopics([...topics, ''])
  }

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // Store topics data
      localStorage.setItem('topicsData', JSON.stringify({ topics }))
      
      // Continue to personas step
      setTimeout(() => {
        router.push('/onboarding/personas')
      }, 500)
    } catch (err) {
      console.error('Failed to save topics:', err)
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
            previousPath="/onboarding/competitors"
            nextPath="/onboarding/personas"
          />
          <CardContent className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                Topics
              </h1>
              <p className="text-sm font-normal leading-[1.4] text-muted-foreground">
                Select topics to generate prompts
              </p>
            </div>

            {/* Topic List */}
            <div className="space-y-2">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-3 bg-muted/50 rounded-md p-2">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground min-w-[50px]">
                    Topic {index + 1}
                  </span>
                  <Input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    placeholder={`Topic ${index + 1}`}
                    className="flex-1 h-8 text-sm bg-background border-border text-foreground"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeTopic(index)}
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

            {/* Add Topic Button */}
            <Button
              type="button"
              onClick={addTopic}
              variant="outline"
              className="w-full h-10 font-medium"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Topic
            </Button>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-10 font-semibold"
              disabled={isLoading || topics.length === 0}
            >
              {isLoading ? 'Proceeding...' : 'Proceed to User Personas'}
            </Button>

            {/* Limit Note */}
            <p className="text-center text-xs font-normal text-muted-foreground">
              Up to 2 topics
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
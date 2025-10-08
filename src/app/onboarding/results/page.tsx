'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import { NavigationArrows } from '@/components/NavigationArrows'

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const router = useRouter()
  
  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenDashboard = async () => {
    setIsLoading(true)
    
    try {
      // Navigate to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (err) {
      console.error('Failed to open dashboard:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 md:p-10 relative">
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
            previousPath="/onboarding/llm-platforms"
            showNext={false}
          />
          <CardContent className="grid p-0 md:grid-cols-2 h-full">
            {/* Left Section - View Dashboard (Light Background) */}
            <div className="bg-background p-6 sm:p-8 flex flex-col justify-center">
              <div className="space-y-6 text-center">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                    View Dashboard for detailed insights
                  </h1>
                </div>
                
                <Button
                  onClick={handleOpenDashboard}
                  disabled={isLoading}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Opening...' : (
                    <>
                      Open Dashboard
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Section - Results Summary (Dark Background) */}
            <div className="bg-muted p-6 sm:p-8 flex flex-col justify-center">
              {dataLoading ? (
                <div className="space-y-4">
                  {/* Skeleton for Visibility Score */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                  </div>
                  
                  {/* Skeleton for Citation Share */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                  </div>
                  
                  {/* Skeleton for Opportunities */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <Skeleton className="h-4 w-40 mb-3" />
                    <Skeleton className="h-3 w-full mb-3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ) : (
              <div className="space-y-4">
                  {/* Visibility Score Card */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-medium tracking-wide text-foreground">Visibility Score</h3>
                      <span className="text-base font-semibold text-foreground">42%</span>
                    </div>
                    <p className="text-xs font-normal leading-[1.4] text-muted-foreground">
                      How often your brand appears in AI-generated answers
                    </p>
                  </div>

                  {/* Citation Share Card */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-medium tracking-wide text-foreground">Citation Share</h3>
                      <span className="text-base font-semibold text-foreground">18%</span>
                    </div>
                    <p className="text-xs font-normal leading-[1.4] text-muted-foreground">
                      How often your brand is cited in AI-generated answers
                    </p>
                  </div>

                  {/* Opportunities & Insights Card */}
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-medium tracking-wide text-foreground">Opportunities & Insights</h3>
                    </div>
                    <p className="text-xs font-normal leading-[1.4] text-muted-foreground mb-3">
                      Discover hidden strengths and new spaces where your brand can stand out
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-normal text-foreground">Strong presence in tech discussions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-normal text-foreground">High engagement in AI-related queries</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-normal text-foreground">Limited visibility in healthcare topics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-normal text-foreground">Missing from financial services conversations</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

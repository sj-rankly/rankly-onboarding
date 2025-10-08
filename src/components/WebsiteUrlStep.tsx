'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import { NavigationArrows } from '@/components/NavigationArrows'

interface WebsiteUrlStepProps {
  onContinue: (url: string) => void
  isLoading?: boolean
  initialUrl?: string
  previousPath?: string
  nextPath?: string
}

const loaderSteps = [
  "Scraping your website and understanding brand context",
  "Identifying closest competitors", 
  "Analyzing key topics mentioned on your page",
  "Detecting user personas from your brand context"
]

export function WebsiteUrlStep({ onContinue, isLoading, initialUrl = '', previousPath, nextPath }: WebsiteUrlStepProps) {
  const [url, setUrl] = useState(initialUrl)
  const [currentLoader, setCurrentLoader] = useState(0)
  const [showLoaders, setShowLoaders] = useState(false)
  const [showInitialLoader, setShowInitialLoader] = useState(false)
  const [allLoadersComplete, setAllLoadersComplete] = useState(false)
  
  // Update URL if initialUrl changes
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl)
    }
  }, [initialUrl])

  useEffect(() => {
    if (isLoading && showInitialLoader) {
      const timer = setTimeout(() => {
        setShowLoaders(true)
        setShowInitialLoader(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, showInitialLoader])

  useEffect(() => {
    if (showLoaders) {
      const timers: NodeJS.Timeout[] = []
      
      // Set up timers for each loader step
      for (let i = 0; i < loaderSteps.length; i++) {
        const timer = setTimeout(() => {
          setCurrentLoader(i + 1)
          console.log(`Loader ${i + 1} completed`)
          
          // If this is the last loader, show the button immediately
          if (i === loaderSteps.length - 1) {
            setAllLoadersComplete(true)
            console.log('All loaders complete, showing button')
          }
        }, (i + 1) * 2000) // Each loader takes 2 seconds
        
        timers.push(timer)
      }
      
      return () => {
        // Only clear on component unmount, not when isLoading changes
        timers.forEach(timer => clearTimeout(timer))
      }
    }
  }, [showLoaders])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      setShowInitialLoader(true)
      onContinue(url.trim())
    }
  }

  const handleNext = () => {
    // Navigate to competitors page
    window.location.href = '/onboarding/competitors'
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
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
            previousPath={previousPath}
            nextPath={allLoadersComplete ? nextPath : undefined}
            showNext={allLoadersComplete}
          />
          <CardContent className="grid p-0 md:grid-cols-2 h-full">
            {/* Left Section - URL Input (Light Background) */}
            <div className="bg-background p-6 sm:p-8 flex flex-col">
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                      Enter any page or website URL
                    </h1>
                    <p className="text-sm font-normal leading-[1.4] text-muted-foreground">
                      Rankly runs a page-level scan to extract brand context, topics, personas and direct competitors
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="websiteUrl" className="text-xs font-medium tracking-wide text-muted-foreground">
                        URL
                      </Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Button positioned at bottom - show until analysis is complete */}
              {!allLoadersComplete && (
                <div className="mt-auto pt-6">
                  <Button
                    type="submit"
                    form="websiteForm"
                    disabled={!url.trim() || !isValidUrl(url) || isLoading}
                    className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    onClick={handleSubmit}
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              )}
            </div>

            {/* Right Section - Loaders (Dark Background) */}
            <div className="bg-muted p-6 sm:p-8 flex flex-col">
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-6">
                  <AnimatePresence>
                  {showInitialLoader ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 mx-auto bg-muted-foreground/10 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 w-20 h-20 border-2 border-foreground border-t-transparent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ) : allLoadersComplete ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {loaderSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ 
                            opacity: 1,
                            x: 0
                          }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          </div>
                          
                          <span className="text-xs font-normal text-foreground">
                            {step}
                          </span>
                        </motion.div>
                      ))}
                      
                    </motion.div>
                  ) : showLoaders ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {loaderSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ 
                            opacity: index <= currentLoader ? 1 : 0.3,
                            x: 0
                          }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0">
                            {index < currentLoader ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.div>
                            ) : index === currentLoader ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                              />
                            ) : (
                              <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded-full" />
                            )}
                          </div>
                          
                          <span className={`text-xs font-normal ${
                            index <= currentLoader 
                              ? 'text-foreground' 
                              : 'text-muted-foreground'
                          }`}>
                            {step}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  )}
                </AnimatePresence>
                </div>
              </div>
              
              {/* Button positioned at bottom */}
              {allLoadersComplete && (
                <div className="mt-auto pt-6">
                  <Button
                    onClick={handleNext}
                    className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Identify your competitors</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export default function RegionLanguagePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // Store region & language data
      localStorage.setItem('regionLanguageData', JSON.stringify({ 
        region: 'Global', 
        language: 'English' 
      }))
      
      // Continue to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000) // Simulate loading time
    } catch (err) {
      console.error('Failed to save region & language:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center bg-background text-foreground">
      {/* Background Beams */}
      <BackgroundBeams />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <Card className="w-[420px] sm:w-[460px] p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              Region & Language
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Select your target region and language
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Region Selection */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Region</div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <span className="text-sm">Global</span>
                <div className="text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Language</div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <span className="text-sm">English</span>
                <div className="text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="text-xs text-muted-foreground text-center">
              More languages and regions soon…
            </div>
            
            <Button 
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90" 
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? 'Setting up your dashboard...' : 'Complete Setup'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

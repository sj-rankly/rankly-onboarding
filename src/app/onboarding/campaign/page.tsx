'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export default function CampaignPage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    if (!url.includes('.')) return
    
    setIsLoading(true)
    
    try {
      // Simulate campaign setup API call
      console.log('Setting up campaign for URL:', url)
      
      // Store campaign data
      localStorage.setItem('campaignData', JSON.stringify({ url }))
      
      // Continue to competitors step
      setTimeout(() => {
        router.push('/onboarding/competitors')
      }, 1000)
    } catch (err) {
      console.error('Campaign setup failed:', err)
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
              Enter your website URL
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              We'll analyze your website to understand your brand and content
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-foreground">Website URL</Label>
              <Input 
                id="url"
                type="url" 
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
            
            <Button 
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90" 
              onClick={handleContinue}
              disabled={!url.includes('.') || isLoading}
            >
              {isLoading ? 'Analyzing website...' : 'Continue'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

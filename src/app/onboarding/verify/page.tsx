'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import { NavigationArrows } from '@/components/NavigationArrows'

export default function VerifyPage() {
  const [codes, setCodes] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Get user data from localStorage (set during signup)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const signupData = localStorage.getItem('signupData')
    if (signupData) {
      const data = JSON.parse(signupData)
      setUserData(data)
      
      // If user came from Google Auth, redirect to website step
      if (data.isGoogleAuth) {
        router.push('/onboarding/website')
        return
      }
    }
  }, [router])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single character
    
    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
    
    // Auto-submit when all codes are filled
    if (newCodes.every(code => code !== '') && newCodes.join('').length === 6) {
      setTimeout(() => {
        handleVerify()
      }, 500)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async () => {
    setIsLoading(true)
    
    try {
      // Simulate verification API call
      const verificationCode = codes.join('')
      console.log('Verifying code:', verificationCode)
      
      // Simulate successful verification
      setTimeout(() => {
        // Continue to website URL step
        router.push('/onboarding/website')
      }, 1000)
    } catch (err) {
      console.error('Verification failed:', err)
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
        className="relative z-10"
      >
        <Card className="w-full max-w-[400px] rounded-xl border border-border bg-card p-6 relative">
          {/* Navigation Arrows */}
          <NavigationArrows 
            previousPath="/onboarding/signup"
            showNext={false}
          />
          <CardHeader className="text-center pb-2">
            <CardTitle className="mb-1 text-xl font-semibold tracking-tight text-foreground">
              Verify your email
            </CardTitle>
            <CardDescription className="text-center text-sm font-normal leading-[1.4] text-muted-foreground px-4">
              We've sent a 6-digit code to {userData?.email || 'your email'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {codes.map((code, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 text-center text-lg font-mono border-border bg-background focus:ring-1 focus:ring-foreground focus:border-foreground transition-all duration-150"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              
              <Button 
                className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" 
                onClick={handleVerify}
                disabled={codes.some(code => code === '') || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { WebsiteUrlStep } from '@/components/WebsiteUrlStep'
import { useRouter } from 'next/navigation'

export default function WebsitePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [savedUrl, setSavedUrl] = useState('')
  
  // Load saved URL on mount
  useEffect(() => {
    const websiteData = localStorage.getItem('websiteData')
    if (websiteData) {
      const data = JSON.parse(websiteData)
      setSavedUrl(data.url || '')
    }
  }, [])

  const handleContinue = (url: string) => {
    setIsLoading(true)
    console.log('Analyzing website:', url)
    
    // Save URL to localStorage
    localStorage.setItem('websiteData', JSON.stringify({ url }))
    
    // Simulate analysis process - NO automatic redirect
    // User will click the "Identify your competitors" button to proceed
    setTimeout(() => {
      setIsLoading(false)
      // Keep loading state false - let user click button to proceed
    }, 9000) // 9 seconds - allows 4th loader to complete (8s) + 1s buffer
  }

  return (
    <WebsiteUrlStep 
      onContinue={handleContinue}
      isLoading={isLoading}
      initialUrl={savedUrl}
      previousPath="/onboarding/verify"
      nextPath="/onboarding/competitors"
    />
  )
}

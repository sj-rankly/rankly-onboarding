'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/AuthCard'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  // Load saved state on mount
  useEffect(() => {
    const savedData = localStorage.getItem('signupData')
    if (savedData) {
      // User has started onboarding, could pre-fill form if needed
    }
  }, [])

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate Google Auth - in real implementation, use next-auth or similar
      console.log('Google signup clicked')
      
      // Simulate successful Google Auth
      setTimeout(() => {
        // For Google Auth, skip verification and go directly to website step
        // Store Google user data
        const googleUserData = {
          firstName: 'John', // This would come from Google profile
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          company: 'Google Inc', // Extract from email domain
          isGoogleAuth: true
        }
        localStorage.setItem('signupData', JSON.stringify(googleUserData))
        
        // Skip verification step for Google Auth users
        router.push('/onboarding/website')
      }, 1000)
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (data: any) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call to register user
      console.log('Email signup data:', data)
      
      // Store user data in session/localStorage for the onboarding flow
      const emailUserData = {
        ...data,
        isGoogleAuth: false // Mark as email auth
      }
      localStorage.setItem('signupData', JSON.stringify(emailUserData))
      
      // Email users must go through verification step
      router.push('/onboarding/verify')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      mode="signup"
      onGoogleAuth={handleGoogleAuth}
      onEmailAuth={handleEmailAuth}
      isLoading={isLoading}
      error={error}
    />
  )
}

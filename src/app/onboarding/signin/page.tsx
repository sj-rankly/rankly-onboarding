'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/AuthCard'

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // No need to clear localStorage - we want to retain state for continuing onboarding

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate Google Auth - in real implementation, use next-auth or similar
      console.log('Google signin clicked')
      
      // Simulate successful Google Auth
      setTimeout(() => {
        // Store Google user data
        const googleUserData = {
          firstName: 'John', // This would come from Google profile
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: 'Example Inc', // Extract from email domain
          isGoogleAuth: true
        }
        localStorage.setItem('signupData', JSON.stringify(googleUserData))
        
        // Redirect to website URL page to continue onboarding
        router.push('/onboarding/website')
      }, 1000)
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call to authenticate user
      console.log('Email signin data:', data)
      
      // Simulate authentication check
      const isValidCredentials = data.email.includes('@') && data.password.length >= 6
      
      if (isValidCredentials) {
        // Store user data
        const emailUserData = {
          firstName: data.email.split('@')[0].split('.')[0], // Extract from email
          lastName: data.email.split('@')[0].split('.')[1] || 'User',
          email: data.email,
          company: data.email.split('@')[1].split('.')[0], // Extract domain as company
          isGoogleAuth: false
        }
        localStorage.setItem('signupData', JSON.stringify(emailUserData))
        
        // Redirect to website URL page to continue onboarding
        router.push('/onboarding/website')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      mode="signin"
      onGoogleAuth={handleGoogleAuth}
      onEmailAuth={handleEmailAuth}
      isLoading={isLoading}
      error={error}
    />
  )
}

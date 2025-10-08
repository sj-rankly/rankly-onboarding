'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [onboardingData, setOnboardingData] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    // Get all stored data from onboarding
    const signupData = localStorage.getItem('signupData')
    const campaignData = localStorage.getItem('campaignData')
    const competitorsData = localStorage.getItem('competitorsData')
    const topicsData = localStorage.getItem('topicsData')
    const personasData = localStorage.getItem('personasData')
    const regionLanguageData = localStorage.getItem('regionLanguageData')

    if (signupData) {
      setUserData(JSON.parse(signupData))
    }

    setOnboardingData({
      campaign: campaignData ? JSON.parse(campaignData) : null,
      competitors: competitorsData ? JSON.parse(competitorsData) : null,
      topics: topicsData ? JSON.parse(topicsData) : null,
      personas: personasData ? JSON.parse(personasData) : null,
      regionLanguage: regionLanguageData ? JSON.parse(regionLanguageData) : null,
    })
  }, [])

  const handleSignOut = () => {
    // Clear all stored data
    localStorage.removeItem('signupData')
    localStorage.removeItem('campaignData')
    localStorage.removeItem('competitorsData')
    localStorage.removeItem('topicsData')
    localStorage.removeItem('personasData')
    localStorage.removeItem('regionLanguageData')
    
    // Redirect to signin
    router.push('/onboarding/signin')
  }

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      {/* Background Beams */}
      <BackgroundBeams />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userData?.firstName}!</h1>
            <p className="text-muted-foreground">Your LLM visibility dashboard is ready</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</p>
              <p><strong>Email:</strong> {userData?.email}</p>
              <p><strong>Company:</strong> {userData?.company}</p>
            </CardContent>
          </Card>

          {/* Campaign Card */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign</CardTitle>
              <CardDescription>Your website being tracked</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>URL:</strong> {onboardingData.campaign?.url || 'Not set'}</p>
            </CardContent>
          </Card>

          {/* Competitors Card */}
          <Card>
            <CardHeader>
              <CardTitle>Competitors</CardTitle>
              <CardDescription>Competitors being tracked</CardDescription>
            </CardHeader>
            <CardContent>
              {onboardingData.competitors?.competitors?.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {onboardingData.competitors.competitors.map((competitor: string, index: number) => (
                    <li key={index} className="text-sm">{competitor}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No competitors added</p>
              )}
            </CardContent>
          </Card>

          {/* Topics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Topics</CardTitle>
              <CardDescription>Topics being tracked</CardDescription>
            </CardHeader>
            <CardContent>
              {onboardingData.topics?.topics?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {onboardingData.topics.topics.map((topic: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No topics selected</p>
              )}
            </CardContent>
          </Card>

          {/* Personas Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Personas</CardTitle>
              <CardDescription>Personas being tracked</CardDescription>
            </CardHeader>
            <CardContent>
              {onboardingData.personas?.personas?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {onboardingData.personas.personas.map((persona: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-sm">
                      {persona}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No personas selected</p>
              )}
            </CardContent>
          </Card>

          {/* Region & Language Card */}
          <Card>
            <CardHeader>
              <CardTitle>Region & Language</CardTitle>
              <CardDescription>Your target settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Region:</strong> {onboardingData.regionLanguage?.region || 'Not set'}</p>
              <p><strong>Language:</strong> {onboardingData.regionLanguage?.language || 'Not set'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Placeholder */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>LLM Visibility Metrics</CardTitle>
              <CardDescription>Your brand's visibility across AI platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Your analytics dashboard will be available once we start collecting data.</p>
                <p className="text-sm mt-2">This typically takes 24-48 hours after setup completion.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'

interface AuthCardProps {
  mode: 'signup' | 'signin'
  onGoogleAuth?: () => void
  onEmailAuth?: (data: any) => void
  isLoading?: boolean
  error?: string
}

export function AuthCard({ mode, onGoogleAuth, onEmailAuth, isLoading, error }: AuthCardProps) {
  const isSignup = mode === 'signup'
  
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 md:p-10 relative">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[400px] relative z-10"
      >
        <Card className="w-full rounded-xl border border-border bg-card p-6">
          <CardHeader className="text-center pb-2">
            <CardTitle className="mb-1 text-xl font-semibold tracking-tight text-foreground">
              {isSignup ? 'Get started' : 'Welcome back'}
            </CardTitle>
             <CardDescription className="text-center text-sm font-normal leading-[1.4] text-muted-foreground px-4">
               {isSignup 
                 ? 'Create your account to get more traffic from LLMs'
                 : 'Sign in to continue analyzing your LLM visibility'
               }
             </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-2">
                {/* Google Auth Button */}
                <Button 
                  variant="outline" 
                  className="h-10 w-full rounded-md border border-border bg-background font-medium text-foreground transition-all duration-150 hover:bg-muted hover:text-foreground"
                  onClick={onGoogleAuth}
                  disabled={isLoading}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>

                {/* Separator */}
                <div className="relative mx-auto w-[85%] text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-card px-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {isSignup ? 'Or continue with email' : 'Or continue with'}
                  </span>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                    {error}
                  </div>
                )}

                {/* Email/Password Form */}
                <EmailPasswordForm 
                  mode={mode} 
                  onSubmit={onEmailAuth} 
                  isLoading={isLoading}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-2 text-center text-xs text-muted-foreground">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <Link href="/onboarding/signin" className="underline hover:text-foreground text-foreground">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Link href="/onboarding/signup" className="underline hover:text-foreground text-foreground">
                Sign up
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </main>
  )
}

interface EmailPasswordFormProps {
  mode: 'signup' | 'signin'
  onSubmit?: (data: any) => void
  isLoading?: boolean
}

function EmailPasswordForm({ mode, onSubmit, isLoading }: EmailPasswordFormProps) {
  const isSignup = mode === 'signup'
  
  if (isSignup) {
    return <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
  } else {
    return <SigninForm onSubmit={onSubmit} isLoading={isLoading} />
  }
}

function SignupForm({ onSubmit, isLoading }: { onSubmit?: (data: any) => void, isLoading?: boolean }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ firstName, lastName, company, email, password })
    }
  }

  return (
    <div className="space-y-2">
      {/* First Name and Last Name side by side */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label htmlFor="firstName" className="text-xs font-medium tracking-wide text-muted-foreground">First Name</Label>
          <Input 
            id="firstName"
            type="text" 
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName" className="text-xs font-medium tracking-wide text-muted-foreground">Last Name</Label>
          <Input 
            id="lastName"
            type="text" 
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
            required
          />
        </div>
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <Label htmlFor="company" className="text-xs font-medium tracking-wide text-muted-foreground">Company</Label>
        <Input 
          id="company"
          type="text" 
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-medium tracking-wide text-muted-foreground">Email</Label>
        <Input 
          id="email"
          type="email" 
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-xs font-medium tracking-wide text-muted-foreground">Password</Label>
        <Input 
          id="password"
          type="password" 
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
          required
        />
      </div>
      
      <Button 
        type="submit"
        className="mt-2 h-10 w-full rounded-md bg-primary py-2.5 font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90" 
        disabled={isLoading || !firstName || !lastName || !email.includes('@') || email.length < 5 || !password || !company}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : 'Create account'}
      </Button>
    </div>
  )
}

function SigninForm({ onSubmit, isLoading }: { onSubmit?: (data: any) => void, isLoading?: boolean }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ email, password })
    }
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-medium tracking-wide text-muted-foreground">Email</Label>
        <Input 
          id="email"
          type="email" 
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
          required
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center">
          <Label htmlFor="password" className="text-xs font-medium tracking-wide text-muted-foreground">Password</Label>
          <a
            href="#"
            className="ml-auto text-xs underline-offset-4 hover:text-foreground text-muted-foreground"
          >
            Forgot your password?
          </a>
        </div>
        <Input 
          id="password"
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-150"
          required
        />
      </div>
      
      <Button 
        type="submit"
        className="mt-2 h-10 w-full rounded-md bg-primary py-2.5 font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90" 
        disabled={isLoading || !email.includes('@') || email.length < 5 || !password}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : 'Sign in'}
      </Button>
    </div>
  )
}
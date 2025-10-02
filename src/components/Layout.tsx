import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Switch } from './ui/switch'

interface LayoutProps {
  children: React.ReactNode
  showNav?: boolean
}

function Layout({ children, showNav = true }: LayoutProps) {
  const [isDark, setIsDark] = useState(true)
  const location = useLocation()

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(initialDark)
    document.documentElement.classList.toggle('dark', initialDark)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  const isOnboarding = location.pathname === '/' || location.pathname === '/onboarding'

  // For onboarding page, don't show the layout header
  if (isOnboarding) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      {showNav && (
        <div className="w-64 border-r border-border bg-background p-6 flex flex-col">
          <div className="space-y-2 flex-1">
            <Link
              to="/dashboard"
              className={`
                flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all
                ${location.pathname === '/dashboard'
                  ? 'text-foreground bg-muted underline underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Visibility
            </Link>
            
            <div className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Agent Analytics
            </div>
            
            <div className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Content Regeneration
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-auto pt-6 space-y-4">
            <div className="flex items-center gap-2 py-4">
              <span className="text-sm text-muted-foreground">Light</span>
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
              />
              <span className="text-sm text-muted-foreground">Dark</span>
            </div>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact us
            </a>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-black tracking-tight text-foreground font-logo">
                Rankly
              </Link>
            </div>
            
            {!showNav && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Light</span>
                  <Switch
                    checked={isDark}
                    onCheckedChange={toggleTheme}
                  />
                  <span className="text-sm text-muted-foreground">Dark</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout


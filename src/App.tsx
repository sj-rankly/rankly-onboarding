import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { OnboardingProvider } from './contexts/OnboardingContext'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

function App() {
    return (
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route
                path="/dashboard"
                element={
                  <Layout showNav={true}>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

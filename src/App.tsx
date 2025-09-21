import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { Card, CardContent } from './components/ui/card'
import { Input } from './components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

// Types
interface Competitor {
  id: string
  name: string
  url: string
}

interface Persona {
  id: string
  type: string
  description: string
}

interface Topic {
  id: string
  name: string
}

function App() {
  const [isDark, setIsDark] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Competitors state
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: '1', name: 'Competitor 1', url: 'https://competitor1.com' },
    { id: '2', name: 'Competitor 2', url: 'https://competitor2.com' },
    { id: '3', name: 'Competitor 3', url: 'https://competitor3.com' },
    { id: '4', name: 'Competitor 4', url: 'https://competitor4.com' }
  ])
  const [selectedCompetitors, setSelectedCompetitors] = useState<Set<string>>(new Set())

  // Add competitor form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCompetitorName, setNewCompetitorName] = useState('')
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('')

  // Personas state
  const [personas, setPersonas] = useState<Persona[]>([
    { 
      id: '1', 
      type: 'Marketer', 
      description: 'This persona represents marketing professionals who are looking to optimize their content strategy and improve their SEO performance through AI-powered tools.' 
    },
    { 
      id: '2', 
      type: 'Developer', 
      description: 'This persona represents developers and technical professionals who need to integrate AI solutions into their existing workflows and systems.' 
    },
    { 
      id: '3', 
      type: 'Executive', 
      description: 'This persona represents C-level executives and decision makers who are focused on ROI, business growth, and strategic implementation of new technologies.' 
    }
  ])
  const [selectedPersonas, setSelectedPersonas] = useState<Set<string>>(new Set())

  // Add persona form state
  const [showAddPersonaForm, setShowAddPersonaForm] = useState(false)
  const [newPersonaType, setNewPersonaType] = useState('')
  const [newPersonaDescription, setNewPersonaDescription] = useState('')

  // Topics state
  const [topics, setTopics] = useState<Topic[]>([
    { id: '1', name: 'Topic 1' },
    { id: '2', name: 'Topic 2' },
    { id: '3', name: 'Topic 3' }
  ])
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())

  // Add topic form state
  const [showAddTopicForm, setShowAddTopicForm] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')

  // Region & Language state
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  // Initialize theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Competitor management functions
  const updateCompetitorUrl = (id: string, newUrl: string) => {
    setCompetitors(prev => prev.map(comp => 
      comp.id === id ? { ...comp, url: newUrl } : comp
    ))
  }

  const toggleCompetitorSelection = (id: string) => {
    setSelectedCompetitors(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const removeCompetitor = (id: string) => {
    setSelectedCompetitors(prev => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
    setCompetitors(prev => prev.filter(comp => comp.id !== id))
  }

  const addCompetitor = () => {
    if (newCompetitorName.trim() && newCompetitorUrl.trim()) {
      const newCompetitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitorName.trim(),
        url: newCompetitorUrl.trim()
      }
      setCompetitors(prev => [...prev, newCompetitor])
      setNewCompetitorName('')
      setNewCompetitorUrl('')
      setShowAddForm(false)
    }
  }

  // Persona management functions
  const updatePersonaDescription = (id: string, newDescription: string) => {
    setPersonas(prev => prev.map(persona => 
      persona.id === id ? { ...persona, description: newDescription } : persona
    ))
  }

  const togglePersonaSelection = (id: string) => {
    setSelectedPersonas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const removePersona = (id: string) => {
    setSelectedPersonas(prev => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
    setPersonas(prev => prev.filter(persona => persona.id !== id))
  }

  const addPersona = () => {
    if (newPersonaType.trim() && newPersonaDescription.trim()) {
      const newPersona: Persona = {
        id: Date.now().toString(),
        type: newPersonaType.trim(),
        description: newPersonaDescription.trim()
      }
      setPersonas(prev => [...prev, newPersona])
      setNewPersonaType('')
      setNewPersonaDescription('')
      setShowAddPersonaForm(false)
    }
  }

  // Topic management functions
  const toggleTopicSelection = (id: string) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const removeTopic = (id: string) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
    setTopics(prev => prev.filter(topic => topic.id !== id))
  }

  const addTopic = () => {
    if (newTopicName.trim()) {
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: newTopicName.trim()
      }
      setTopics(prev => [...prev, newTopic])
      setNewTopicName('')
      setShowAddTopicForm(false)
    }
  }

  // Theme Toggle Component
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        // Sun icon for dark mode (click to switch to light)
        <svg className="w-3 h-3 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon for light mode (click to switch to dark)
        <svg className="w-3 h-3 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )

  // Loading Cards Component
  const LoadingCards = () => {
    const [card1Visible, setCard1Visible] = useState(false)
    const [card2Visible, setCard2Visible] = useState(false)
    const [card3Visible, setCard3Visible] = useState(false)
    const [card4Visible, setCard4Visible] = useState(false)
    
    const [card1Loaded, setCard1Loaded] = useState(false)
    const [card2Loaded, setCard2Loaded] = useState(false)
    const [card3Loaded, setCard3Loaded] = useState(false)
    const [card4Loaded, setCard4Loaded] = useState(false)

    useEffect(() => {
      if (!isAnalyzing) {
        setCard1Visible(false)
        setCard2Visible(false)
        setCard3Visible(false)
        setCard4Visible(false)
        setCard1Loaded(false)
        setCard2Loaded(false)
        setCard3Loaded(false)
        setCard4Loaded(false)
        return
      }

      console.log('LoadingCards: Starting animation')
      
      // Show card 1 immediately
      setTimeout(() => {
        console.log('LoadingCards: Showing card 1')
        setCard1Visible(true)
        // Stop spinner after 2 seconds
        setTimeout(() => {
          setCard1Loaded(true)
        }, 2000)
      }, 100)

      // Show card 2
      setTimeout(() => {
        console.log('LoadingCards: Showing card 2')
        setCard2Visible(true)
        // Stop spinner after 2 seconds
        setTimeout(() => {
          setCard2Loaded(true)
        }, 2000)
      }, 2500)

      // Show card 3
      setTimeout(() => {
        console.log('LoadingCards: Showing card 3')
        setCard3Visible(true)
        // Stop spinner after 2 seconds
        setTimeout(() => {
          setCard3Loaded(true)
        }, 2000)
      }, 5000)

      // Show card 4
      setTimeout(() => {
        console.log('LoadingCards: Showing card 4')
        setCard4Visible(true)
        // Stop spinner after 2 seconds
        setTimeout(() => {
          setCard4Loaded(true)
        }, 2000)
      }, 7500)
    }, [isAnalyzing])

    const steps = [
      { text: "Scraping URL and fetching brand context", visible: card1Visible, loaded: card1Loaded },
      { text: "Finding your closest competitors", visible: card2Visible, loaded: card2Loaded },
      { text: "Analyzing topics from your page", visible: card3Visible, loaded: card3Loaded },
      { text: "Finding user personas from your brand context", visible: card4Visible, loaded: card4Loaded }
    ]

    return (
      <div className="flex flex-col items-center justify-center h-full px-8">
        
        <div className="space-y-4 w-full max-w-lg">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700 ease-out
                ${step.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
              `}
            >
              <Card className="border-2 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <CardContent className="flex items-center gap-6 p-6">
                  {/* Spinner or Checkmark */}
                  <div className="flex-shrink-0">
                    {step.loaded ? (
                      <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center animate-in zoom-in-50 duration-300">
                        <svg className="w-5 h-5 text-background" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div 
                        className="animate-spin rounded-full border-4 border-transparent"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderTopColor: 'hsl(var(--primary))',
                          borderRightColor: 'hsl(var(--primary))',
                          borderWidth: '3px'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-lg font-medium leading-relaxed text-foreground">
                      {step.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {card4Visible && (
          <div className="mt-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <Button 
              size="lg"
              className="h-12 px-8 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => {
                console.log('Moving to competitors list')
                setIsAnalyzing(false)
                setCurrentStep(5) // Move to competitors list step
              }}
            >
              Continue to Next Step →
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Competitors List Component
  const CompetitorsList = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Competitors</h2>
          <p className="text-muted-foreground">Manage your competitor list for analysis</p>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {competitors.map((competitor) => {
            const isSelected = selectedCompetitors.has(competitor.id)
            return (
              <div
                key={competitor.id}
                className={`
                  flex items-center gap-3 justify-between rounded-lg p-3 transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'bg-muted border-2 border-foreground' 
                    : 'bg-card border border-border hover:border-muted-foreground'
                  }
                `}
                onClick={() => toggleCompetitorSelection(competitor.id)}
              >
                {/* Competitor Name Button - Not clickable for selection */}
                <div className="flex-shrink-0 font-medium text-foreground px-3 py-2">
                  {competitor.name}
                </div>

                {/* Competitor URL Input - Not clickable for selection */}
                <Input
                  value={competitor.url}
                  onChange={(e) => updateCompetitorUrl(competitor.id, e.target.value)}
                  className="flex-1 mx-2"
                  placeholder="https://example.com"
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCompetitor(competitor.id)
                  }}
                  className="flex-shrink-0 text-foreground hover:bg-muted"
                  style={{ color: 'inherit' }}
                >
                  ×
                </Button>
              </div>
            )
          })}

          {/* Add Competitor Form */}
          {showAddForm ? (
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Competitor Name"
                  value={newCompetitorName}
                  onChange={(e) => setNewCompetitorName(e.target.value)}
                />
                <Input
                  placeholder="https://example.com"
                  value={newCompetitorUrl}
                  onChange={(e) => setNewCompetitorUrl(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addCompetitor}
                  disabled={!newCompetitorName.trim() || !newCompetitorUrl.trim()}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewCompetitorName('')
                    setNewCompetitorUrl('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAddForm(true)}
            >
              + Add Competitor
            </Button>
          )}
        </div>

      </div>
    )
  }

  // Topics Component
  const Topics = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Topics</h2>
          <p className="text-muted-foreground">Select topics to generate prompts</p>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {topics.map((topic) => {
            const isSelected = selectedTopics.has(topic.id)
            return (
              <div
                key={topic.id}
                className={`
                  rounded-lg p-3 flex justify-between items-center transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'bg-muted border-2 border-foreground' 
                    : 'bg-card border border-border hover:border-muted-foreground'
                  }
                `}
                onClick={() => toggleTopicSelection(topic.id)}
              >
                {/* Topic Name - Not clickable for selection */}
                <div className="font-medium text-foreground px-3 py-2">
                  {topic.name}
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTopic(topic.id)
                  }}
                  className="flex-shrink-0 text-foreground hover:bg-muted"
                  style={{ color: 'inherit' }}
                >
                  ×
                </Button>
              </div>
            )
          })}

          {/* Add Topic Form */}
          {showAddTopicForm ? (
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <Input
                placeholder="Topic Name"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addTopic}
                  disabled={!newTopicName.trim()}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddTopicForm(false)
                    setNewTopicName('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAddTopicForm(true)}
            >
              + Add Topic
            </Button>
          )}
        </div>

      </div>
    )
  }

  // Region & Language Component
  const RegionLanguage = () => {
    const handleGeneratePrompts = () => {
      if (selectedRegion && selectedLanguage) {
        setIsGeneratingPrompts(true)
        setShowMetrics(false)
        
        // Show metrics after 4 seconds
        setTimeout(() => {
          setIsGeneratingPrompts(false)
          setShowMetrics(true)
        }, 4000)
      }
    }

    if (showMetrics) {
      // Post-loader state - Dashboard CTA
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">View Dashboard for more insights</h2>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                console.log('Opening dashboard...')
                // Future dashboard navigation
              }}
            >
              Open Dashboard →
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact us
            </a>
            <ThemeToggle />
          </div>
        </div>
      )
    }

    // Initial state - Region & Language selection
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Region & Language</h2>
            <p className="text-muted-foreground">Select your target region and language for prompt generation</p>
          </div>

          <div className="space-y-4">
            {/* Region Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select Region</option>
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="south-america">South America</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>

            {/* Language Dropdown */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
              </select>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full mt-4"
            onClick={handleGeneratePrompts}
            disabled={!selectedRegion || !selectedLanguage || isGeneratingPrompts}
          >
            {isGeneratingPrompts ? 'Generating...' : 'Generate Prompts'}
          </Button>
        </div>

      </div>
    )
  }

  // User Personas Component
  const UserPersonas = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">User Personas</h2>
          <p className="text-muted-foreground">Select personas to generate prompts</p>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {personas.map((persona) => {
            const isSelected = selectedPersonas.has(persona.id)
            return (
              <div
                key={persona.id}
                className={`
                  rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'bg-muted border-2 border-foreground' 
                    : 'bg-card border border-border hover:border-muted-foreground'
                  }
                `}
                onClick={() => togglePersonaSelection(persona.id)}
              >
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    {persona.type}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removePersona(persona.id)
                    }}
                    className="flex-shrink-0 text-foreground hover:bg-muted"
                    style={{ color: 'inherit' }}
                  >
                    ×
                  </Button>
                </div>

                {/* Description Textarea - Not clickable for selection */}
                <textarea
                  value={persona.description}
                  onChange={(e) => updatePersonaDescription(persona.id, e.target.value)}
                  className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Describe this persona..."
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                />
              </div>
            )
          })}

          {/* Add Persona Form */}
          {showAddPersonaForm ? (
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <Input
                placeholder="Persona Type (e.g., Marketer, Developer)"
                value={newPersonaType}
                onChange={(e) => setNewPersonaType(e.target.value)}
              />
              <textarea
                placeholder="Describe this persona..."
                value={newPersonaDescription}
                onChange={(e) => setNewPersonaDescription(e.target.value)}
                className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addPersona}
                  disabled={!newPersonaType.trim() || !newPersonaDescription.trim()}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddPersonaForm(false)
                    setNewPersonaType('')
                    setNewPersonaDescription('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAddPersonaForm(true)}
            >
              + Add Persona
            </Button>
          )}
        </div>

      </div>
    )
  }

  // Step 1: Email Input
  const EmailStep = () => {
    const [email, setEmail] = useState('')

    const handleContinue = () => {
      if (email.includes('@') && email.length > 5) {
        setCurrentStep(2)
      }
    }

    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted border border-border mb-4">
            <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Rankly
          </h2>
          <p className="text-muted-foreground text-lg">Let's start with your email address</p>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <Input 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-12 text-lg border-2 focus:border-foreground/50 transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {email.includes('@') && email.length > 5 ? (
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              )}
            </div>
          </div>
          
          <Button 
            className="w-full h-12 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
            size="lg"
            onClick={handleContinue}
            disabled={!email.includes('@') || email.length < 5}
          >
            Continue →
          </Button>
        </div>
        
      </div>
    )
  }

  // Step 2: Email Verification
  const VerificationStep = () => {
    const [codes, setCodes] = useState(['', '', '', '', '', ''])

    const handleCodeChange = (index: number, value: string) => {
      if (value && !/^\d$/.test(value)) return
      
      const newCodes = [...codes]
      newCodes[index] = value
      setCodes(newCodes)
      
      if (value && index < 5) {
        setTimeout(() => {
          const nextInput = document.querySelector(`input[data-code-index="${index + 1}"]`) as HTMLInputElement
          if (nextInput) {
            nextInput.focus()
          }
        }, 10)
      }
    }
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !codes[index] && index > 0) {
        const prevInput = document.querySelector(`input[data-code-index="${index - 1}"]`) as HTMLInputElement
        if (prevInput) {
          prevInput.focus()
        }
      }
    }

    const handleContinue = () => {
      const allFilled = codes.every(code => code !== '')
      if (allFilled) {
        setCurrentStep(3)
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Verify your email</h2>
          <p className="text-muted-foreground">Enter the 6-digit code we sent you</p>
        </div>
        
        <div className="flex gap-2">
          {codes.map((code, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={code}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              data-code-index={index}
              autoComplete="off"
              className="w-12 text-center"
            />
          ))}
        </div>
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleContinue}
          disabled={codes.some(code => !code)}
        >
          Continue
        </Button>

      </div>
    )
  }

  // Step 3: User Information
  const UserInfoStep = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyName, setCompanyName] = useState('')

    const handleContinue = () => {
      if (firstName && lastName && companyName) {
        setCurrentStep(4)
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tell us about yourself</h2>
          <p className="text-muted-foreground">We'll personalize your experience</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input 
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input 
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleContinue}
            disabled={!firstName || !lastName || !companyName}
          >
            Continue
          </Button>
        </div>

      </div>
    )
  }

  // Step 4: Campaign Setup
  const CampaignStep = () => {
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')

    const handleAnalyze = () => {
      if (url && name) {
        console.log('CampaignStep: Starting analysis...')
        setIsAnalyzing(true)
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Enter your website URL and campaign name</h2>
          <p className="text-muted-foreground">We'll scrape your site and prepare your campaign context.</p>
        </div>
        
        <div className="space-y-4">
          <Input 
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Input 
            placeholder="Summer Campaign 2025"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleAnalyze}
            disabled={!url || !name || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze →'}
          </Button>
        </div>

      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <EmailStep />
      case 2: return <VerificationStep />
      case 3: return <UserInfoStep />
      case 4: return <CampaignStep />
      case 5: return <CompetitorsList />
      case 6: return <Topics />
      case 7: return <UserPersonas />
      case 8: return <RegionLanguage />
      default: return <EmailStep />
    }
  }

  // Right Panel Component
  const RightPanel = () => {
    if (isAnalyzing) {
      return <LoadingCards />
    }

    if (currentStep === 5) {
      // Competitors step - show Next button
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Button
            size="lg"
            className="px-8 py-4 text-lg"
            onClick={() => setCurrentStep(6)}
          >
            Next →
          </Button>
        </div>
      )
    }

    if (currentStep === 6) {
      // Topics step - show Next button only
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Button
            size="lg"
            className="px-8 py-4 text-lg"
            onClick={() => setCurrentStep(7)}
          >
            Next →
          </Button>
        </div>
      )
    }

    if (currentStep === 7) {
      // Personas step - show Next button only
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Button
            size="lg"
            className="px-8 py-4 text-lg"
            onClick={() => setCurrentStep(8)}
          >
            Next →
          </Button>
        </div>
      )
    }

    if (currentStep === 8) {
      // Region & Language step - show loader or metrics
      if (isGeneratingPrompts) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div 
                  className="animate-spin rounded-full border-4 border-transparent"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderTopColor: 'hsl(var(--primary))',
                    borderRightColor: 'hsl(var(--primary))',
                    borderWidth: '4px'
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Generating prompts based on</h3>
              <p className="text-muted-foreground mb-6">
                Topics × User Personas × Region × Language
              </p>
              
              {/* AI Platform Logos */}
              <div className="flex flex-row items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="OpenAI" />
                    <AvatarFallback className="bg-foreground text-background font-bold text-lg">AI</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">OpenAI</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src="https://seeklogo.com/images/G/google-gemini-logo-A5787B2662-seeklogo.com.png" alt="Gemini" />
                    <AvatarFallback className="bg-foreground text-background font-bold text-lg">G</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Gemini</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src="https://seeklogo.com/images/A/anthropic-claude-logo-3D4A2A3B6A-seeklogo.com.png" alt="Claude" />
                    <AvatarFallback className="bg-foreground text-background font-bold text-lg">C</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Claude</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-16 h-16 border-2 border-border">
                    <AvatarImage src="https://seeklogo.com/images/P/perplexity-ai-logo-7F4B3B3B3B-seeklogo.com.png" alt="Perplexity" />
                    <AvatarFallback className="bg-foreground text-background font-bold text-lg">P</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Perplexity</span>
                </div>
              </div>
            </div>
          </div>
        )
      }

      if (showMetrics) {
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <div className="space-y-4 w-full max-w-sm">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">78%</div>
                <div className="text-sm font-medium text-foreground mb-1">Impression Share</div>
                <div className="text-xs text-muted-foreground">
                  Shows how much of the answer is about this brand.
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">67%</div>
                <div className="text-sm font-medium text-foreground mb-1">Visibility Score</div>
                <div className="text-xs text-muted-foreground">
                  Shows how prominently the brand appears, giving more weight to earlier mentions.
                </div>
              </div>
            </div>
          </div>
        )
      }

      // Initial state - show AI logos and prompt generation text
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Generating prompts based on</h3>
            <p className="text-muted-foreground mb-6">
              Topics × User Personas × Region × Language
            </p>
            
            {/* AI Platform Logos */}
            <div className="flex flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="OpenAI" />
                  <AvatarFallback className="bg-foreground text-background font-bold text-lg">AI</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">OpenAI</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src="https://seeklogo.com/images/G/google-gemini-logo-A5787B2662-seeklogo.com.png" alt="Gemini" />
                  <AvatarFallback className="bg-foreground text-background font-bold text-lg">G</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Gemini</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src="https://seeklogo.com/images/A/anthropic-claude-logo-3D4A2A3B6A-seeklogo.com.png" alt="Claude" />
                  <AvatarFallback className="bg-foreground text-background font-bold text-lg">C</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Claude</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src="https://seeklogo.com/images/P/perplexity-ai-logo-7F4B3B3B3B-seeklogo.com.png" alt="Perplexity" />
                  <AvatarFallback className="bg-foreground text-background font-bold text-lg">P</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Perplexity</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Default - show headline
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <h2 className="text-5xl font-black tracking-tight text-foreground">
            Get more traffic from LLMs
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Transform your content strategy with AI-powered insights and competitor analysis
        </p>
        <div className="flex justify-center space-x-2 mt-8">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-pulse"
              style={{ animationDelay: `${dot * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Half - Dynamic Content */}
      <div className="flex-1 relative bg-background">
        {/* Brand Logo - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <h1 
            className="text-3xl font-black tracking-tight text-foreground"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              letterSpacing: '-0.02em',
              fontWeight: '900'
            }}
          >
            Rankly
          </h1>
        </div>
        
        {/* Contact Us & Theme Toggle - Bottom Left */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex flex-col gap-3">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact us
            </a>
            <ThemeToggle />
          </div>
        </div>
        
        {/* Main Content - Centered */}
        <div className="p-8 flex items-center justify-center h-full">
          <div className="w-full max-w-md">
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Half - Visual/Headline */}
      <div className="flex-1 relative flex items-center justify-center bg-dot-pattern overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-muted/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-muted/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-muted/3 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10">
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default App
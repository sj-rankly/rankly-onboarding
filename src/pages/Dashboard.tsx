import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

// Types
interface Prompt {
  id: number
  text: string
  title: string
  createdAt: number
}

interface Topic {
  id: number
  name: string
  lastUpdated: number
  prompts: Prompt[]
}

// Collapsible Topic Component
const CollapsibleTopic: React.FC<{
  topic: Topic
  onAddPrompt: (topicId: number, promptText: string) => void
  onUpdatePrompt: (promptId: number, newText: string) => void
  onDeletePrompt: (promptId: number) => void
}> = ({ topic, onAddPrompt, onUpdatePrompt, onDeletePrompt }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newPrompt, setNewPrompt] = useState('')

  const handleAddPrompt = () => {
    if (newPrompt.trim()) {
      onAddPrompt(topic.id, newPrompt.trim())
      setNewPrompt('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPrompt()
    }
  }

  return (
    <div className="border-2 border-border rounded-lg mb-2 bg-card">
      <button 
        className="w-full px-4 py-3 border-b-2 border-border flex items-center justify-between font-semibold text-foreground hover:bg-muted transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <span>{topic.name}</span>
        </div>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-3 border-t border-border">
          {/* Simple Prompt Cards */}
          <div className="space-y-2 mb-3">
            {topic.prompts.map(prompt => (
              <div 
                key={prompt.id}
                className="bg-card border-2 border-border rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{prompt.text}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeletePrompt(prompt.id)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Prompt */}
          <div className="border-t border-border pt-3">
            <div className="flex gap-2">
              <Input
                type="text"
                className="flex-1"
                placeholder="Add new prompt..."
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                onClick={handleAddPrompt}
              >
                Add Prompt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Prompt Chaining Visualization Component
const PromptChaining: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Prompt Chaining</h2>
      
      <div className="flex items-center justify-center gap-12 p-8 relative">
        {/* Central Node */}
        <div className="bg-foreground text-background border-2 border-foreground rounded-xl p-6 min-w-[200px] text-center flex flex-col items-center gap-2 z-10 relative">
          <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
          <span className="font-semibold">Brand Analysis</span>
        </div>

        {/* Branching Lines - SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <line x1="40%" y1="50%" x2="60%" y2="30%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="40%" y1="50%" x2="60%" y2="50%" stroke="hsl(var(--border))" strokeWidth="2" />
          <line x1="40%" y1="50%" x2="60%" y2="70%" stroke="hsl(var(--border))" strokeWidth="2" />
        </svg>

        {/* Chained Nodes */}
        <div className="flex flex-col gap-8 z-10 relative">
          <div className="bg-card border-2 border-border rounded-xl p-4 text-sm min-w-[180px] max-w-[220px]">
            Compare brand mentions with competitors
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-sm min-w-[180px] max-w-[220px]">
            Track brand sentiment in AI responses
          </div>
          <div className="bg-card border-2 border-border rounded-xl p-4 text-sm min-w-[180px] max-w-[220px]">
            Identify trending topics in our industry
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
function Dashboard() {
  const [activeTab, setActiveTab] = useState('prompts')
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      name: 'Brand Visibility',
      lastUpdated: Date.now() - 86400000,
      prompts: [
        { id: 1, text: 'Analyze brand visibility across AI platforms', title: 'Brand Visibility Analysis', createdAt: Date.now() - 86400000 },
        { id: 2, text: 'Compare brand mentions with competitors', title: 'Competitor Comparison', createdAt: Date.now() - 172800000 },
        { id: 3, text: 'Track brand sentiment in AI responses', title: 'Sentiment Tracking', createdAt: Date.now() - 259200000 }
      ]
    },
    {
      id: 2,
      name: 'Market Analysis',
      lastUpdated: Date.now() - 43200000,
      prompts: [
        { id: 4, text: 'Identify trending topics in our industry', title: 'Trend Identification', createdAt: Date.now() - 43200000 },
        { id: 5, text: 'Analyze competitor positioning strategies', title: 'Positioning Analysis', createdAt: Date.now() - 129600000 },
        { id: 6, text: 'Track market sentiment changes', title: 'Market Sentiment', createdAt: Date.now() - 216000000 }
      ]
    },
    {
      id: 3,
      name: 'Content Optimization',
      lastUpdated: Date.now() - 21600000,
      prompts: [
        { id: 7, text: 'Optimize content for AI search visibility', title: 'SEO Optimization', createdAt: Date.now() - 21600000 },
        { id: 8, text: 'Improve brand mention accuracy', title: 'Brand Accuracy', createdAt: Date.now() - 86400000 },
        { id: 9, text: 'Enhance content for better AI responses', title: 'Content Enhancement', createdAt: Date.now() - 151200000 }
      ]
    }
  ])

  const tabs = [
    { id: 'prompts', label: 'Prompts' },
    { id: 'visibility', label: 'Visibility' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'topics', label: 'Topics' },
    { id: 'citations', label: 'Citations' }
  ]

  const handleAddPrompt = (topicId: number, promptText: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const newPrompt: Prompt = {
          id: Date.now(),
          text: promptText,
          title: `New Prompt ${Date.now()}`,
          createdAt: Date.now()
        }
        return {
          ...topic,
          prompts: [...topic.prompts, newPrompt],
          lastUpdated: Date.now()
        }
      }
      return topic
    }))
  }

  const handleUpdatePrompt = (promptId: number, newText: string) => {
    setTopics(prev => prev.map(topic => ({
      ...topic,
      prompts: topic.prompts.map(prompt => 
        prompt.id === promptId ? { ...prompt, text: newText } : prompt
      ),
      lastUpdated: Date.now()
    })))
  }

  const handleDeletePrompt = (promptId: number) => {
    setTopics(prev => prev.map(topic => ({
      ...topic,
      prompts: topic.prompts.filter(prompt => prompt.id !== promptId),
      lastUpdated: Date.now()
    })))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'prompts':
        return (
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 h-full">
            {/* Left Section - Prompts List */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold">Prompts</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Manage and organize your AI prompts by topic.
                </p>
              </div>
              
              {/* Collapsible Topics */}
              <div className="space-y-2">
                {topics.map(topic => (
                  <CollapsibleTopic
                    key={topic.id}
                    topic={topic}
                    onAddPrompt={handleAddPrompt}
                    onUpdatePrompt={handleUpdatePrompt}
                    onDeletePrompt={handleDeletePrompt}
                  />
                ))}
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="w-px bg-border mx-4"></div>

            {/* Right Section - Workflow Builder */}
            <div className="bg-[radial-gradient(circle,hsl(var(--muted))_1px,transparent_1px)] [background-size:20px_20px] p-8 rounded-lg border border-border">
              <PromptChaining />
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold">{tabs.find(t => t.id === activeTab)?.label}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {activeTab} analytics content will be implemented here.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Metrics</h3>
              <p className="text-sm text-muted-foreground">Detailed {activeTab} analysis coming soon.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 p-6">
      {/* Tabs Navigation */}
      <div className="flex items-center mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`
              relative flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? 'text-foreground underline underline-offset-4' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}

export default Dashboard


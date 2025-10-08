'use client'

import React from 'react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, stepNames }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100
  
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-4 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border/40 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {stepNames[currentStep - 1]}
        </span>
      </div>
    </div>
  )
}

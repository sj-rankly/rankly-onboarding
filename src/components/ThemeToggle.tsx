import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Switch } from './ui/switch'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Light</span>
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
      />
      <span className="text-sm text-muted-foreground">Dark</span>
    </div>
  )
}


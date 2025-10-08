'use client'

import { motion } from 'framer-motion'

export function ContactButton() {
  return (
    <motion.a
      href="mailto:support@rankly.ai"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-lg bg-transparent px-3 py-2 text-sm text-foreground hover:bg-gray-800/50 hover:text-foreground transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Contact us
    </motion.a>
  )
}

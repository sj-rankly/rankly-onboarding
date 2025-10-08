'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-logo text-foreground">
          Rankly
        </span>
      </Link>
    </motion.div>
  )
}

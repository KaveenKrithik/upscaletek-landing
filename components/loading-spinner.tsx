"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="relative w-40 h-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 border-4 border-purple-600/30 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Middle circle */}
        <motion.div
          className="absolute inset-4 border-4 border-purple-500/50 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Inner circle */}
        <motion.div
          className="absolute inset-8 border-4 border-purple-400/70 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* Spinning arc */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        className="mt-8 text-xl font-medium text-purple-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        We're building something amazing...
      </motion.p>
    </div>
  )
}

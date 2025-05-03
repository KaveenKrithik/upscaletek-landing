"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Track page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
    console.log(`Page loaded in ${loadTime}ms`)

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )
      const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100

      // Log scroll depth at 25%, 50%, 75%, and 100%
      if (scrollPercent >= 25 && scrollPercent < 50) {
        console.log("Scroll depth: 25%")
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        console.log("Scroll depth: 50%")
      } else if (scrollPercent >= 75 && scrollPercent < 100) {
        console.log("Scroll depth: 75%")
      } else if (scrollPercent >= 100) {
        console.log("Scroll depth: 100%")
      }
    }

    window.addEventListener("scroll", trackScrollDepth)

    return () => {
      window.removeEventListener("scroll", trackScrollDepth)
    }
  }, [])

  return null
}

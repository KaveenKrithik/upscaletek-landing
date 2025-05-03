"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function Construction() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    // Construction animation variables
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    const createParticles = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: `hsl(${Math.random() * 60 + 250}, 100%, 75%)`,
        })
      }
    }

    createParticles()

    // Draw construction text and gear
    const drawConstruction = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }
      })

      // Draw gear icon
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const outerRadius = 60
      const innerRadius = 45
      const teethCount = 8

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(Date.now() * 0.001) // Rotate gear

      // Draw outer gear
      ctx.beginPath()
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2
        const nextAngle = ((i + 1) / teethCount) * Math.PI * 2
        const midAngle = (angle + nextAngle) / 2

        ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius)
        ctx.lineTo(Math.cos(midAngle) * (outerRadius + 15), Math.sin(midAngle) * (outerRadius + 15))
        ctx.lineTo(Math.cos(nextAngle) * outerRadius, Math.sin(nextAngle) * outerRadius)
      }
      ctx.closePath()

      // Draw inner circle
      ctx.moveTo(innerRadius, 0)
      ctx.arc(0, 0, innerRadius, 0, Math.PI * 2)

      // Fill and stroke
      ctx.fillStyle = "#6d28d9"
      ctx.fill()
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.restore()
      ctx.font = "bold 24px sans-serif"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("PAGE UNDER", centerX, centerY + 100)
      ctx.fillText("CONSTRUCTION", centerX, centerY + 130)

      requestAnimationFrame(drawConstruction)
    }

    drawConstruction()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
    </motion.div>
  )
}

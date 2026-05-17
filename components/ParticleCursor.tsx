'use client'

import { useEffect, useRef } from 'react'

export default function ParticleCursor() {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    let particles: any[] = []

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    // CANVAS SIZE
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)

    // CREATE PARTICLES
    const createParticles = (x: number, y: number) => {

      for (let i = 0; i < 4; i++) {

        particles.push({

          x,
          y,

          size: Math.random() * 8 + 2,

          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,

          life: 100,
        })
      }
    }

    // DESKTOP
    const handleMouseMove = (e: MouseEvent) => {

      mouse.x = e.clientX
      mouse.y = e.clientY

      createParticles(mouse.x, mouse.y)
    }

    // MOBILE
    const handleTouchMove = (e: TouchEvent) => {

      const touch = e.touches[0]

      if (!touch) return

      mouse.x = touch.clientX
      mouse.y = touch.clientY

      createParticles(mouse.x, mouse.y)
    }

    window.addEventListener('mousemove', handleMouseMove)

    window.addEventListener('touchmove', handleTouchMove)

    // ANIMATION
    const animate = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {

        particle.x += particle.speedX
        particle.y += particle.speedY

        particle.life -= 1

        ctx.beginPath()

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        )

        // RUBY RED
        gradient.addColorStop(0, 'rgba(155,28,28,0.95)')

        // GOLD
        gradient.addColorStop(0.5, 'rgba(212,160,23,0.7)')

        // ROSE GOLD
        gradient.addColorStop(1, 'rgba(183,110,121,0)')

        ctx.fillStyle = gradient

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        )

        ctx.fill()

        // REMOVE
        if (particle.life <= 0) {
          particles.splice(index, 1)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {

      window.removeEventListener('mousemove', handleMouseMove)

      window.removeEventListener('touchmove', handleTouchMove)

      window.removeEventListener('resize', resizeCanvas)
    }

  }, [])

  return (

    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  )
}
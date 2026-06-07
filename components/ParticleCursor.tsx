'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  life: number
  color: string
}

export default function ParticleCursor() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    let animationFrameId: number

    let particles: Particle[] = []

    // PERFORMANCE LIMIT
    const MAX_PARTICLES = 80

    // CANVAS SIZE
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // CREATE PARTICLES
    const createParticles = (
      x: number,
      y: number
    ) => {
      // LIMIT PARTICLES
      if (
        particles.length >
        MAX_PARTICLES
      ) {
        particles.splice(
          0,
          particles.length -
            MAX_PARTICLES
        )
      }

      for (let i = 0; i < 2; i++) {
        particles.push({
          x,
          y,

          size:
            Math.random() * 4 + 1,

          speedX:
            (Math.random() - 0.5) *
            1.5,

          speedY:
            (Math.random() - 0.5) *
            1.5,

          life: 35,

          color:
            Math.random() > 0.5
              ? '#9B1C1C'
              : '#D4A017',
        })
      }
    }

    // MOUSE MOVE
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      createParticles(
        e.clientX,
        e.clientY
      )
    }

    // TOUCH MOVE
    const handleTouchMove = (
      e: TouchEvent
    ) => {
      const touch = e.touches[0]

      if (!touch) return

      createParticles(
        touch.clientX,
        touch.clientY
      )
    }

    // EVENTS
    window.addEventListener(
      'mousemove',
      handleMouseMove
    )

    window.addEventListener(
      'touchmove',
      handleTouchMove,
      {
        passive: true,
      }
    )

    window.addEventListener(
      'resize',
      resizeCanvas
    )

    // ANIMATION
    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      particles.forEach((particle) => {
        particle.x += particle.speedX

        particle.y += particle.speedY

        particle.life--

        // SIMPLE OPACITY
        const opacity =
          particle.life / 35

        ctx.beginPath()

        // LIGHT GLOW
        ctx.shadowBlur = 10

        ctx.shadowColor =
          particle.color

        ctx.fillStyle =
          particle.color
            .replace(
              ')',
              `, ${opacity})`
            )
            .replace(
              'rgb',
              'rgba'
            ) || particle.color

        // RUBY RED + GOLD
        ctx.globalAlpha = opacity

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        )

        ctx.fill()
      })

      // RESET
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      // REMOVE DEAD
      particles = particles.filter(
        (particle) =>
          particle.life > 0
      )

      animationFrameId =
        requestAnimationFrame(
          animate
        )
    }

    animate()

    return () => {
      cancelAnimationFrame(
        animationFrameId
      )

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      window.removeEventListener(
        'touchmove',
        handleTouchMove
      )

      window.removeEventListener(
        'resize',
        resizeCanvas
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="
        fixed
        inset-0
        pointer-events-none
        z-[9998]
      "
    />
  )
}
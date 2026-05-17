'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {

    const moveCursor = (e: MouseEvent) => {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      })

      const target = e.target as HTMLElement

      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }

  }, [])

  return (

    <>
      {/* OUTER CURSOR */}
      <div
        className={`
          fixed top-0 left-0 pointer-events-none z-[99999]
          rounded-full border transition-all duration-200 ease-out
          hidden md:block
          ${isPointer
            ? 'w-16 h-16 border-[#D4A017] bg-[#D4A017]/10'
            : 'w-10 h-10 border-[#9B1C1C]/40 bg-[#9B1C1C]/5'
          }
        `}
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      />

      {/* INNER DOT */}
      <div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#9B1C1C] pointer-events-none z-[99999] hidden md:block"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
        }}
      />
    </>
  )
}
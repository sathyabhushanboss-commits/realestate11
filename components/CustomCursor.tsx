'use client'

import { useEffect, useRef, useState } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    // Touch phones and tablets keep their normal behaviour
    if (!window.matchMedia(FINE_POINTER).matches) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      setEnabled(true)
      // Move with transforms directly so the cursor never waits on React renders
      if (ringRef.current) ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

      const target = e.target as HTMLElement
      setIsPointer(!!target.closest('a, button, input, textarea, select, label, summary'))
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-150 ease-out"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
            isPointer ? 'w-14 h-14 border-gold bg-gold/10' : 'w-9 h-9 border-ruby/40'
          }`}
        />
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[99999]">
        <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ruby" />
      </div>
    </>
  )
}

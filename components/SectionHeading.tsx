import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  light?: boolean
}) {
  const centered = align === 'center'

  return (
    <Reveal className={centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}>
      <p className={`eyebrow ${light ? 'eyebrow-light' : ''} ${centered ? 'justify-center' : ''}`}>
        {eyebrow}
      </p>
      <h2 className={`heading-lg mt-5 ${light ? '!text-white' : ''}`}>{title}</h2>
      {description && (
        <p className={`lead mt-5 ${light ? '!text-white/70' : ''}`}>{description}</p>
      )}
    </Reveal>
  )
}

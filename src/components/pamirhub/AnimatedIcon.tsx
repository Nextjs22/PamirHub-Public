'use client'

import React, { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface AnimatedIconProps {
  icon: React.ReactNode
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  iconClassName?: string
  labelClassName?: string
  variant?: 'default' | 'outline' | 'subtle'
  onClick?: () => void
}

const sizeMap = {
  sm: 'h-8 w-8 md:h-10 md:w-10',
  md: 'h-12 w-12 md:h-14 md:w-14',
  lg: 'h-16 w-16 md:h-20 md:w-20'
}

const variantMap = {
  default: 'bg-transparent border-border shadow-sm dark:border-slate-700',
  outline: 'bg-transparent border-border dark:border-slate-600',
  subtle: 'bg-transparent border-transparent dark:border-transparent'
}

export function AnimatedIcon({
  icon,
  label,
  size = 'md',
  className,
  iconClassName,
  labelClassName,
  variant = 'default',
  onClick
}: AnimatedIconProps) {
  const controls = useAnimation()

  const handleMouseEnter = () => {
    controls.start({
      scale: [1, 1.1, 1],
      y: [0, -4, 0],
      transition: { duration: 0.8 }
    })
  }

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [1, 1.05, 1],
        y: [0, -2, 0],
        transition: { duration: 1.2, ease: 'easeInOut' }
      })
      setTimeout(sequence, 3000)
    }

    sequence()
  }, [controls])

  return (
    <div className={cn('flex flex-col items-center', className)} data-dark-mode-supported='true'>
      <motion.div
        className={cn(
          'relative flex items-center justify-center rounded-full border',
          sizeMap[size],
          variantMap[variant],
          'transition-colors duration-200',
          'shadow-[0px_0px_8px_0px_rgba(0,0,0,0.08)]',
          'dark:shadow-[0px_0px_8px_0px_rgba(255,255,255,0.08)]',
          'hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.12)]',
          'dark:hover:shadow-[0px_0px_16px_0px_rgba(255,255,255,0.12)]',
          iconClassName
        )}
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        style={
          {
            '--icon-background': 'transparent',
            '--icon-border-color': 'currentColor'
          } as React.CSSProperties
        }
      >
        <Sparkles />
        {icon}
      </motion.div>
      {label && (
        <span className={cn('mt-2 text-xs md:text-sm font-medium text-foreground dark:text-slate-200', labelClassName)}>
          {label}
        </span>
      )}
    </div>
  )
}

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1
  const randomOpacity = () => Math.random() * 0.6 + 0.4 // Higher minimum opacity (0.4-1.0)
  const random = () => Math.random()

  return (
    <div className='absolute inset-0 overflow-hidden rounded-full'>
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0]
          }}
          transition={{
            duration: random() * 2 + 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: '50%',
            zIndex: 1
          }}
          className='inline-block bg-primary/60 dark:bg-red-500/70'
        />
      ))}
    </div>
  )
}
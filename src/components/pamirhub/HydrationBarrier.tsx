'use client'

import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'

interface HydrationBarrierProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * A component that prevents hydration errors by only rendering its children on the client side.
 * On the server, it renders nothing or an optional fallback.
 */
export function HydrationBarrier({ children, fallback }: HydrationBarrierProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fading out after a short delay
    const timer = setTimeout(() => {
      setFading(true)
      // Completely remove after fade out transition
      setTimeout(() => setLoading(false), 800)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <img
          src="/lamar-logo-splash.png"
          alt="Lamar Loading"
          style={{
            height: 110,
            width: 'auto',
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <div style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1rem', color: 'var(--teal)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          LAMAR
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          50% { opacity: 0.8; transform: scale(0.97); filter: drop-shadow(0 0 10px rgba(212,175,55,0.2)); }
        }
      `}</style>
    </div>
  )
}

// src/hooks/useTilt.js
//
// This hook replaces the vanilla JS mouse-tracking 3D tilt
// that was in my original script block.
//
// USAGE:
//   const tiltRef = useTilt({ maxTilt: 12, scale: 1.02 })
//   return <div ref={tiltRef} className="project-card">...</div>

import { useEffect, useRef } from 'react'

export default function useTilt(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { maxTilt = 12, perspective = 1000, scale = 1.02 } = options

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rotX = -y * maxTilt
      const rotY = x * maxTilt
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
      el.style.transition = 'none'
    }

    const onMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
      el.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
    }

    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [options.maxTilt, options.perspective, options.scale])

  return ref
}

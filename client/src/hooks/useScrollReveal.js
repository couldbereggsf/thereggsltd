// src/hooks/useScrollReveal.js
//
// This hook replaces the vanilla JS IntersectionObserver logic
// that was in my original index.html script block.
//
// HOW IT WORKS:
// I call useScrollReveal() inside any component.
// It returns a ref I attach to a container element.
// Every child inside that container that has the class "reveal"
// will animate in when it scrolls into view.
//
// USAGE IN A COMPONENT:
//   const sectionRef = useScrollReveal()
//   return <section ref={sectionRef}>
//     <h2 className="reveal">Hello</h2>
//     <p className="reveal rd1">World</p>   ← rd1/rd2/rd3 add stagger delays
//   </section>

import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Once visible, stop watching — no need to re-animate
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    )

    // Watch every element inside the container that has class "reveal"
    const targets = el.querySelectorAll('.reveal')
    targets.forEach((target) => observer.observe(target))

    // Cleanup when component unmounts
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}

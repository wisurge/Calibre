'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGsapAnimationsProps {
  prefersReducedMotion?: boolean
}

export function useGsapAnimations({ prefersReducedMotion = false }: UseGsapAnimationsProps = {}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero Timeline - Orchestrated entrance
      const heroTimeline = gsap.timeline()

      // Hero section - completely static, no animations
      if (headlineRef.current) {
        gsap.set(headlineRef.current, { opacity: 1 })
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 1 })
      }

      // CTA buttons - completely static, no animations
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button')
        
        // Set buttons to be visible and static
        gsap.set(buttons, {
          opacity: 1,
          scale: 1,
          y: 0
        })
      }

      // Feature sections scroll-followed animations
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.feature-card')
        
        featureCards.forEach((card, index) => {
          const isEven = index % 2 === 0
          
          // Separate image and content elements
          const featureImage = card.querySelector('.feature-image')
          const featureContent = card.querySelector('.feature-content')
          
          // Animate feature image with scale-only animation
          if (featureImage) {
            gsap.set(featureImage, {
              scale: 0.9,
              y: 20
            })
            
            gsap.to(featureImage, {
              scale: 1,
              y: 0,
              ease: 'none', // Linear animation that follows scroll
              scrollTrigger: {
                trigger: card,
                start: 'top 100%', // Start when card enters viewport
                end: 'top 30%', // End when card is 30% into viewport
                scrub: 0.8, // Smooth scroll following
                toggleActions: 'play none none reverse'
              }
            })
          }

          // Animate feature content with scale-only animation
          if (featureContent) {
            const contentElements = featureContent.querySelectorAll('.feature-icon, .feature-title, .feature-subtitle, .feature-description, .feature-button')
            
            gsap.set(contentElements, {
              scale: 0.95,
              y: 10
            })
            
            gsap.to(contentElements, {
              scale: 1,
              y: 0,
              stagger: 0.05, // Subtle stagger for performance
              ease: 'none', // Linear animation that follows scroll
              scrollTrigger: {
                trigger: card,
                start: 'top 80%', // Start when card is 80% into viewport
                end: 'top 20%', // End when card is 20% into viewport
                scrub: 1, // Smooth scroll following
                toggleActions: 'play none none reverse'
              }
            })
          }
        })
      }

      // Testimonial cards scale-only animation
      if (testimonialsRef.current) {
        const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card')
        
        testimonialCards.forEach((card, index) => {
          // Set initial state with scale-only positioning
          gsap.set(card, {
            y: 30,
            scale: 0.95
          })
          
          // Animate card entrance with scale-only animation
          gsap.to(card, {
            y: 0,
            scale: 1,
            ease: 'none', // Linear animation that follows scroll
            scrollTrigger: {
              trigger: card,
              start: 'top 100%', // Start when card enters viewport
              end: 'top 30%', // End when card is 30% into viewport
              scrub: 0.8, // Smooth scroll following
              toggleActions: 'play none none reverse'
            }
          })

          // Star ratings scale-only animation
          const stars = card.querySelectorAll('.star-rating')
          gsap.set(stars, {
            scale: 0.8
          })
          
          gsap.to(stars, {
            scale: 1,
            stagger: 0.05, // Subtle stagger for performance
            ease: 'none', // Linear animation that follows scroll
            scrollTrigger: {
              trigger: card,
              start: 'top 80%', // Start when card is 80% into viewport
              end: 'top 20%', // End when card is 20% into viewport
              scrub: 1, // Smooth scroll following
              toggleActions: 'play none none reverse'
            }
          })
        })
      }

      // Footer - no animation, stays static
      if (footerRef.current) {
        gsap.set(footerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return {
    heroRef,
    headlineRef,
    subtitleRef,
    ctaRef,
    featuresRef,
    testimonialsRef,
    footerRef
  }
}

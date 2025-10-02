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

      // Hero headline animation with word-by-word effect
      if (headlineRef.current) {
        const headline = headlineRef.current
        
        // Get all text nodes and split them into words
        const splitTextIntoWords = (element: HTMLElement) => {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
          )
          
          const textNodes: Text[] = []
          let node
          while (node = walker.nextNode()) {
            textNodes.push(node as Text)
          }
          
          textNodes.forEach(textNode => {
            const parent = textNode.parentElement
            if (!parent) return
            
            const text = textNode.textContent || ''
            const words = text.split(/(\s+)/) // Split by whitespace but keep the spaces
            
            words.forEach(word => {
              if (word.trim()) {
                const span = document.createElement('span')
                span.textContent = word
                span.style.display = 'inline-block'
                span.style.opacity = '0'
                span.style.transform = 'translateY(30px)'
                parent.insertBefore(span, textNode)
              } else if (word) {
                // Keep whitespace
                const span = document.createElement('span')
                span.textContent = word
                span.style.display = 'inline-block'
                parent.insertBefore(span, textNode)
              }
            })
            
            parent.removeChild(textNode)
          })
        }

        // Apply split text
        splitTextIntoWords(headline)
        const wordElements = headline.querySelectorAll('span')
        
        // Set initial state
        gsap.set(wordElements, {
          opacity: 0,
          y: 30,
          scale: 0.9
        })

        // Animate words sequentially with infinite loop
        heroTimeline.to(wordElements, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 1.5,
            from: 'start'
          },
          ease: 'power2.out'
        })
        .to(wordElements, {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.4,
          stagger: {
            amount: 1.5,
            from: 'end'
          },
          ease: 'power2.in'
        }, '+=2') // Wait 2 seconds before starting fade out
        .set(wordElements, {
          y: 30,
          scale: 0.9
        })
        .repeat(-1) // Infinite loop
      }

      // Subtitle animation
      if (subtitleRef.current) {
        const subtitle = subtitleRef.current
        const words = subtitle.textContent?.split(' ') || []
        
        subtitle.innerHTML = ''
        words.forEach(word => {
          const span = document.createElement('span')
          span.textContent = word + ' '
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(20px)'
          subtitle.appendChild(span)
        })

        const wordElements = subtitle.querySelectorAll('span')
        
        heroTimeline.to(wordElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }, '-=0.8')
      }

      // CTA buttons animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button')
        
        heroTimeline.fromTo(buttons, 
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          }, '-=0.4'
        )

        // Primary CTA button pulse animation
        const primaryButton = buttons[0]
        if (primaryButton) {
          gsap.to(primaryButton, {
            scale: 1.02,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })

          // Hover effects
          primaryButton.addEventListener('mouseenter', () => {
            gsap.to(primaryButton, {
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })

          primaryButton.addEventListener('mouseleave', () => {
            gsap.to(primaryButton, {
              scale: 1.02,
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.1)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })
        }
      }

      // Feature sections scroll-triggered animations
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.feature-card')
        
        featureCards.forEach((card, index) => {
          const isEven = index % 2 === 0
          const direction = isEven ? -50 : 50
          
          gsap.fromTo(card,
            { 
              opacity: 0, 
              x: direction,
              scale: 0.95
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )

          // Stagger child elements
          const childElements = card.querySelectorAll('.feature-icon, .feature-title, .feature-description, .feature-button')
          gsap.fromTo(childElements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }

      // Testimonial cards animation
      if (testimonialsRef.current) {
        const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card')
        
        testimonialCards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          )

          // Star ratings scale animation
          const stars = card.querySelectorAll('.star-rating')
          gsap.fromTo(stars,
            { scale: 0, rotation: 180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }

      // Footer simple fade-in
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )
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

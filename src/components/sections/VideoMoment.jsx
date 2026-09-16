import { useEffect, useRef, useState } from 'react'
import { HiPlay } from 'react-icons/hi'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import ResponsiveImage from '../media/ResponsiveImage'
import { videoPoster } from '../../data/images'
import { videoMomentContent } from '../../data/homepage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../utils/cn'

const VIDEO_SRC = '/videos/flooring-ambient-loop.mp4'

// Premium "visual break" section between the material story and the final
// CTA. The poster image is always in the DOM as the fallback — it only
// fades out once the video actually starts playing (`onPlaying`), so a
// slow network or a failed load never leaves a blank/black rectangle.
//
// Autoplay is deliberately restricted to md+ viewports with an
// IntersectionObserver gate (no download until scrolled near) and is
// skipped entirely for prefers-reduced-motion — those visitors, and all
// mobile visitors, see a static poster with an opt-in play button instead.
export default function VideoMoment() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [userPlaying, setUserPlaying] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mql.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const autoPlay = inView && isDesktop && !reduced
  const showVideoElement = autoPlay || userPlaying

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
        <ResponsiveImage
          desktop={videoPoster.desktop}
          alt={videoPoster.alt}
          className={cn('absolute inset-0 h-full w-full transition-opacity duration-600', videoPlaying ? 'opacity-0' : 'opacity-100')}
        />

        {showVideoElement && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={videoPoster.desktop.fallback}
            controls={userPlaying}
            onPlaying={() => setVideoPlaying(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}

        {!showVideoElement && (
          <button
            type="button"
            onClick={() => setUserPlaying(true)}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label="Play ambient flooring detail video"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 text-navy shadow-lifted transition-transform duration-400 ease-premium hover:scale-105">
              <HiPlay size={26} className="ml-1" aria-hidden="true" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" aria-hidden="true" />

        <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <Eyebrow tone="light" className="mb-3 text-gold-soft">
            {videoMomentContent.eyebrow}
          </Eyebrow>
          <p className="max-w-lg font-display text-display-sm text-ivory md:text-display-md">{videoMomentContent.title}</p>
          <div className="pointer-events-auto mt-6 inline-block">
            <Button to={videoMomentContent.cta.to} variant="inverse">
              {videoMomentContent.cta.label}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  )
}

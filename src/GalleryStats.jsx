import React, { useEffect, useRef, useState } from 'react'
import './GalleryStats.css'
import VideoSection from './VideoSection'
import picA from './assets/eagle1.png'
import picB from './assets/eagle2.png'

export default function GalleryStats() {
  const [topLoaded, setTopLoaded] = useState(false)
  const [bottomLoaded, setBottomLoaded] = useState(false)
  const [revealNumbers, setRevealNumbers] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    let timers = []
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // reveal numbers with small stagger and reveal photos
            timers.push(setTimeout(() => setRevealNumbers(true), 120))
            timers.push(setTimeout(() => setTopLoaded(true), 220))
            timers.push(setTimeout(() => setBottomLoaded(true), 320))
            // stop observing after reveal
            obs.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )

    obs.observe(node)
    return () => {
      obs.disconnect()
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return (
    <section className="gallery-stats" ref={sectionRef}>
      <div className="gs-inner">
        <div className="gs-left">
          <div className="stat">
            <div className={`stat-num ${revealNumbers ? 'loaded' : ''}`}>100+</div>
            <div className="stat-label">Innovators building the future</div>
          </div>
          <div className="stat">
            <div className={`stat-num ${revealNumbers ? 'loaded' : ''}`} style={{ transitionDelay: '120ms' }}>3+</div>
            <div className="stat-label">Sponsors</div>
          </div>
          <div className="stat">
            <div className={`stat-num ${revealNumbers ? 'loaded' : ''}`} style={{ transitionDelay: '240ms' }}>36</div>
            <div className="stat-label">Hours of pure fun!</div>
          </div>
        </div>

        <div className="gs-right">
          <div className={`photo photo-top ${topLoaded ? 'loaded' : ''}`}>
            <img src={picA} alt="event top" loading="lazy" />
          </div>
          <div className={`photo photo-bottom ${bottomLoaded ? 'loaded' : ''}`}>
            <img src={picB} alt="event bottom" loading="lazy" />
          </div>
        </div>
      </div>
      <VideoSection />
    </section>
  )
}


import React from 'react'
import './SponsorPage.css'

const sponsors = [
  { name: 'Arthrex', logo: '/arthrex.svg', href: 'https://www.arthrex.com/', theme: 'light' },
  { name: 'Eightpoint', logo: '/eightpoint.svg', href: 'https://eightpoint.io/', theme: 'dark' },
  { name: 'Symplistic.ai', logo: '/symplistic-ai.svg', href: 'https://symplistic.ai/', theme: 'dark', fit: 'wide' },
]

export default function SponsorPage() {
  return (
    <section id="sponsors" className="sponsors-section">
      <h2 className="sponsors-title">Sponsors</h2>

      <div className="sponsors-panel">
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <a
              className={`sponsor-box ${sponsor.theme === 'dark' ? 'is-dark' : ''} ${sponsor.fit === 'wide' ? 'is-wide' : ''}`}
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sponsor.name} website`}
            >
              <img
                className={`sponsor-logo ${sponsor.fit === 'wide' ? 'logo-wide' : ''}`}
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

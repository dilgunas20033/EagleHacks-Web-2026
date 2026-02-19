import React, { useMemo } from 'react'
import './SponsorPage.css'

const logos = import.meta.glob('./assets/sponsors/*.{svg,jpg,png}', { eager: true, import: 'default' })

const sponsorData = [
  { name: 'Arthrex', file: 'arthrex.svg', href: 'https://www.arthrex.com/', theme: 'light' },
  { name: 'Eightpoint', file: 'Eightpoint.svg', href: 'https://eightpoint.io/', theme: 'dark' },
]

export default function SponsorPage() {
  const sponsors = useMemo(() => 
    sponsorData.map(sponsor => ({
      ...sponsor,
      logo: logos[`./assets/sponsors/${sponsor.file}`]
    }))
  , [])
  return (
    <section id="sponsors" className="sponsors-section">
      <h2 className="sponsors-title">Sponsors</h2>

      <div className="sponsors-panel">
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <a
              className={`sponsor-box ${sponsor.theme === 'dark' ? 'is-dark' : ''}`}
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sponsor.name} website`}
            >
              <img className="sponsor-logo" src={sponsor.logo} alt={`${sponsor.name} logo`} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

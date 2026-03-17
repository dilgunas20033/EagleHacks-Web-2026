import React, { useEffect, useMemo, useRef, useState } from 'react'
import './TeamSection.css'

const photos = import.meta.glob('./assets/team/*.jpg', { eager: true, import: 'default' })

const teamMembers = [
     { name: 'Deividas Ilgunas', role: 'Lead Hackathon Coordiantor', link: 'https://www.linkedin.com/in/dilgunas2003/' },
     { name: 'Jordan Robertson', role: 'Co-Lead Hackathon Coordinator', link: 'https://www.linkedin.com/in/jordantyrobertson/' },
     { name: 'Allison Brown', role: 'Budgeting, Communications, Events, Logistics, Marketing', link: 'https://www.linkedin.com/in/allison-brown27/' },
     { name: 'Tommy Baratta', role: 'Communications, Events, Logistics', link: 'https://www.linkedin.com/in/thomas-baratta/' },
     { name: 'Dominique Lucien', role: 'Events', link: 'https://www.linkedin.com/in/dominique-lucien/' },
     { name: 'Lentz Fortune', role: 'Budgeting, Logistics', link: 'https://www.linkedin.com/in/lentzfortune/' },
     { name: 'Katharine Ringo', role: 'Events, Logistics', link: 'https://www.linkedin.com/in/katharine-ringo-422917274/' },
     { name: 'Samson Silver', role: 'Communications, Marketing', link: 'https://www.linkedin.com/in/samson-silver-798536293/' },
     { name: 'Kayla Kerr', role: 'Budgeting, Marketing', link: 'https://www.linkedin.com/in/kayla-kerr-a67a121b5/' },
     { name: 'Professor Allen', role: 'Faculty Advisor', link: 'https://www.linkedin.com/in/paul-allen-235312b/' },
]

const firstNameSlug = (fullName) =>
  fullName
    .split(' ')[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const getPhoto = (name) => {
  const key = `./assets/team/${firstNameSlug(name)}.jpg`
  return photos[key]
}

const perPageForWidth = (width) => {
  if (width >= 1024) return 4
  if (width >= 720) return 3
  return 1
}

export default function TeamSection() {
  const sectionRef = useRef(null)
  const [perPage, setPerPage] = useState(perPageForWidth(window.innerWidth))
  const [page, setPage] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setPerPage((prev) => {
        const next = perPageForWidth(window.innerWidth)
        return prev === next ? prev : next
      })
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const teamPages = useMemo(() => {
    const pages = []
    for (let index = 0; index < teamMembers.length; index += perPage) {
      pages.push(teamMembers.slice(index, index + perPage))
    }
    return pages
  }, [perPage])

  const totalPages = teamPages.length
  const activePage = Math.min(page, totalPages - 1)
  const currentMembers = teamPages[activePage] ?? teamPages[0]

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.45 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || totalPages <= 1) return

    const intervalId = window.setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages)
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [isInView, totalPages])

  const goToPage = (nextPage) => {
    const clampedPage = Math.max(0, Math.min(nextPage, totalPages - 1))
    setPage(clampedPage)
  }

  const goPrev = () => {
    const nextPage = (activePage - 1 + totalPages) % totalPages
    goToPage(nextPage)
  }

  const goNext = () => {
    const nextPage = (activePage + 1) % totalPages
    goToPage(nextPage)
  }

  return (
    <div className="team-section" ref={sectionRef}>
      <h2>Meet the Organizers</h2>
      <div className="team-card">
        <div className="team-grid" style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}>
          {currentMembers.map((member, index) => {
            const photo = getPhoto(member.name)
            const initials = member.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()

            return (
              <div key={`${member.name}-${index}`} className="team-member">
                <div className="team-avatar" aria-hidden="true">
                  {photo ? <img src={photo} alt="" /> : <span>{initials}</span>}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a className="team-link" href={member.link} target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">in</span>
                  Connect
                </a>
              </div>
            )
          })}
        </div>
        <div className="team-controls">
          <button type="button" onClick={goPrev} aria-label="Previous team members">
            Previous
          </button>
          <div className="team-dots" role="tablist" aria-label="Team pages">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`team-dot ${index === activePage ? 'active' : ''}`}
                aria-label={`Go to team page ${index + 1}`}
                aria-pressed={index === activePage}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>
          <div className="team-page-label" aria-live="polite">
            {activePage + 1} / {totalPages}
          </div>
          <button type="button" onClick={goNext} aria-label="Next team members">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

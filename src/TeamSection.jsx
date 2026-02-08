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
     { name: 'Alden Harding', role: 'Logistics, Marketing', link: 'https://www.linkedin.com/in/alden-harding/' },
     { name: 'Vivian Procacci', role: 'Marketing', link: 'https://www.linkedin.com/in/vivian-procacci/' },
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
  const listRef = useRef(null)
  const [perPage, setPerPage] = useState(perPageForWidth(window.innerWidth))
  const [page, setPage] = useState(0)

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

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(teamMembers.length / perPage)),
    [perPage]
  )

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1))
  }, [totalPages])

  const scrollToPage = (nextPage) => {
    const node = listRef.current
    if (!node) return
    const width = node.clientWidth
    node.scrollTo({ left: nextPage * width, behavior: 'smooth' })
    setPage(nextPage)
  }

  const goPrev = () => {
    const nextPage = (page - 1 + totalPages) % totalPages
    scrollToPage(nextPage)
  }

  const goNext = () => {
    const nextPage = (page + 1) % totalPages
    scrollToPage(nextPage)
  }

  const onScroll = () => {
    const node = listRef.current
    if (!node) return
    const width = node.clientWidth
    if (!width) return
    const nextPage = Math.round(node.scrollLeft / width)
    if (nextPage !== page) setPage(nextPage)
  }

  return (
    <div className="team-section">
      <h2>Meet the Organizers</h2>
      <div className="team-card">
        <div className="team-grid" ref={listRef} onScroll={onScroll}>
          {teamMembers.map((member, index) => {
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
            &larr; Previous
          </button>
          <div className="team-dots" role="tablist" aria-label="Team pages">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`team-dot ${index === page ? 'active' : ''}`}
                aria-label={`Go to team page ${index + 1}`}
                aria-pressed={index === page}
                onClick={() => scrollToPage(index)}
              />
            ))}
          </div>
          <div className="team-page-label" aria-live="polite">
            {page + 1} / {totalPages}
          </div>
          <button type="button" onClick={goNext} aria-label="Next team members">
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}

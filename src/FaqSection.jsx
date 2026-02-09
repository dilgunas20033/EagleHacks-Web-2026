import React, { useMemo, useState } from 'react'
import './FaqSection.css'

const faqSections = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        question: 'What is a hackathon?',
        answer:
          'A hackathon is a weekend-long event where students team up to learn, build, and showcase creative projects. EagleHacks brings together beginners and experienced hackers for workshops, mentoring, and a lot of building.',
      },
      {
        question: 'How much experience do I need?',
        answer:
          "None! EagleHacks welcomes all skill levels. If you're new, you'll find beginner-friendly workshops, mentors, and teammates to help you learn fast.",
      },
      {
        question: 'How much does it cost?',
        answer:
          'Nothing. EagleHacks is free for all accepted participants, thanks to our sponsors and partners.',
      },
      {
        question: 'Who can participate?',
        answer:
          'Students and recent graduates from any college, university, or coding bootcamp are welcome. Not a student? You can still join as a mentor or volunteer.',
      },
    ],
  },
  {
    id: 'event',
    title: 'Event Details',
    items: [
      {
        question: 'When and where is EagleHacks?',
        answer:
          'EagleHacks runs March 27–29, 2026 at Florida Gulf Coast University. Venue details and arrival info will be announced closer to the event.',
      },
      {
        question: 'Is EagleHacks in-person or virtual?',
        answer:
          'EagleHacks 2026 will be an in-person event. We are excited to welcome everyone on campus for a full weekend experience.',
      },
      {
        question: 'How long is EagleHacks?',
        answer:
          'It is a weekend-long hackathon with opening and closing ceremonies, workshops, and a full hacking period in between.',
      },
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics',
    items: [
      {
        question: 'Do I need a team?',
        answer:
          'No. You can build solo or form a team of up to four. We will host a team-formation session at the start of hacking.',
      },
      {
        question: 'What should I bring?',
        answer:
          'Bring a laptop, charger, and anything you need to be comfortable for a weekend of building. A reusable water bottle and headphones help a lot, too.',
      },
      {
        question: 'Will food be provided?',
        answer:
          'Yes. We will provide meals and snacks throughout the weekend.',
      },
    ],
  },
  {
    id: 'sponsor',
    title: 'Sponsors/Volunteer',
    items: [
      {
        question: 'How can I sponsor EagleHacks?',
        answer:
          'Reach out to our team and we will get you the right information. Sponsor materials will be shared soon.',
      },
      {
        question: 'How can I judge or volunteer?',
        answer: (
          <>
            We welcome judges and volunteers. Judges can use this {' '}
            <a href="https://forms.cloud.microsoft/r/JtTmPdr8sL" target="_blank" rel="noopener noreferrer">
              Judging form
            </a>
            . Volunteers can use this {' '}
            <a href="https://forms.cloud.microsoft/r/AYUNcWbP7G" target="_blank" rel="noopener noreferrer">
              Volunteering form
            </a>
            .
          </>
        ),
      },
    ],
  },
]

export default function FaqSection() {
  const [activeSection, setActiveSection] = useState(faqSections[0].id)
  const activeItems = useMemo(
    () => faqSections.find((section) => section.id === activeSection)?.items ?? [],
    [activeSection]
  )

  return (
    <div className="faq-section">
      <h2>FAQs</h2>
      <p className="faq-intro">
        Have questions? We have answers. If you do not see what you need, reach out to our team.
      </p>
      <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
        {faqSections.map((section) => (
          <button
            key={section.id}
            type="button"
            role="tab"
            aria-selected={activeSection === section.id}
            className={`faq-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>
      <div className="faq-list" role="tabpanel">
        {activeItems.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

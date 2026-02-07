import React from 'react'
import './FaqSection.css'

const faqSections = [
  {
    title: 'General Event Details',
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
        question: 'Who can participate?',
        answer:
          'Students and recent graduates from any college, university, or coding bootcamp are welcome. Not a student? You can still join as a mentor or volunteer.',
      },
      {
        question: 'How much does it cost?',
        answer:
          'Nothing. EagleHacks is free for all accepted participants, thanks to our sponsors and partners.',
      },
    ],
  },
  {
    title: 'Logistics',
    items: [
      {
        question: 'When and where is EagleHacks?',
        answer:
          'EagleHacks runs March 26–29, 2026 at Florida Gulf Coast University. Venue details and arrival info will be announced closer to the event.',
      },
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
    ],
  },
  {
    title: 'Sponsors & Volunteers',
    items: [
      {
        question: 'How can I sponsor, mentor, or volunteer?',
        answer:
          'Reach out to our team and we will get you the right links. Sponsor and volunteer forms will be shared soon.',
      },
    ],
  },
]

export default function FaqSection() {
  return (
    <div className="faq-section">
      <h2>FAQ</h2>
      <p className="faq-intro">
        Have questions? We have answers. If you do not see what you need, reach out to our team.
      </p>
      <div className="faq-sections">
        {faqSections.map((section) => (
          <div key={section.title} className="faq-group">
            <h3>{section.title}</h3>
            <div className="faq-list">
              {section.items.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

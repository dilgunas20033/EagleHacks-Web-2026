import React, { useState } from 'react'
import Nav from './nav'
import './App.css'
import heroImg from './assets/EagleHacks2026.png'
import GalleryStats from './GalleryStats'
import AboutSection from './AboutSection'
import FaqSection from './FaqSection'

function App() {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <>
      <Nav />
      <main className="app-main">
        <section id="home" className="section hero">
          <h1>EAGLEHACKS</h1>
          <h2>#1 HACKATHON IN SWFL</h2>
          <h3>MARCH 26TH - 29TH 2026</h3>

          <div className="hero-cta">
            <a className="btn register" href="https://uz9vkfej.forms.app/untitled-form" target="_blank">Sign Up</a>
          </div>
          <div className="hero-media">
            <div className="hero-image-wrap">
              <img
                src={heroImg}
                alt="EagleHacks 2026"
                className={`hero-image ${imgLoaded ? 'loaded' : ''}`}
                onLoad={() => setImgLoaded(true)}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <section id="stats" className="section">
        <GalleryStats />
      </section>
      <section id="about" className="section">
        <AboutSection />
      </section>
      <section id="faq" className="section">
        <FaqSection />
      </section>

      <footer id="connect" className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>Follow EagleHacks</h3>
            <p>Stay in the loop for updates, workshops, and announcements.</p>
          </div>
          <div className="social-links">
            <a href="https://instagram.com/fgcu_cssec" target="_blank" rel="noopener noreferrer">Instagram</a>
            {/* <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer">Discord</a> */}
            <a href="mailto:fgcu.cssec@gmail.com">Email</a>
            {/* <a href="https://www.linkedin.com/company/eaglehacks/" target="_blank" rel="noopener noreferrer">LinkedIn</a> */}
          </div>
        </div>
      </footer>

    </>
  )
}

export default App

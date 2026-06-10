// src/pages/Contact.jsx
//
// Contact section with a controlled form.
//
// CONTROLLED FORM — a core React concept:
// In plain HTML a form manages its own values internally.
// In React we control the form ourselves using useState.
// Every keystroke updates state, and the input displays the state value.
// This gives me full control over validation, submission, and resetting.
//
// The form currently logs to the console.
// In Stage 2 I will wire it to the Express /api/contact endpoint.

import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const sectionRef = useScrollReveal()

  // Form field values
  const [form,    setForm]    = useState(INITIAL_FORM)
  // Submission state: 'idle' | 'loading' | 'success' | 'error'
  const [status,  setStatus]  = useState('idle')
  const [errMsg,  setErrMsg]  = useState('')

  // Generic change handler — works for all fields
  // Uses the input's `name` attribute to know which field to update
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrMsg('')

    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setErrMsg('Please fill in your name, email, and message.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      // ----- PHASE 1: log to console (backend not wired yet) -----
      console.log('Contact form submission:', form)
      await new Promise((resolve) => setTimeout(resolve, 800)) // simulate delay
      setStatus('success')
      setForm(INITIAL_FORM)

      // ----- PHASE 2: uncomment this block and remove the above -----
      // const res = await fetch('http://localhost:4000/api/contact', {
      //   method:  'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body:    JSON.stringify(form),
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.error || 'Something went wrong')
      // setStatus('success')
      // setForm(INITIAL_FORM)
      
    } catch (err) {
      setStatus('error')
      setErrMsg(err.message || 'Failed to send message. Please try emailing directly.')
    }
  }

  return (
    <section id="contact" className="section-contact" ref={sectionRef} aria-label="Contact">
      <div className="container">

        <p className="section-label reveal">Contact</p>
        <h2 className="section-heading reveal rd1">
          Let's talk about <em>your project.</em>
        </h2>

        <div className="contact-layout">

          {/* Left — contact info */}
          <div className="contact-info reveal rd1">
            <h3>Get in touch</h3>
            <p>
              Available for freelance projects and full-time opportunities.
              Response time is typically under 4 hours during Nairobi business hours.
            </p>

            <div className="contact-links">
              <a href="mailto:reaganfwambaa@gmail.com" className="contact-link">
                <i className="ph ph-envelope" aria-hidden="true"></i>
                <div>
                  <div className="form-label">EMAIL</div>
                  reaganfwambaa@gmail.com
                </div>
                <i className="ph ph-arrow-square-out" style={{ marginLeft:'auto', opacity:0.5 }} aria-hidden="true"></i>
              </a>

              <a href="tel:+254790028542" className="contact-link">
                <i className="ph ph-phone" aria-hidden="true"></i>
                <div>
                  <div className="form-label">PHONE</div>
                  +254 790 028 542
                </div>
                <i className="ph ph-arrow-square-out" style={{ marginLeft:'auto', opacity:0.5 }} aria-hidden="true"></i>
              </a>

              <a
                href="https://linkedin.com/in/reagan-f-04a448244"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <i className="ph ph-linkedin-logo" aria-hidden="true"></i>
                <div>
                  <div className="form-label">LINKEDIN</div>
                  reagan-f-04a448244
                </div>
                <i className="ph ph-arrow-square-out" style={{ marginLeft:'auto', opacity:0.5 }} aria-hidden="true"></i>
              </a>

              <a
                href="https://github.com/coudbereggsf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <i className="ph ph-github-logo" aria-hidden="true"></i>
                <div>
                  <div className="form-label">GITHUB</div>
                  coudbereggsf
                </div>
                <i className="ph ph-arrow-square-out" style={{ marginLeft:'auto', opacity:0.5 }} aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="contact-form-card reveal rd2">
            {status === 'success' ? (
              // Success state — shown after successful submission
              <div style={{ textAlign:'center', padding:'2rem 0' }}>
                <i
                  className="ph ph-check-circle"
                  style={{ fontSize:'3rem', color:'var(--amber)', display:'block', marginBottom:'1rem' }}
                  aria-hidden="true"
                ></i>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:400, marginBottom:'0.75rem' }}>
                  Message received
                </h3>
                <p style={{ color:'var(--cream-muted)', fontSize:'var(--text-sm)' }}>
                  Thanks for reaching out. You will hear back within 4 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-ghost"
                  style={{ marginTop:'1.5rem' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              // Default form state
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">NAME</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">EMAIL</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">SUBJECT</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    aria-required="true"
                    rows={5}
                  />
                </div>

                {errMsg && (
                  <p
                    role="alert"
                    style={{ marginBottom:'1rem', fontSize:'var(--text-xs)', color:'#e07070' }}
                  >
                    {errMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width:'100%', justifyContent:'center' }}
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send message
                      <i className="ph ph-paper-plane-tilt" aria-hidden="true"></i>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

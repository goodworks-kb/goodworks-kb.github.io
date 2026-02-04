import { useRef } from 'react'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'
import { supabase } from '../lib/supabase'

interface ContactFormProps {
  language: Language
  showTitle?: boolean
}

export default function ContactForm({ language, showTitle = true }: ContactFormProps) {
  const contactFormRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const statusEl = statusRef.current

    if (!statusEl) return

    const formData = new FormData(form)
    const payload: Record<string, any> = Object.fromEntries(formData.entries())

    // Skip submission if honeypot field is filled
    if (payload.hp) {
      statusEl.textContent = ''
      return
    }

    statusEl.textContent = getTranslation('contactSending', language)

    payload.form_name = 'contact'
    payload.page_url = location.href
    payload.referrer = document.referrer
    payload.utm = Object.fromEntries(new URLSearchParams(location.search))

    try {
      const { data, error } = await supabase.functions.invoke('submit-form', {
        body: payload,
      })

      if (error) throw error
      if (!data || !data.ok) throw new Error(data?.error || 'Failed')

      statusEl.textContent = getTranslation('contactSuccess', language)
      form.reset()
    } catch (err) {
      console.error(err)
      statusEl.textContent = getTranslation('contactError', language)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        {showTitle && (
          <>
            <h2 className="section-title">{getTranslation('contactTitle', language)}</h2>
            <p className="section-subtitle">{getTranslation('contactSubtitle', language)}</p>
          </>
        )}
        <div className="contact-content">
          <form ref={contactFormRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{getTranslation('contactName', language)}</label>
              <input type="text" id="name" name="name" placeholder={getTranslation('contactName', language)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">{getTranslation('contactEmail', language)}</label>
              <input type="email" id="email" name="email" placeholder={getTranslation('contactEmail', language)} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{getTranslation('contactMessage', language)}</label>
              <textarea id="message" name="message" rows={5} placeholder={getTranslation('contactMessage', language)} required></textarea>
            </div>
            {/* honeypot */}
            <input name="hp" style={{ display: 'none' }} autoComplete="off" tabIndex={-1} />
            <button type="submit" className="btn btn-primary">
              {getTranslation('contactSend', language)}
            </button>
            <p ref={statusRef} className="status"></p>
          </form>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Clock, LoaderCircle, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import { useForm } from '@formspree/react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { business } from '../config/business'
import { experiences } from '../data/experiences'
import { media } from '../data/media'
import { validateEnquiry } from '../utils/forms'

const enquiryFormId = import.meta.env.VITE_FORMSPREE_ENQUIRY_FORM_ID?.trim()
const enquiryFormConfigured = /^[a-z0-9]+$/i.test(enquiryFormId || '')
const initialForm = { name: '', email: '', phone: '', country: '', interest: '', subject: '', message: '', website: '' }

function FieldError({ id, message }) {
  return message ? <span className="field-error" id={id} role="alert">{message}</span> : null
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submissionLock = useRef(false)
  const [formspreeState, submitToFormspree, resetFormspree] = useForm(enquiryFormId || 'configuration-required')

  useEffect(() => {
    if (!enquiryFormConfigured && import.meta.env.DEV) console.warn('Enquiry form is disabled: VITE_FORMSPREE_ENQUIRY_FORM_ID is not configured.')
  }, [])

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmissionError('')
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submissionLock.current || isSubmitting) return
    const nextErrors = validateEnquiry(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    if (!enquiryFormConfigured) {
      setSubmissionError('Online enquiries are not configured yet. Please email us directly.')
      console.error('Cannot submit enquiry: VITE_FORMSPREE_ENQUIRY_FORM_ID is missing or invalid.')
      return
    }

    submissionLock.current = true
    setIsSubmitting(true)
    setSubmissionError('')
    try {
      await submitToFormspree({
        'Form Type': 'General Enquiry',
        'Customer Name': form.name.trim(),
        'Customer Email': form.email.trim(),
        email: form.email.trim(),
        'Phone / WhatsApp': form.phone.trim() || 'Not provided',
        Country: form.country.trim() || 'Not provided',
        'Experience Interested In': form.interest || 'General enquiry',
        Subject: form.subject.trim(),
        Message: form.message.trim(),
        'Submission Time': new Date().toISOString(),
        'Website Source': window.location.href,
        _subject: `Website Enquiry — ${form.subject.trim()}`,
        _gotcha: form.website,
      })
    } catch (error) {
      console.error('Enquiry submission failed.', error)
      setSubmissionError('We couldn\'t send your message. Please try again or email us directly.')
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setForm(initialForm); setErrors({}); setSubmissionError(''); resetFormspree()
  }

  return <>
    <PageHero compact eyebrow="Let’s plan your ocean day" title="Start with a conversation." copy="Tell us what excites you, and we’ll help shape the right Mirissa experience." image={media.kayak} />
    <section className="section"><div className="container contact-grid"><div><span className="eyebrow">Get in touch</span><h2>We’re here to make planning easy.</h2><p className="lead">Share your dates, group and comfort in the water. The more we know, the better we can guide you.</p><div className="contact-methods"><div><Mail /><span><small>Email</small><a href={`mailto:${business.email}`}><strong>{business.email}</strong></a><em>For bookings and general questions</em></span></div>{business.whatsapp && <div><MessageCircle /><span><small>WhatsApp</small><strong>{business.whatsapp}</strong><em>Message us about your plans</em></span></div>}<div><MapPin /><span><small>Meeting point</small><strong>Mirissa, Sri Lanka</strong><em>Exact location shared after confirmation</em></span></div><div><Clock /><span><small>Response</small><strong>As soon as possible</strong><em>Availability is always confirmed personally</em></span></div></div></div>
        {formspreeState.succeeded ? <div className="contact-form form-confirm" aria-live="polite"><div className="form-confirm__icon"><Checkmark /></div><span className="eyebrow">Message Sent</span><h2>Thanks for contacting {business.name}.</h2><p>We’ve received your enquiry and will get back to you as soon as possible.</p><p>You can also reach us at <a href={`mailto:${business.email}`}>{business.email}</a>.</p><button className="button button--navy" type="button" onClick={reset}>Send another message</button></div> : <form className="contact-form" onSubmit={submit} noValidate>
          <div className="honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Leave this field empty</label><input id="enquiry-website" name="_gotcha" value={form.website} onChange={(event) => update('website', event.target.value)} tabIndex="-1" autoComplete="off" /></div>
          <span className="eyebrow">General enquiry</span><h2>How can we help?</h2>{!enquiryFormConfigured && <div className="configuration-note" role="status"><strong>Online submission setup pending.</strong> Add the enquiry Formspree ID to enable sending.</div>}
          <label htmlFor="enquiry-name">Full name *<input id="enquiry-name" name="name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'enquiry-name-error' : undefined} /></label><FieldError id="enquiry-name-error" message={errors.name} />
          <div className="field-row"><div><label htmlFor="enquiry-email">Email *<input id="enquiry-email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'enquiry-email-error' : undefined} /></label><FieldError id="enquiry-email-error" message={errors.email} /></div><label htmlFor="enquiry-phone">WhatsApp / phone <span className="optional">Optional</span><input id="enquiry-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label></div>
          <div className="field-row"><label htmlFor="enquiry-country">Country <span className="optional">Optional</span><input id="enquiry-country" autoComplete="country-name" value={form.country} onChange={(event) => update('country', event.target.value)} /></label><label htmlFor="enquiry-interest">Experience interested in<select id="enquiry-interest" value={form.interest} onChange={(event) => update('interest', event.target.value)}><option value="">General enquiry</option>{experiences.map((item) => <option key={item.slug} value={item.shortTitle}>{item.shortTitle}</option>)}</select></label></div>
          <label htmlFor="enquiry-subject">Subject *<input id="enquiry-subject" value={form.subject} onChange={(event) => update('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'enquiry-subject-error' : undefined} /></label><FieldError id="enquiry-subject-error" message={errors.subject} />
          <label htmlFor="enquiry-message">Message *<textarea id="enquiry-message" rows="5" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Travel dates, group size, experience level or any questions…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'enquiry-message-error' : undefined} /></label><FieldError id="enquiry-message-error" message={errors.message} />
          <p className="privacy-note">By submitting this form, you agree that we may use your contact details to respond to your enquiry. Read our <Link to="/privacy">Privacy Policy</Link>.</p>
          <button className="button button--coral" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spinner" /> Sending Message...</> : <>Send Enquiry <Send size={17} /></>}</button>
          <div className="submission-status" aria-live="polite">{(submissionError || formspreeState.errors) && <p className="form-error">We couldn’t send your message. {submissionError || 'Please try again or email us directly at'} <a href={`mailto:${business.email}`}>{business.email}</a>.</p>}</div>
        </form>}
      </div></section>
  </>
}

function Checkmark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

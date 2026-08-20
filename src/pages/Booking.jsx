import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, LoaderCircle, Minus, Plus, ShieldCheck } from 'lucide-react'
import { useForm } from '@formspree/react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { business } from '../config/business'
import { experiences, getExperience } from '../data/experiences'
import { getPackage, packages } from '../data/packages'
import { createBookingReference, formatBookingDate, getDefaultBookingDate, getTodayValue, isValidBookableDate, validateBooking } from '../utils/forms'
import { getPriceForGuests } from '../utils/pricing'

const steps = ['Choose Adventure', 'Date & Guests', 'Your Details', 'Review Request']
const options = [
  ...experiences.map((item) => ({ ...item, type: 'Experience' })),
  ...packages.map((item) => ({ ...item, shortTitle: item.title, type: 'Package' })),
]
const validSelections = options.map((item) => item.slug)
const bookingFormId = import.meta.env.VITE_FORMSPREE_BOOKING_FORM_ID?.trim()
const bookingFormConfigured = /^[a-z0-9]+$/i.test(bookingFormId || '')

function getInitialForm(params) {
  const requestedSelection = params.get('experience') || params.get('package') || ''
  const normalizedSelection = getExperience(requestedSelection)?.slug || getPackage(requestedSelection)?.slug || requestedSelection
  const requestedDate = params.get('date') || ''
  const requestedGuests = Number(params.get('guests'))
  return {
    selection: validSelections.includes(normalizedSelection) ? normalizedSelection : experiences[0].slug,
    date: isValidBookableDate(requestedDate) ? requestedDate : getDefaultBookingDate(),
    alternativeDate: '', time: 'Flexible',
    guests: Number.isInteger(requestedGuests) && requestedGuests > 0 ? requestedGuests : 2,
    name: '', email: '', phone: '', country: '', hotel: '', pickup: 'No', contactMethod: 'Email', requests: '', website: '',
  }
}

function FieldError({ id, message }) {
  return message ? <span className="field-error" id={id} role="alert">{message}</span> : null
}

export default function Booking() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(() => getInitialForm(params))
  const [errors, setErrors] = useState({})
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingReference, setBookingReference] = useState('')
  const submissionLock = useRef(false)
  const [formspreeState, submitToFormspree, resetFormspree] = useForm(bookingFormId || 'configuration-required')
  const selected = options.find((item) => item.slug === form.selection) || options[0]
  const calculatedPrice = getPriceForGuests(selected, form.guests)
  const confirmedPrice = calculatedPrice.status === 'confirmed'
  const customGroup = selected.pricing?.status === 'confirmed' && form.guests > 4
  const today = getTodayValue()

  useEffect(() => {
    if (!bookingFormConfigured && import.meta.env.DEV) console.warn('Booking form is disabled: VITE_FORMSPREE_BOOKING_FORM_ID is not configured.')
  }, [])

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmissionError('')
  }

  const validateStep = (targetStep) => {
    const allErrors = validateBooking(form, validSelections, today)
    const fieldsByStep = [['selection'], ['date', 'alternativeDate', 'guests'], ['name', 'email', 'phone']]
    const relevantFields = fieldsByStep[targetStep] || Object.keys(allErrors)
    const relevantErrors = Object.fromEntries(Object.entries(allErrors).filter(([field]) => relevantFields.includes(field)))
    setErrors(relevantErrors)
    return Object.keys(relevantErrors).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const back = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submissionLock.current || isSubmitting) return
    const allErrors = validateBooking(form, validSelections, today)
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      setStep(allErrors.selection ? 0 : (allErrors.date || allErrors.alternativeDate || allErrors.guests) ? 1 : 2)
      return
    }
    if (!bookingFormConfigured) {
      setSubmissionError('Online booking requests are not configured yet. Please email us directly and we will help you plan your adventure.')
      console.error('Cannot submit booking: VITE_FORMSPREE_BOOKING_FORM_ID is missing or invalid.')
      return
    }

    submissionLock.current = true
    setIsSubmitting(true)
    setSubmissionError('')
    const reference = bookingReference || createBookingReference(form.date)
    if (!bookingReference) setBookingReference(reference)
    const pricePerPerson = confirmedPrice ? `$${calculatedPrice.perPerson}` : 'Not confirmed'
    const totalPrice = confirmedPrice ? `$${calculatedPrice.total}` : 'Quote required'
    const calculatedTotal = confirmedPrice ? `$${calculatedPrice.total} USD` : 'Quote required'
    const rateType = confirmedPrice ? calculatedPrice.rateType : customGroup ? 'Custom Quote (more than 4 people)' : 'Price on request'

    try {
      await submitToFormspree({
        'Form Type': 'Booking Request',
        'Booking Reference': reference,
        Experience: selected.shortTitle,
        'Preferred Date': formatBookingDate(form.date),
        'Alternative Date': form.alternativeDate ? formatBookingDate(form.alternativeDate) : 'Not provided',
        'Preferred Time': form.time,
        'Number of Guests': String(form.guests),
        'Rate Type': rateType,
        'Price Per Person': pricePerPerson,
        'Total Price': totalPrice,
        'Calculated Total': calculatedTotal,
        Currency: selected.pricing?.currency || 'USD',
        'Customer Full Name': form.name.trim(),
        'Customer Name': form.name.trim(),
        'Customer Email': form.email.trim(),
        email: form.email.trim(),
        'Phone / WhatsApp': form.phone.trim(),
        Country: form.country.trim() || 'Not provided',
        'Hotel / Accommodation': form.hotel.trim() || 'Not provided',
        'Pickup Required': form.pickup,
        'Preferred Contact Method': form.contactMethod,
        'Special Requests': form.requests.trim() || 'None',
        'Submission Date/Time': new Date().toISOString(),
        'Submission Time': new Date().toISOString(),
        'Website Source': window.location.href,
        _subject: `Booking Request ${reference} — ${selected.shortTitle}`,
        _gotcha: form.website,
      })
    } catch (error) {
      console.error('Booking submission failed.', error)
      setSubmissionError(`We couldn't send your request. Please try again or email us directly at ${business.email}.`)
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  const startAnother = () => {
    setForm(getInitialForm(params)); setStep(0); setErrors({}); setSubmissionError(''); setBookingReference(''); resetFormspree()
  }

  const providerError = formspreeState.errors && !formspreeState.succeeded
  const rateText = confirmedPrice ? calculatedPrice.rateType : customGroup ? 'Custom quote required' : 'Request availability'

  return <>
    <PageHero compact eyebrow="Booking Request" title="Your next adventure starts here." copy="Tell us what works for you. We’ll check availability personally—no payment is taken." />
    <section className="booking-section"><div className="container">
      {!bookingFormConfigured && <div className="configuration-note" role="status"><strong>Online submission setup pending.</strong> You can complete and review the form, but a Formspree booking form ID is required to send it.</div>}
      {formspreeState.succeeded ? <div className="booking-confirm" aria-live="polite"><div><Check /></div><span className="eyebrow">Booking Request Received</span><h2>Thank you, {form.name.trim()}!</h2><p>We’ve received your request. Our team will check availability and contact you shortly to confirm your Mirissa adventure.</p><p className="booking-reference"><span>Your reference</span><strong>{bookingReference}</strong></p><p>Need to add something? Email <a href={`mailto:${business.email}`}>{business.email}</a>.</p><button className="button button--navy" type="button" onClick={startAnother}>Plan another adventure</button></div> : <>
        <div className="stepper stepper--4" aria-label={`Booking progress: step ${step + 1} of ${steps.length}`}>{steps.map((label, index) => <div key={label} className={`${index === step ? 'active' : ''} ${index < step ? 'complete' : ''}`}><span>{index < step ? <Check /> : index + 1}</span><small>{label}</small></div>)}</div>
        <div className="booking-layout"><form className="booking-panel" onSubmit={submit} noValidate>
          <div className="honeypot" aria-hidden="true"><label htmlFor="booking-website">Leave this field empty</label><input id="booking-website" name="_gotcha" value={form.website} onChange={(event) => update('website', event.target.value)} tabIndex="-1" autoComplete="off" /></div>
          {step === 0 && <div><span className="eyebrow">Step 1</span><h2>Choose your adventure</h2><p className="lead">Select an experience or package. Unpriced activities can still be sent as availability requests.</p><div className="booking-options" role="radiogroup" aria-label="Experience">{options.map((item) => <button type="button" role="radio" aria-checked={form.selection === item.slug} key={item.slug} className={form.selection === item.slug ? 'selected' : ''} onClick={() => update('selection', item.slug)}><img src={item.image} alt="" /><span><small>{item.type}</small><strong>{item.shortTitle}</strong><em>{item.pricing?.status === 'confirmed' ? 'Confirmed 1–4 guest pricing' : 'Request availability'}</em></span><i><Check /></i></button>)}</div><FieldError id="selection-error" message={errors.selection} /></div>}
          {step === 1 && <div><span className="eyebrow">Step 2</span><h2>Date &amp; guests</h2><p className="lead">Your dates remain a request until the team checks availability, weather and ocean conditions.</p><div className="schedule-grid"><label className="date-picker" htmlFor="preferred-date"><CalendarDays /><span><small>Preferred date *</small><input id="preferred-date" name="preferredDate" type="date" min={today} value={form.date} onChange={(event) => update('date', event.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} /></span></label><FieldError id="date-error" message={errors.date} /><label htmlFor="preferred-time">Preferred time<select id="preferred-time" value={form.time} onChange={(event) => update('time', event.target.value)}><option>Flexible</option><option>Morning</option><option>Afternoon</option><option>Sunset</option></select></label><label htmlFor="alternative-date">Alternative date <span className="optional">Optional</span><input id="alternative-date" type="date" min={today} value={form.alternativeDate} onChange={(event) => update('alternativeDate', event.target.value)} aria-invalid={Boolean(errors.alternativeDate)} aria-describedby={errors.alternativeDate ? 'alternative-date-error' : undefined} /></label><FieldError id="alternative-date-error" message={errors.alternativeDate} /></div><div className="guest-counter"><span><strong>Number of guests *</strong><small>Enter the complete group size</small></span><div><button type="button" aria-label="Remove guest" disabled={form.guests <= 1} onClick={() => update('guests', Math.max(1, form.guests - 1))}><Minus /></button><input aria-label="Number of guests" type="number" min="1" max="50" value={form.guests} onChange={(event) => update('guests', Number(event.target.value))} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'guests-error' : undefined} /><button type="button" aria-label="Add guest" disabled={form.guests >= 50} onClick={() => update('guests', Math.min(50, form.guests + 1))}><Plus /></button></div></div><FieldError id="guests-error" message={errors.guests} />{confirmedPrice ? <div className="live-price"><span>{form.guests} × ${calculatedPrice.perPerson} per person<small>{calculatedPrice.rateType}</small></span><strong>${calculatedPrice.total} USD</strong></div> : <div className="quote-note"><strong>{customGroup ? 'Groups larger than 4 — contact us for a custom quote.' : 'This experience is priced on request.'}</strong><span>Send this booking request or <Link to="/contact">make a general enquiry</Link>.</span></div>}</div>}
          {step === 2 && <div><span className="eyebrow">Step 3</span><h2>Your details</h2><p className="lead">Tell us how to reach you. Only your name, email and phone are required.</p><div className="details-form"><label htmlFor="booking-name">Full name *<input id="booking-name" name="name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></label><FieldError id="name-error" message={errors.name} /><div className="field-row"><div><label htmlFor="booking-email">Email *<input id="booking-email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></label><FieldError id="email-error" message={errors.email} /></div><div><label htmlFor="booking-phone">WhatsApp / phone *<input id="booking-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></label><FieldError id="phone-error" message={errors.phone} /></div></div><div className="field-row"><label htmlFor="booking-country">Country <span className="optional">Optional</span><input id="booking-country" autoComplete="country-name" value={form.country} onChange={(event) => update('country', event.target.value)} /></label><label htmlFor="booking-hotel">Hotel / accommodation <span className="optional">Optional</span><input id="booking-hotel" autoComplete="street-address" value={form.hotel} onChange={(event) => update('hotel', event.target.value)} /></label></div><fieldset><legend>Pickup required</legend><div className="choice-row">{['No', 'Yes'].map((value) => <label key={value}><input type="radio" name="pickup" value={value} checked={form.pickup === value} onChange={(event) => update('pickup', event.target.value)} />{value}</label>)}</div></fieldset><label htmlFor="contact-method">Preferred contact method<select id="contact-method" value={form.contactMethod} onChange={(event) => update('contactMethod', event.target.value)}><option>Email</option><option>WhatsApp / Phone</option></select></label><label htmlFor="booking-requests">Special requests / message <span className="optional">Optional</span><textarea id="booking-requests" rows="4" value={form.requests} onChange={(event) => update('requests', event.target.value)} placeholder="Swimming experience, ages, accessibility needs or anything else we should know…" /></label></div></div>}
          {step === 3 && <div><span className="eyebrow">Step 4</span><h2>Review your request</h2><div className="review-list"><div><span>Experience</span><strong>{selected.shortTitle}</strong></div><div><span>Preferred date</span><strong>{formatBookingDate(form.date)}</strong></div><div><span>Preferred time</span><strong>{form.time}</strong></div>{form.alternativeDate && <div><span>Alternative date</span><strong>{formatBookingDate(form.alternativeDate)}</strong></div>}<div><span>Guests</span><strong>{form.guests}</strong></div><div><span>Rate type</span><strong>{rateText}</strong></div><div><span>Price per person</span><strong>{confirmedPrice ? `$${calculatedPrice.perPerson} USD` : 'Not confirmed'}</strong></div><div><span>Calculation</span><strong>{confirmedPrice ? `${form.guests} × $${calculatedPrice.perPerson}` : 'Custom quote required'}</strong></div><div className="review-total"><span>Total</span><strong>{confirmedPrice ? `$${calculatedPrice.total} USD` : 'Request Availability'}</strong></div><div><span>Customer</span><strong>{form.name.trim()} · {form.email.trim()}</strong></div></div><div className="booking-tip"><ShieldCheck /><p><strong>This is a booking request, not a confirmed booking.</strong> We’ll contact you after checking availability. No payment is taken on this website.</p></div><p className="privacy-note">By submitting this form, you agree that we may use your contact details to respond to your booking request. Read our <Link to="/privacy">Privacy Policy</Link>.</p></div>}
          <div className="booking-actions">{step > 0 ? <button className="text-button" type="button" onClick={back} disabled={isSubmitting}><ArrowLeft /> Back</button> : <span />}{step === steps.length - 1 ? <button className="button button--coral" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spinner" /> Sending Request...</> : <>Send Booking Request <ArrowRight /></>}</button> : <button className="button button--coral" type="button" onClick={next}>Continue <ArrowRight /></button>}</div>
          <div className="submission-status" aria-live="polite">{(submissionError || providerError) && <p className="form-error">We couldn’t send your request. {submissionError || 'Please try again or email us directly.'} <a href={`mailto:${business.email}`}>{business.email}</a></p>}</div>
        </form><aside className="booking-summary"><img src={selected.image} alt="" /><span className="eyebrow">Booking Summary</span><h3>{selected.shortTitle}</h3><dl><div><dt>Date</dt><dd>{formatBookingDate(form.date)}</dd></div><div><dt>Guests</dt><dd>{form.guests}</dd></div><div><dt>Rate</dt><dd>{confirmedPrice ? `$${calculatedPrice.perPerson} / person` : 'On request'}</dd></div></dl><div className={`summary-total ${!confirmedPrice ? 'summary-total--quote' : ''}`}><span>{confirmedPrice ? 'Total · USD' : 'Pricing'}<small>{confirmedPrice ? `${form.guests} × $${calculatedPrice.perPerson}` : customGroup ? 'Custom group quote' : 'Request availability'}</small></span><strong>{confirmedPrice ? `$${calculatedPrice.total}` : 'On request'}</strong></div><p className="fine-print">Availability is confirmed personally after we receive your request.</p></aside></div>
      </>}
    </div></section>
  </>
}

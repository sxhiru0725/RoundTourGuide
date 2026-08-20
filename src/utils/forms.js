const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

export function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getTodayValue() {
  return toDateInputValue(new Date())
}

export function getDefaultBookingDate() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return toDateInputValue(date)
}

export function isValidBookableDate(value, minimum = getTodayValue()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false
  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  return parsed.getFullYear() === year
    && parsed.getMonth() === month - 1
    && parsed.getDate() === day
    && value >= minimum
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value?.trim() || '')
}

export function validateBooking(form, validSelections, minimumDate = getTodayValue()) {
  const errors = {}
  if (!validSelections.includes(form.selection)) errors.selection = 'Please select an experience.'
  if (!form.date) errors.date = 'Please select your preferred date.'
  else if (!isValidBookableDate(form.date, minimumDate)) errors.date = 'Please choose today or a future date.'
  if (form.alternativeDate && !isValidBookableDate(form.alternativeDate, minimumDate)) errors.alternativeDate = 'Please choose today or a future alternative date.'
  if (!Number.isInteger(form.guests) || form.guests < 1) errors.guests = 'Please select the number of guests.'
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address.'
  if (form.phone.trim().length < 6) errors.phone = 'Please enter a valid phone or WhatsApp number.'
  return errors
}

export function validateEnquiry(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address.'
  if (!form.subject.trim()) errors.subject = 'Please enter a subject.'
  if (!form.message.trim()) errors.message = 'Please enter your message.'
  return errors
}

export function formatBookingDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return 'Not selected'
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(year, month - 1, day))
}

export function createBookingReference(preferredDate) {
  const datePart = (preferredDate || getTodayValue()).replaceAll('-', '')
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, 'X')
  return `FVT-${datePart}-${suffix}`
}

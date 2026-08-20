import test from 'node:test'
import assert from 'node:assert/strict'
import { isValidBookableDate, isValidEmail, validateBooking, validateEnquiry } from '../src/utils/forms.js'

test('booking dates reject past and malformed values', () => {
  assert.equal(isValidBookableDate('2026-08-19', '2026-08-20'), false)
  assert.equal(isValidBookableDate('2026-02-31', '2026-01-01'), false)
  assert.equal(isValidBookableDate('2026-08-20', '2026-08-20'), true)
  assert.equal(isValidBookableDate('2026-08-21', '2026-08-20'), true)
})

test('email validation rejects obviously invalid values', () => {
  for (const value of ['', 'name', 'name@', '@example.com', 'name@example']) assert.equal(isValidEmail(value), false)
  assert.equal(isValidEmail(' guest@example.com '), true)
})

test('booking validation reports all minimum required fields', () => {
  const errors = validateBooking({ selection: '', date: '', alternativeDate: '', guests: 0, name: '', email: 'bad', phone: '' }, ['snorkeling'], '2026-08-20')
  assert.deepEqual(Object.keys(errors).sort(), ['date', 'email', 'guests', 'name', 'phone', 'selection'])
})

test('enquiry validation reports friendly required-field errors', () => {
  const errors = validateEnquiry({ name: '', email: 'bad', subject: '', message: '' })
  assert.equal(errors.name, 'Please enter your name.')
  assert.equal(errors.email, 'Please enter a valid email address.')
  assert.equal(errors.subject, 'Please enter a subject.')
  assert.equal(errors.message, 'Please enter your message.')
})

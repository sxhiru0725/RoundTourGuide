import test from 'node:test'
import assert from 'node:assert/strict'
import { confirmedPricing } from '../src/data/pricing.js'
import { getExperience } from '../src/data/experiences.js'
import { getPriceForGuests } from '../src/utils/pricing.js'

const expectedTotals = {
  snorkeling: [35, 60, 90, 120],
  kayaking: [40, 60, 90, 120],
  'surf-lesson': [45, 70, 105, 140],
}

for (const [slug, totals] of Object.entries(expectedTotals)) {
  test(`${slug} uses the confirmed 1–4 guest prices`, () => {
    const experience = { pricing: confirmedPricing[slug] }
    totals.forEach((total, index) => {
      assert.equal(getPriceForGuests(experience, index + 1).total, total)
    })
  })
}

test('invalid guest values never produce a price', () => {
  const experience = { pricing: confirmedPricing.snorkeling }
  for (const guests of [0, -1, 5, 'abc', null]) {
    assert.notEqual(getPriceForGuests(experience, guests).status, 'confirmed')
  }
})

test('unpriced experiences require an enquiry', () => {
  const experience = { pricing: { status: 'enquire', currency: 'USD' } }
  assert.equal(getPriceForGuests(experience, 2).status, 'enquire')
})

test('legacy experience URLs resolve to their canonical booking slugs', () => {
  assert.equal(getExperience('reef-snorkeling').slug, 'snorkeling')
  assert.equal(getExperience('surf-lessons').slug, 'surf-lesson')
  assert.equal(getExperience('not-a-real-experience'), undefined)
})

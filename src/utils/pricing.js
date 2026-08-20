export function getPriceForGuests(item, guests) {
  const pricing = item?.pricing
  if (!pricing || pricing.status !== 'confirmed') return { status: 'enquire' }

  if (!Number.isInteger(guests) || guests < 1) {
    return { status: 'invalid', currency: pricing.currency }
  }

  const tier = pricing.tiers.find(({ minGuests, maxGuests }) => guests >= minGuests && guests <= maxGuests)
  if (!tier) return { status: 'unsupported', currency: pricing.currency }

  return {
    status: 'confirmed',
    currency: pricing.currency,
    perPerson: tier.perPerson,
    total: tier.perPerson * guests,
    guests,
    rateType: tier.minGuests === tier.maxGuests
      ? `Solo Rate (${tier.minGuests} person)`
      : `Group Rate (${tier.minGuests}–${tier.maxGuests} people)`,
  }
}

export function getLowestPerPerson(item) {
  if (item?.pricing?.status !== 'confirmed') return null
  return Math.min(...item.pricing.tiers.map((tier) => tier.perPerson))
}

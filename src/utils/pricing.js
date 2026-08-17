export function getPriceForGuests(item, guests) {
  const pricing = item?.pricing
  if (!pricing || pricing.status !== 'confirmed') return { status: 'enquire' }

  const tier = pricing.tiers.find(({ minGuests, maxGuests }) => guests >= minGuests && guests <= maxGuests)
  if (!tier) return { status: 'unsupported', currency: pricing.currency }

  return {
    status: 'confirmed',
    currency: pricing.currency,
    perPerson: tier.perPerson,
    total: tier.perPerson * guests,
    guests,
  }
}

export function getLowestPerPerson(item) {
  if (item?.pricing?.status !== 'confirmed') return null
  return Math.min(...item.pricing.tiers.map((tier) => tier.perPerson))
}

const usdTiers = (solo, smallGroup) => ({
  status: 'confirmed',
  currency: 'USD',
  tiers: [
    { minGuests: 1, maxGuests: 1, perPerson: solo },
    { minGuests: 2, maxGuests: 4, perPerson: smallGroup },
  ],
})

export const confirmedPricing = {
  snorkeling: usdTiers(35, 30),
  kayaking: usdTiers(40, 30),
  'surf-lesson': usdTiers(45, 35),
}

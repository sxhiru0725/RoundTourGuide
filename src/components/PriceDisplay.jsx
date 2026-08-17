import { getLowestPerPerson } from '../utils/pricing'

export default function PriceDisplay({ item, compact = false }) {
  const lowest = getLowestPerPerson(item)
  if (lowest === null) return <span className="price-enquiry"><small>Price</small><strong>Enquire for price</strong></span>

  const solo = item.pricing.tiers.find((tier) => tier.minGuests === 1 && tier.maxGuests === 1)
  return <span className={`tier-price ${compact ? 'tier-price--compact' : ''}`}><small>From · USD</small><strong>${lowest} <em>/ person</em></strong>{!compact && <><b>Group rate for 2–4 guests</b><i>Solo: ${solo?.perPerson}</i></>}</span>
}

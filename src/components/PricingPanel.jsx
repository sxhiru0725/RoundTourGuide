import { getLowestPerPerson } from '../utils/pricing'

export default function PricingPanel({ item, mobile = false }) {
  if (item.pricing?.status !== 'confirmed') {
    return mobile ? <span><strong>Price on request</strong></span> : <div className="detail-pricing"><small>Price</small><strong>Enquire for price</strong><p>Contact us for the confirmed rate for your group.</p></div>
  }

  const solo = item.pricing.tiers.find((tier) => tier.minGuests === 1)
  const group = item.pricing.tiers.find((tier) => tier.minGuests === 2)
  if (mobile) return <span>From <strong>${getLowestPerPerson(item)} / person</strong></span>

  return <div className="detail-pricing"><small>Confirmed pricing · USD</small><strong>From ${getLowestPerPerson(item)} <em>/ person</em></strong><div className="rate-table"><span>1 guest<b>${solo.perPerson} total</b></span><span>2–4 guests<b>${group.perPerson} per person</b></span></div></div>
}

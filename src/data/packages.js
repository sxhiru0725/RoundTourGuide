import { media } from './media.js'

export const packages = [
  { slug: 'ocean-starter', title: 'Ocean Starter', duration: '1 Day', pricing: { status: 'enquire', currency: 'USD' }, image: media.kayak, idealFor: 'First-time ocean explorers', summary: 'A perfectly paced introduction to Mirissa above and below the water.', days: [['Morning', 'Turtle snorkeling and reef discovery'], ['Afternoon', 'Coastal kayaking'], ['Golden hour', 'Sunset experience']] },
  { slug: 'deep-blue-adventure', title: 'Deep Blue Adventure', duration: '2 Days', pricing: { status: 'enquire', currency: 'USD' }, image: media.diving, idealFor: 'Active couples and friends', summary: 'Two full days balancing iconic wildlife, reef time and a sunset paddle.', days: [['Day 1', 'Whale watching, relaxed afternoon and sunset kayaking'], ['Day 2', 'Scuba diving and guided reef snorkeling']] },
  { slug: 'ultimate-mirissa', title: 'Ultimate Mirissa Ocean Experience', duration: '3 Days', pricing: { status: 'enquire', currency: 'USD' }, image: media.coastline, idealFor: 'Travellers who want it all', featured: true, summary: 'Our signature three-day journey through Mirissa’s most memorable ocean experiences.', days: [['Day 1', 'Whale watching and turtle snorkeling'], ['Day 2', 'Scuba diving and beach time'], ['Day 3', 'Coastal kayaking and sunset kayaking']] },
]

export const getPackage = (slug) => packages.find((item) => item.slug === slug)

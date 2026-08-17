import { media } from './media'

export const testimonials = [
  { quote: 'A calm, thoughtful introduction to the ocean—every detail felt considered.', name: 'Demo guest', trip: 'Whale Watching' },
  { quote: 'The small-group format made the whole day feel personal and unhurried.', name: 'Demo guest', trip: 'Scuba Diving' },
  { quote: 'Sunset from the kayak was the kind of travel moment you keep forever.', name: 'Demo guest', trip: 'Kayaking' },
]

export const team = [
  { name: 'Team member', role: 'Ocean Guide', detail: 'Profile and experience to be confirmed.', image: media.crew1 },
  { name: 'Team member', role: 'Dive Instructor', detail: 'Qualifications to be confirmed.', image: media.crew2 },
  { name: 'Team member', role: 'Boat Captain', detail: 'Profile and experience to be confirmed.', image: media.crew3 },
  { name: 'Team member', role: 'Kayak Guide', detail: 'Profile and experience to be confirmed.', image: media.crew4 },
]

export const gallery = [
  ['Whales', media.whale], ['Diving', media.diving], ['Reef', media.reef], ['Kayaking', media.kayak],
  ['Coastline', media.coastline], ['Ocean', media.boat], ['Snorkeling', media.whaleSnorkel], ['Sunsets', media.sunsetKayak],
]

export const faqs = [
  ['When is the best time to visit?', 'Ocean conditions and wildlife vary through the year. Share your travel dates and we’ll recommend the experiences that best suit the season.'],
  ['Are sightings guaranteed?', 'No. Wildlife is wild, and responsible operators never guarantee sightings or pressure animals for an encounter.'],
  ['Can beginners join?', 'Many experiences are beginner-friendly. Scuba and open-ocean encounters have specific health, age and ability requirements.'],
  ['What happens if the weather changes?', 'Safety comes first. We may adjust, postpone or cancel an experience when conditions are unsuitable.'],
  ['Do you offer hotel pickup?', 'Pickup can be requested during booking. Availability and any additional charge will be confirmed with you.'],
  ['Is equipment included?', 'Core safety and activity equipment is included unless the experience page states otherwise. Confirmed details appear in your booking summary.'],
]

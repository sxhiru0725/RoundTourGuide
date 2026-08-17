import { media } from './media'

const commonFaq = [
  ['Are wildlife sightings guaranteed?', 'No. Marine animals are wild, so sightings and conditions can never be guaranteed.'],
  ['What happens in poor weather?', 'The crew reviews sea and weather conditions before departure. Trips may be adjusted, postponed or cancelled for safety.'],
]

export const experiences = [
  {
    slug: 'whale-watching', title: 'Whale Watching in Mirissa', shortTitle: 'Whale Watching', category: 'Wildlife', image: media.whale,
    shortDescription: 'A respectful offshore journey in search of whales and dolphins with a knowledgeable local crew.',
    description: 'Head beyond Mirissa Bay for an unhurried morning on the Indian Ocean. Your crew explains the marine life, ocean conditions and responsible viewing practices along the way.',
    duration: '4–5 hours', difficulty: 'Easy', minAge: 'All ages', groupSize: 'Small groups', pricing: { status: 'enquire', currency: 'USD' },
    highlights: ['Early-morning ocean departure', 'Whale and dolphin interpretation', 'Responsible viewing approach', 'Light refreshments on board'],
    included: ['Safety briefing', 'Life jacket', 'Experienced boat crew', 'Water and light refreshments'],
    excluded: ['Hotel transfer unless selected', 'Personal expenses', 'Guaranteed sightings'],
    schedule: ['Meet and check in', 'Safety and wildlife briefing', 'Ocean search and observation', 'Return to Mirissa harbour'],
    bring: ['Sun protection', 'Light waterproof layer', 'Motion-sickness remedy if needed', 'Reusable water bottle'], faq: commonFaq,
  },
  {
    slug: 'whale-snorkeling', title: 'Whale Encounters in Mirissa', shortTitle: 'Whale Snorkeling', category: 'Signature', image: media.whaleSnorkel,
    shortDescription: 'A rare, carefully managed open-ocean encounter for confident swimmers in suitable conditions.',
    description: 'A specialist, conditions-led experience focused on observation without chasing, crowding or disturbing wildlife. Participation depends on sea state, animal behaviour and guide approval.',
    duration: '4–6 hours', difficulty: 'Advanced', minAge: '16+', groupSize: 'Very limited', pricing: { status: 'enquire', currency: 'USD' },
    highlights: ['Specialist ocean guide', 'Small participant group', 'Wildlife-first decisions', 'In-water opportunity only when appropriate'],
    included: ['Pre-trip assessment', 'Mask, snorkel and fins', 'Flotation equipment', 'Boat and specialist crew'],
    excluded: ['Guaranteed water entry', 'Guaranteed sightings', 'Underwater photography'],
    schedule: ['Swim ability check', 'Detailed safety briefing', 'Offshore search', 'Guide-led encounter if conditions allow'],
    bring: ['Swimwear', 'Towel', 'Reef-safe sun protection', 'Warm layer'], faq: commonFaq,
  },
  {
    slug: 'scuba-diving', title: 'Scuba Diving in Mirissa', shortTitle: 'Scuba Diving', category: 'Underwater', image: media.diving,
    shortDescription: 'Beginner-friendly introductions and guided dives for qualified divers along Sri Lanka’s southern coast.',
    description: 'Discover tropical reefs, rocky formations and vibrant marine life with a dive plan matched to your comfort and experience.',
    duration: '3–5 hours', difficulty: 'Moderate', minAge: '10+', groupSize: 'Up to 4 per guide', pricing: { status: 'enquire', currency: 'USD' },
    highlights: ['Small dive groups', 'Briefing and equipment checks', 'Options for first-timers', 'Local reef knowledge'],
    included: ['Dive equipment', 'Professional guide', 'Boat where required', 'Drinking water'], excluded: ['Certification course fees', 'Photos', 'Hotel transfer'],
    schedule: ['Paperwork and fit-out', 'Dive briefing', 'Water session or guided dive', 'Debrief'], bring: ['Swimwear', 'Towel', 'Certification card if qualified'], faq: commonFaq,
  },
  {
    slug: 'turtle-snorkeling', title: 'Turtle Snorkeling in Mirissa', shortTitle: 'Turtle Snorkeling', category: 'Easygoing', image: media.turtle,
    shortDescription: 'A relaxed, beginner-friendly coastal snorkel with a chance to observe green sea turtles responsibly.',
    description: 'Explore calm coastal water with a guide who helps you get comfortable, identify marine life and keep a respectful distance from turtles.',
    duration: '2 hours', difficulty: 'Easy', minAge: '8+', groupSize: 'Up to 4 guests', pricing: { status: 'confirmed', currency: 'USD', tiers: [{ minGuests: 1, maxGuests: 1, perPerson: 35 }, { minGuests: 2, maxGuests: 4, perPerson: 30 }] },
    highlights: ['Beginner orientation', 'Shallow coastal route', 'Turtle etiquette briefing', 'Time to explore at your pace'],
    included: ['Mask, snorkel and fins', 'Flotation aid', 'Guide', 'Water'], excluded: ['Turtle sighting guarantee', 'Transport', 'Meals'],
    schedule: ['Equipment fitting', 'Shore briefing', 'Guided snorkel', 'Refresh and recap'], bring: ['Swimwear', 'Towel', 'Reef-safe sunscreen'], faq: commonFaq,
  },
  {
    slug: 'reef-snorkeling', title: 'Reef Snorkeling in Mirissa', shortTitle: 'Reef Snorkeling', category: 'Underwater', image: media.reef,
    shortDescription: 'Glide above tropical reef habitat and learn the stories behind Mirissa’s underwater world.',
    description: 'A guided coastal snorkel designed around the day’s visibility and water conditions, with a focus on fish identification and reef care.',
    duration: '2–3 hours', difficulty: 'Easy–Moderate', minAge: '10+', groupSize: 'Up to 4 guests', pricing: { status: 'confirmed', currency: 'USD', tiers: [{ minGuests: 1, maxGuests: 1, perPerson: 35 }, { minGuests: 2, maxGuests: 4, perPerson: 30 }] },
    highlights: ['Local reef sites', 'Marine-life interpretation', 'Small groups', 'Low-impact guidance'],
    included: ['Snorkel equipment', 'Guide', 'Safety float', 'Water'], excluded: ['Meals', 'Hotel transfer', 'Photography'],
    schedule: ['Meet and fit equipment', 'Safety briefing', 'Guided reef exploration', 'Return and debrief'], bring: ['Swimwear', 'Towel', 'Sun protection'], faq: commonFaq,
  },
  {
    slug: 'kayaking', title: 'Kayaking in Mirissa', shortTitle: 'Kayak Adventures', category: 'Coastline', image: media.kayak,
    shortDescription: 'Paddle Mirissa’s coastline, sheltered bays and rocky edges from an entirely different perspective.',
    description: 'A guide-led coastal paddle with a route adapted to wind, waves and group confidence. No previous kayaking experience is required.',
    duration: '2 hours', difficulty: 'Easy–Moderate', minAge: '10+', groupSize: 'Up to 4 guests', pricing: { status: 'confirmed', currency: 'USD', tiers: [{ minGuests: 1, maxGuests: 1, perPerson: 40 }, { minGuests: 2, maxGuests: 4, perPerson: 30 }] },
    highlights: ['Stable sit-on-top kayaks', 'Coastal viewpoints', 'Paddling tuition', 'Flexible route'], included: ['Kayak and paddle', 'Life jacket', 'Guide', 'Dry bag'],
    excluded: ['Hotel transfer', 'Meals', 'Personal insurance'], schedule: ['Paddle briefing', 'Launch', 'Guided coastline route', 'Return to beach'], bring: ['Quick-dry clothing', 'Water shoes', 'Sun protection'], faq: commonFaq,
  },
  {
    slug: 'sunset-kayaking', title: 'Sunset Kayaking in Mirissa', shortTitle: 'Sunset Kayaking', category: 'Golden Hour', image: media.sunsetKayak,
    shortDescription: 'A golden-hour paddle timed for softer light, calmer energy and a memorable Mirissa sunset.',
    description: 'Wind down on the water as the southern sky changes colour. The exact route and timing follow safe conditions and the season’s sunset.',
    duration: '2 hours', difficulty: 'Easy', minAge: '10+', groupSize: 'Up to 4 guests', pricing: { status: 'confirmed', currency: 'USD', tiers: [{ minGuests: 1, maxGuests: 1, perPerson: 40 }, { minGuests: 2, maxGuests: 4, perPerson: 30 }] },
    highlights: ['Golden-hour departure', 'Relaxed pace', 'Coastal photo moments', 'Guide-led route'], included: ['Kayak and paddle', 'Life jacket', 'Guide', 'Dry bag'],
    excluded: ['Professional photos', 'Hotel transfer', 'Meals'], schedule: ['Meet before sunset', 'Briefing and launch', 'Golden-hour paddle', 'Return before dark'], bring: ['Quick-dry clothing', 'Light layer', 'Water shoes'], faq: commonFaq,
  },
  {
    slug: 'surf-lessons', title: 'Surf Lessons in Mirissa', shortTitle: 'Surf Lessons', category: 'Learn to Surf', image: media.surf,
    shortDescription: 'Friendly, confidence-building surf tuition shaped around your ability and the day’s conditions.',
    description: 'Learn the foundations of surfing with a practical beach briefing, guided water time and personal feedback in conditions suited to your level.',
    duration: '2 hours', difficulty: 'Beginner–Moderate', minAge: '8+', groupSize: 'Up to 4 guests', pricing: { status: 'confirmed', currency: 'USD', tiers: [{ minGuests: 1, maxGuests: 1, perPerson: 45 }, { minGuests: 2, maxGuests: 4, perPerson: 35 }] },
    highlights: ['Small lesson groups', 'Technique matched to your level', 'Beach and water instruction', 'Conditions-led coaching'],
    included: ['Surfboard', 'Rash vest', 'Instructor', 'Safety briefing'], excluded: ['Hotel transfer', 'Meals', 'Professional photography'],
    schedule: ['Meet your instructor', 'Beach technique and safety briefing', 'Guided water session', 'Feedback and recap'], bring: ['Swimwear', 'Towel', 'Reef-safe sun protection'], faq: commonFaq,
  },
]

export const getExperience = (slug) => experiences.find((item) => item.slug === slug)

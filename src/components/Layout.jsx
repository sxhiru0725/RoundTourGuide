import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { business } from '../config/business'
import { getExperience } from '../data/experiences'
import { getPackage } from '../data/packages'

const pageMeta = {
  '/': ['Mirissa Ocean Adventures | Whales, Diving & Kayaking', 'Explore whale watching, scuba diving, snorkeling and kayaking experiences in Mirissa, Sri Lanka.'],
  '/experiences': ['Ocean Experiences in Mirissa | Mirissa Ocean Adventures', 'Discover responsible whale watching, diving, snorkeling and kayaking experiences in Mirissa.'],
  '/packages': ['Mirissa Ocean Adventure Packages | 1–3 Day Journeys', 'Explore sample multi-day ocean adventure packages in Mirissa, Sri Lanka.'],
  '/about': ['About | Mirissa Ocean Adventures', 'Meet the approach and values behind thoughtful ocean adventures in Mirissa.'],
  '/gallery': ['Ocean Gallery | Mirissa Ocean Adventures', 'See whales, diving, reefs, kayaking and the Mirissa coast through our gallery.'],
  '/safety': ['Safety & Responsible Tourism | Mirissa Ocean Adventures', 'Learn about our safety approach and responsible wildlife practices in Mirissa.'],
  '/faq': ['Frequently Asked Questions | Mirissa Ocean Adventures', 'Answers about weather, wildlife, equipment and pickup for your Mirissa adventure.'],
  '/contact': ['Contact | Mirissa Ocean Adventures', 'Contact us to plan whale, dive, snorkel and kayak experiences in Mirissa.'],
  '/booking': ['Book Your Adventure | Mirissa Ocean Adventures', 'Build a booking request for an ocean experience or package in Mirissa.'],
  '/privacy': ['Privacy Policy | Mirissa Ocean Adventures', 'Privacy information for Mirissa Ocean Adventures website visitors and guests.'],
  '/terms': ['Terms & Conditions | Mirissa Ocean Adventures', 'Booking terms and conditions for Mirissa Ocean Adventures.'],
  '/cancellation': ['Cancellation Policy | Mirissa Ocean Adventures', 'Cancellation and rescheduling information for Mirissa Ocean Adventures.'],
}

export default function Layout() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const experience = location.pathname.startsWith('/experiences/') ? getExperience(location.pathname.split('/').pop()) : null
    const tripPackage = location.pathname.startsWith('/packages/') ? getPackage(location.pathname.split('/').pop()) : null
    const basePath = experience ? '/experiences' : tripPackage ? '/packages' : location.pathname
    const [title, description] = experience
      ? [`${experience.title}, Sri Lanka | Mirissa Ocean Adventures`, experience.shortDescription]
      : tripPackage
        ? [`${tripPackage.title} | Mirissa Ocean Adventures`, tripPackage.summary]
        : pageMeta[basePath] || ['Mirissa Ocean Adventures', 'Thoughtful ocean adventures in Mirissa, Sri Lanka.']
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [location.pathname])
  return <><Navbar /><main><Outlet /></main><Footer />{business.whatsapp && <a className="whatsapp" href={`https://wa.me/${business.whatsapp}`} aria-label="Chat on WhatsApp">Chat</a>}</>
}

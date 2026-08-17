import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ExperienceCard from '../components/ExperienceCard'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { experiences } from '../data/experiences'
import { media } from '../data/media'

export default function Experiences() {
  return <><PageHero eyebrow="Explore your way" title="Ocean experiences, made for Mirissa." copy="Wildlife, reefs and open coastline—choose the pace and perspective that feels like you." image={media.whaleSnorkel} /><section className="section"><div className="container"><SectionHeader eyebrow="Eight ways into the blue" title="Find your experience" copy="Every tour is shaped by the day’s weather, water and group—not a rigid script." /><div className="experience-grid listing-grid">{experiences.map((x) => <ExperienceCard key={x.slug} item={x} />)}</div></div></section><section className="section section--navy"><div className="container responsible-banner"><div><span className="eyebrow">Wildlife on its own terms</span><h2>Observe. Never chase.</h2></div><p>We aim to maintain respectful distances, follow local guidance and make every decision around animal welfare. Sightings and in-water opportunities are never guaranteed.</p><Link className="text-link text-link--light" to="/safety">Our responsibility policy <ArrowRight /></Link></div></section><CTASection /></>
}

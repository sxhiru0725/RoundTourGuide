import { useState } from 'react'
import { ArrowRight, Binoculars, CalendarDays, Check, ChevronDown, Compass, Fish, Gauge, Heart, LifeBuoy, MapPin, Search, ShieldCheck, Sparkles, Star, Users, Waves } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ExperienceCard from '../components/ExperienceCard'
import PackageCard from '../components/PackageCard'
import SectionHeader from '../components/SectionHeader'
import CTASection from '../components/CTASection'
import { experiences } from '../data/experiences'
import { packages } from '../data/packages'
import { gallery, team, testimonials } from '../data/content'
import { media } from '../data/media'

const marine = [
  ['Blue whale', 'The largest animal on Earth visits the deep waters off Sri Lanka.', media.whale],
  ['Green sea turtle', 'A graceful coastal resident that must always be given space.', media.turtle],
  ['Tropical reef', 'Colour, movement and life gather around Mirissa’s reef habitat.', media.reef],
]

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState({ experience: 'whale-watching', date: '', guests: '2' })
  const submit = (e) => { e.preventDefault(); navigate(`/booking?experience=${search.experience}&date=${search.date}&guests=${search.guests}`) }
  return <>
    <section className="home-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,20,33,.86) 0%, rgba(4,20,33,.35) 60%, rgba(4,20,33,.12)), url(${media.hero})` }}>
      <div className="container home-hero__inner"><span className="eyebrow eyebrow--light"><Waves size={15} /> Sri Lanka’s southern coast</span><h1>Discover Mirissa<br /><em>below the surface.</em></h1><p>Whale encounters, scuba diving, snorkeling, kayaking and unforgettable ocean adventures on Sri Lanka’s southern coast.</p><div className="button-row"><Link className="button button--coral" to="/experiences">Explore experiences <ArrowRight size={18} /></Link><Link className="text-link text-link--light" to="/booking">Book now <ArrowRight size={17} /></Link></div></div>
      <div className="container trust-row"><span><Star size={16} />Guest ratings coming soon</span><span><Compass size={16} />Experienced guides</span><span><Users size={16} />Small groups</span><span><MapPin size={16} />Mirissa, Sri Lanka</span></div>
    </section>
    <div className="container search-wrap"><form className="adventure-search" onSubmit={submit}>
      <div className="search-title"><Search /><span><small>Start here</small>Find your adventure</span></div>
      <label><span>Experience</span><div><Waves size={18} /><select value={search.experience} onChange={(e) => setSearch({ ...search, experience: e.target.value })}>{experiences.map((x) => <option key={x.slug} value={x.slug}>{x.shortTitle}</option>)}</select><ChevronDown size={16} /></div></label>
      <label><span>Date</span><div><CalendarDays size={18} /><input type="date" value={search.date} onChange={(e) => setSearch({ ...search, date: e.target.value })} /></div></label>
      <label><span>Guests</span><div><Users size={18} /><select value={search.guests} onChange={(e) => setSearch({ ...search, guests: e.target.value })}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n}</option>)}</select><ChevronDown size={16} /></div></label>
      <button className="button button--navy">Find adventure <ArrowRight size={18} /></button>
    </form></div>

    <section className="section experiences-section"><div className="container"><div className="section-heading-row"><SectionHeader eyebrow="Made for the curious" title="Choose your ocean adventure" copy="From peaceful coastal paddles to the open blue, find the experience that matches your pace." /><Link className="text-link" to="/experiences">View all experiences <ArrowRight size={17} /></Link></div><div className="experience-grid">{experiences.map((item, i) => <ExperienceCard item={item} key={item.slug} featured={i === 0} />)}</div></div></section>

    <section className="section section--sand"><div className="container"><SectionHeader eyebrow="Go deeper" title="One coast. Three unforgettable days." align="center" copy="Our signature journey brings Mirissa’s most memorable moments together without rushing a single one." /><div className="featured-package"><div className="featured-package__image"><img src={packages[2].image} alt="Mirissa coastline" loading="lazy" /><span>Signature journey</span></div><div className="featured-package__body"><span className="eyebrow">3 days · multi-activity</span><h2>{packages[2].title}</h2><p>{packages[2].summary}</p><ol>{packages[2].days.map(([day, plan], i) => <li key={day}><span>0{i + 1}</span><div><strong>{day}</strong><p>{plan}</p></div></li>)}</ol><div className="featured-package__footer"><span><small>Package price</small><strong className="request-price">On request</strong></span><Link className="button button--navy" to="/packages/ultimate-mirissa">View package <ArrowRight size={18} /></Link></div></div></div></div></section>

    <section className="section why-section"><div className="container why-grid"><div><SectionHeader eyebrow="The better way to explore" title="Ocean adventures done differently" copy="Thoughtful groups, clear guidance and deep respect for the water shape every trip we plan." /><Link className="text-link" to="/about">Our approach <ArrowRight size={17} /></Link></div><div className="values-grid">{[[Users,'Small groups','More space, more attention and a more personal day.'],[Compass,'Local perspective','Ocean knowledge and stories grounded in Mirissa.'],[ShieldCheck,'Safety first','Briefings, equipment checks and conditions-led decisions.'],[Heart,'Respect the ocean','Wildlife-first practices that never promise or pressure encounters.']].map(([Icon,title,copy]) => <article key={title}><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="marine-section"><div className="container"><SectionHeader eyebrow="Wild lives, wild water" title="Meet Mirissa’s ocean" copy="The wonder is in watching nature on its own terms." light /><div className="marine-grid">{marine.map(([name,copy,image], i) => <article key={name} className={i === 0 ? 'wide' : ''}><img src={image} alt={name} loading="lazy" /><div><span>0{i+1}</span><h3>{name}</h3><p>{copy}</p></div></article>)}</div><p className="wildlife-note"><Heart size={17} />Sightings are never guaranteed. Every encounter depends on wildlife behaviour, weather and responsible distance.</p></div></section>

    <section className="section gallery-preview"><div className="container"><div className="section-heading-row"><SectionHeader eyebrow="Stories from the water" title="See Mirissa through our lens" /><Link className="text-link" to="/gallery">View gallery <ArrowRight size={17} /></Link></div><div className="photo-ribbon">{gallery.slice(0,5).map(([label,image], i) => <Link key={label} className={`photo-${i+1}`} to="/gallery"><img src={image} alt={label} loading="lazy" /><span>{label}</span></Link>)}</div></div></section>

    <section className="section testimonials-section"><div className="container"><SectionHeader eyebrow="Guestbook" title="Adventures guests never forget" align="center" copy="Layout preview with clearly marked demonstration testimonials, ready for verified review integration." /><div className="testimonial-grid">{testimonials.map((item, i) => <blockquote key={i}><div className="quote-mark">“</div><p>{item.quote}</p><footer><span>{item.name}</span><small>{item.trip} · demo content</small></footer></blockquote>)}</div></div></section>

    <section className="section crew-preview"><div className="container"><div className="section-heading-row"><SectionHeader eyebrow="People make the journey" title="Meet your ocean crew" copy="Warm local guidance and calm, capable support from shore to sea." /><Link className="text-link" to="/about">Meet the team <ArrowRight size={17} /></Link></div><div className="team-grid">{team.map((person) => <article key={person.role}><img src={person.image} alt={`${person.role} placeholder portrait`} loading="lazy" /><div><small>{person.role}</small><h3>{person.name}</h3><p>{person.detail}</p></div></article>)}</div></div></section>

    <section className="section safety-strip"><div className="container safety-grid"><div className="safety-visual" style={{backgroundImage:`url(${media.diving})`}}><span><LifeBuoy />Conditions before schedules</span></div><div><SectionHeader eyebrow="Adventure with confidence" title="Ready for wonder. Prepared for the water." copy="Clear pre-tour briefings, appropriate safety equipment, weather monitoring and limited group sizes sit at the centre of every experience." /><ul className="check-list">{['Pre-tour safety briefings','Life jackets and flotation aids','Equipment checks','Weather and sea monitoring','Emergency procedures','Group sizes matched to the activity'].map((x) => <li key={x}><Check />{x}</li>)}</ul><Link className="button button--navy" to="/safety">Learn about safety <ArrowRight size={18} /></Link></div></div></section>

    <section className="location-section"><div className="container location-grid"><div><SectionHeader eyebrow="Sri Lanka’s south coast" title="Your adventure starts in Mirissa" light copy="A laid-back bay where deep ocean, reef and coastline meet within reach of the shore." /><div className="location-facts"><span><MapPin />Meeting point<strong>Confirmed after booking</strong></span><span><Gauge />Pickup options<strong>Available on request</strong></span></div></div><div className="map-placeholder"><div><MapPin /><strong>Mirissa</strong><span>Southern Province · Sri Lanka</span></div><small>Map integration ready for confirmed business location</small></div></div></section>
    <CTASection />
  </>
}

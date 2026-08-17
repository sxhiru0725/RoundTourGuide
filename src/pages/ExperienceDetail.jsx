import { ArrowLeft, ArrowRight, Check, Clock, Gauge, MapPin, ShieldCheck, Users, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getExperience, experiences } from '../data/experiences'
import Accordion from '../components/Accordion'
import ExperienceCard from '../components/ExperienceCard'
import CTASection from '../components/CTASection'
import NotFound from './NotFound'
import PricingPanel from '../components/PricingPanel'

export default function ExperienceDetail() {
  const { slug } = useParams(); const item = getExperience(slug)
  if (!item) return <NotFound />
  const related = experiences.filter((x) => x.slug !== slug).slice(0, 3)
  return <>
    <section className="detail-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(7,28,44,.9),rgba(7,28,44,.2)),url(${item.image})`}}><div className="container"><Link className="back-link" to="/experiences"><ArrowLeft /> All experiences</Link><span className="eyebrow">{item.category} · Mirissa</span><h1>{item.title}</h1><p>{item.shortDescription}</p><div className="detail-quick"><span><Clock />{item.duration}</span><span><Gauge />{item.difficulty}</span><span><Users />{item.groupSize}</span><span><MapPin />Mirissa</span></div></div></section>
    <section className="section detail-section"><div className="container detail-layout"><div className="detail-content">
      <section><span className="eyebrow">Overview</span><h2>A closer look at the experience</h2><p className="lead">{item.description}</p></section>
      <section><h2>Why you’ll love it</h2><div className="highlight-grid">{item.highlights.map((x,i) => <div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></section>
      <section><h2>Your experience</h2><div className="timeline">{item.schedule.map((x,i)=><div key={x}><span>{i+1}</span><div><small>Part {i+1}</small><strong>{x}</strong></div></div>)}</div></section>
      <section className="included-grid"><div><h2>What’s included</h2><ul>{item.included.map((x)=><li key={x}><Check />{x}</li>)}</ul></div><div><h2>Not included</h2><ul>{item.excluded.map((x)=><li key={x}><X />{x}</li>)}</ul></div></section>
      <section><h2>What to bring</h2><div className="tag-list">{item.bring.map(x=><span key={x}>{x}</span>)}</div></section>
      <section className="policy-box"><ShieldCheck /><div><h2>Safety & wildlife policy</h2><p>Participation and routes depend on weather, sea conditions and guide assessment. Wildlife interactions always put animal welfare first; sightings are not guaranteed.</p><Link to="/safety">Read our approach <ArrowRight /></Link></div></section>
      <section><h2>Frequently asked</h2><Accordion items={item.faq} /></section>
    </div><aside className="booking-sidebar"><span className="eyebrow">Reserve your place</span><PricingPanel item={item}/><div className="booking-facts"><span><Clock />{item.duration}</span><span><Users />{item.groupSize}</span><span><Gauge />Minimum age: {item.minAge}</span></div><Link className="button button--coral button--full" to={`/booking?experience=${item.slug}`}>Check availability <ArrowRight /></Link><p className="fine-print">No payment is taken on this site. Final availability is confirmed personally.</p></aside></div></section>
    <section className="section section--sand"><div className="container"><span className="eyebrow">Keep exploring</span><h2 className="related-title">Related experiences</h2><div className="experience-grid listing-grid">{related.map(x=><ExperienceCard key={x.slug} item={x}/>)}</div></div></section><div className="mobile-book-bar"><PricingPanel item={item} mobile/><Link className="button button--coral" to={`/booking?experience=${item.slug}`}>Check dates</Link></div><CTASection />
  </>
}

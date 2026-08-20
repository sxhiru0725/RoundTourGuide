import { ArrowLeft, ArrowRight, Check, Clock, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getPackage } from '../data/packages'
import CTASection from '../components/CTASection'
import NotFound from './NotFound'

export default function PackageDetail() {
  const item = getPackage(useParams().slug)
  if (!item) return <NotFound />
  return <>
    <section className="detail-hero package-detail-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(7,28,44,.9),rgba(7,28,44,.2)),url(${item.image})` }}><div className="container"><Link className="back-link" to="/packages"><ArrowLeft /> All packages</Link><span className="eyebrow">{item.duration} · curated journey</span><h1>{item.title}</h1><p>{item.summary}</p><div className="detail-quick"><span><Clock />{item.duration}</span><span><Sparkles />{item.idealFor}</span></div></div></section>
    <section className="section"><div className="container detail-layout"><div className="detail-content"><section><span className="eyebrow">Day by day</span><h2>Your Mirissa journey</h2><p className="lead">Each day is sequenced around the best available water and weather conditions. The final order may change to make the most of your visit.</p><div className="package-days">{item.days.map(([day, plan], i) => <article key={day}><span>0{i + 1}</span><div><small>{day}</small><h3>{plan}</h3><p>Briefings, core activity equipment and guide support are included for the listed experiences.</p></div></article>)}</div></section><section className="included-grid"><div><h2>Included</h2><ul>{['Listed guided experiences', 'Core activity equipment', 'Safety briefings', 'Trip planning support'].map((x) => <li key={x}><Check />{x}</li>)}</ul></div><div><h2>Plan separately</h2><ul>{['Accommodation', 'Meals unless confirmed', 'Flights and insurance', 'Optional transfers'].map((x) => <li key={x}><Check />{x}</li>)}</ul></div></section></div><aside className="booking-sidebar"><span className="eyebrow">Plan this journey</span><div className="detail-pricing"><small>Package price</small><strong>On request</strong></div><p>Tell us your dates, group and experience level. We’ll shape a final plan around the conditions.</p><Link className="button button--coral button--full" to={`/booking?package=${item.slug}`}>Request Availability <ArrowRight /></Link><p className="fine-print">No payment is taken on this site.</p></aside></div></section><CTASection />
  </>
}

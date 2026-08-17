import { ArrowUpRight, Globe, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { business } from '../config/business'
import { experiences } from '../data/experiences'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-intro"><Brand light /><p>Thoughtful ocean adventures on Sri Lanka’s southern coast, from the surface to the reef below.</p><span className="demo-label">Pre-launch website</span></div>
        <div><h3>Explore</h3>{experiences.slice(0, 5).map((x) => <Link key={x.slug} to={`/experiences/${x.slug}`}>{x.shortTitle}</Link>)}</div>
        <div><h3>Useful</h3><Link to="/about">About us</Link><Link to="/safety">Safety & responsibility</Link><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link><Link to="/booking">Booking</Link></div>
        <div><h3>Find us</h3><p className="icon-line"><MapPin size={16} />{business.location}</p><a className="icon-line" href={`mailto:${business.email}`}><Mail size={16} />{business.email}</a><span className="icon-line"><Globe size={16} />Social links pending</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><div><Link to="/safety">Responsible tourism</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cancellation">Cancellation</Link></div><Link to="/booking">Plan your trip <ArrowUpRight size={15} /></Link></div>
    </footer>
  )
}

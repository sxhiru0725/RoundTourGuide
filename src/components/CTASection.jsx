import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { media } from '../data/media'

export default function CTASection() {
  return <section className="final-cta" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,28,44,.9), rgba(7,28,44,.2)), url(${media.boat})` }}><div className="container"><span className="eyebrow">Your Mirissa story</span><h2>The ocean is waiting.</h2><p>Plan your next unforgettable adventure in Mirissa.</p><div className="button-row"><Link className="button button--coral" to="/booking">Book your adventure <ArrowRight size={18} /></Link><Link className="button button--outline-light" to="/contact"><MessageCircle size={18} />Chat with us</Link></div></div></section>
}

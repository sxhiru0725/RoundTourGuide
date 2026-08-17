import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PackageCard({ item }) {
  return <article className="package-card"><img src={item.image} alt="" loading="lazy" /><div className="package-card__overlay"><span className="pill">{item.duration}</span><div><p>{item.idealFor}</p><h3>{item.title}</h3><div className="package-card__foot"><span><strong>Price on request</strong></span><Link to={`/packages/${item.slug}`}>View journey <ArrowRight size={16} /></Link></div></div></div></article>
}

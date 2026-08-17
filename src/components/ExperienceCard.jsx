import { ArrowUpRight, Clock, Gauge } from 'lucide-react'
import { Link } from 'react-router-dom'
import PriceDisplay from './PriceDisplay'

export default function ExperienceCard({ item, featured = false }) {
  return (
    <article className={`experience-card ${featured ? 'experience-card--featured' : ''}`}>
      <Link className="experience-card__image" to={`/experiences/${item.slug}`}><img src={item.image} alt={`${item.shortTitle} in Mirissa`} loading="lazy" /><span>{item.category}</span></Link>
      <div className="experience-card__body"><div><h3><Link to={`/experiences/${item.slug}`}>{item.shortTitle}</Link></h3><p>{item.shortDescription}</p></div>
        <div className="card-meta"><span><Clock size={16} />{item.duration}</span><span><Gauge size={16} />{item.difficulty}</span></div>
        <div className="card-footer"><PriceDisplay item={item} /><Link className="circle-link" to={`/experiences/${item.slug}`} aria-label={`View ${item.shortTitle}`}><ArrowUpRight /></Link></div>
      </div>
    </article>
  )
}

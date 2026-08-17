import { Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from '../config/business'

export default function Brand({ light = false }) {
  return (
    <Link className={`brand ${light ? 'brand--light' : ''}`} to="/" aria-label={`${business.name} home`}>
      <span className="brand__mark"><Waves size={22} strokeWidth={1.8} /></span>
      <span><strong>Mirissa Ocean</strong><small>Adventures</small></span>
    </Link>
  )
}

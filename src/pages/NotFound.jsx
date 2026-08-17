import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function NotFound(){return <section className="not-found"><div><span className="eyebrow">404 · Off course</span><h1>This page drifted out to sea.</h1><p>Let’s get you back to Mirissa.</p><Link className="button button--coral" to="/"><ArrowLeft/> Back home</Link></div></section>}

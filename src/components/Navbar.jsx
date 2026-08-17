import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Brand from './Brand'
import { experiences } from '../data/experiences'

const links = [['Home', '/'], ['Experiences', '/experiences'], ['Packages', '/packages'], ['About', '/about'], ['Gallery', '/gallery'], ['FAQs', '/faq'], ['Contact', '/contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Brand light />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, to]) => label === 'Experiences' ? (
            <div className="nav-dropdown" key={to}>
              <NavLink to={to}>{label}<ChevronDown size={14} /></NavLink>
              <div className="dropdown-panel">
                <span className="eyebrow">Find your element</span>
                {experiences.map((item) => <Link key={item.slug} to={`/experiences/${item.slug}`}>{item.shortTitle}<small>{item.category}</small></Link>)}
              </div>
            </div>
          ) : <NavLink key={to} to={to}>{label}</NavLink>)}
        </nav>
        <Link className="button button--coral nav-cta" to="/booking">Book your adventure</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav className="container" aria-label="Mobile navigation">
          {links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <Link className="button button--coral" to="/booking" onClick={() => setOpen(false)}>Book your adventure</Link>
        </nav>
      </div>
    </header>
  )
}

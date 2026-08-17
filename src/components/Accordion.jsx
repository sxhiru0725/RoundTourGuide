import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function Accordion({ items }) {
  const [active, setActive] = useState(0)
  return <div className="accordion">{items.map(([q, a], index) => <div className={`accordion-item ${active === index ? 'is-open' : ''}`} key={q}><h3><button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>{q}<Plus /></button></h3><div className="accordion-answer"><p>{a}</p></div></div>)}</div>
}

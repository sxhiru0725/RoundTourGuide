export default function SectionHeader({ eyebrow, title, copy, light = false, align = 'left' }) {
  return <div className={`section-header section-header--${align} ${light ? 'section-header--light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

export default function PageHero({ eyebrow, title, copy, image, children, compact = false }) {
  return <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`} style={image ? { backgroundImage: `linear-gradient(90deg, rgba(7,28,44,.88), rgba(7,28,44,.25)), url(${image})` } : undefined}><div className="container page-hero__inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy && <p>{copy}</p>}{children}</div></section>
}

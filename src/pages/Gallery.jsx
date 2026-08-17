import { useState } from 'react'
import PageHero from '../components/PageHero'
import { gallery } from '../data/content'
import { media } from '../data/media'

export default function Gallery() {
  const [filter,setFilter]=useState('All'); const filters=['All',...new Set(gallery.map(x=>x[0]))]
  const shown=filter==='All'?gallery:gallery.filter(x=>x[0]===filter)
  return <><PageHero compact eyebrow="Through our lens" title="Salt, sunlight and the open blue." copy="A temporary gallery layout ready for your real boats, crew, guests and wildlife photography." image={media.sunsetKayak}/><section className="section"><div className="container"><div className="filter-bar" role="group" aria-label="Filter gallery">{filters.map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="gallery-grid">{shown.map(([label,image],i)=><figure key={`${label}-${i}`}><img src={image} alt={`${label} in Mirissa`} loading="lazy"/><figcaption><span>{label}</span><small>Temporary editorial image</small></figcaption></figure>)}</div><p className="demo-note">Replace temporary imagery with approved business photography before launch.</p></div></section></>
}

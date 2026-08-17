import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { packages } from '../data/packages'
import { media } from '../data/media'

export default function Packages() {
  return <><PageHero eyebrow="More time, more ocean" title="Mirissa journeys, thoughtfully put together." copy="Multi-day adventures that leave room for weather, wonder and a little beach time too." image={media.coastline} /><section className="section"><div className="container"><SectionHeader eyebrow="Choose your rhythm" title="Ocean adventure packages" copy="Use these sample journeys as a starting point. We’ll tailor the sequence around conditions and your group." /><div className="packages-grid">{packages.map(x=><PackageCard item={x} key={x.slug}/>)}</div><p className="demo-note">Package prices have not been supplied and are available on request. Itineraries, accommodation and transport must be confirmed in writing.</p></div></section><CTASection /></>
}

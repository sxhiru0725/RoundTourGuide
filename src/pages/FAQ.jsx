import Accordion from '../components/Accordion'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import { faqs } from '../data/content'
import { media } from '../data/media'

export default function FAQ(){return <><PageHero compact eyebrow="Good to know" title="Questions before you get your feet wet." copy="The essentials for planning a smooth day on and under the water." image={media.reef}/><section className="section"><div className="container narrow"><span className="eyebrow">Planning your trip</span><h2 className="faq-title">Frequently asked questions</h2><Accordion items={faqs}/><div className="question-box"><h3>Still curious?</h3><p>Send us your dates, group size and the kind of ocean day you have in mind.</p><a className="button button--navy" href="/contact">Ask a question</a></div></div></section><CTASection/></>}

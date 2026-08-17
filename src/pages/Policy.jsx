import PageHero from '../components/PageHero'

const policies = {
  privacy: ['Privacy Policy', 'How guest information will be handled.', ['This website’s enquiry and booking interfaces are currently demonstrations and do not transmit or store personal information.', 'Before enabling submissions, document what information is collected, why it is needed, how long it is retained, who can access it and how guests can request deletion.', 'Add the approved privacy contact and any analytics or third-party service disclosures before launch.']],
  terms: ['Terms & Conditions', 'The agreement behind every confirmed adventure.', ['Final booking terms must define confirmation, guest responsibilities, activity requirements, prices and payment timing.', 'Guests should receive confirmed inclusions, meeting details and material activity risks before payment.', 'This placeholder is not legal advice and must be replaced with business-approved terms before launch.']],
  cancellation: ['Cancellation Policy', 'Clear expectations when plans or conditions change.', ['Define guest cancellation windows, refunds, rescheduling and no-show treatment before accepting bookings.', 'Weather and sea conditions may require the operator to adjust, postpone or cancel an activity for safety.', 'This placeholder must be replaced with the operator’s approved policy before launch.']],
}

export default function Policy({ type }) {
  const [title, subtitle, paragraphs] = policies[type]
  return <><PageHero compact eyebrow="Pre-launch policy" title={title} copy={subtitle}/><section className="section"><div className="container narrow"><span className="eyebrow">Approval required</span><h2>Plain language, before launch.</h2>{paragraphs.map((text)=><p key={text}>{text}</p>)}</div></section></>
}

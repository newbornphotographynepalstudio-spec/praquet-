import { FaWhatsapp } from 'react-icons/fa'
import Container from './Container'
import Eyebrow from './Eyebrow'
import Button from './Button'
import { contact } from '../../data/contact'

// Reusable closing CTA band used across material, service, location and
// landing pages — one consistent "next step" moment instead of ad hoc CTA
// styling per page (see site-wide CTA strategy in README.md). WhatsApp is
// shown by default alongside the consultation form link, since it's a
// real, fast conversion channel — pass `showWhatsapp={false}` to omit it.
export default function ConsultationCTA({
  eyebrow = 'Next Step',
  title = 'Ready to talk through your space?',
  description = 'Get a free consultation on flooring and wall panel materials suited to your project.',
  primaryCta = { label: 'Get a Free Consultation', to: '/contact' },
  secondaryCta,
  showWhatsapp = true,
  className = '',
}) {
  return (
    <section className={`bg-navy py-20 md:py-24 ${className}`}>
      <Container narrow className="text-center">
        <Eyebrow tone="light" className="mb-4 justify-center text-gold-soft">
          {eyebrow}
        </Eyebrow>
        <h2 className="mx-auto max-w-xl font-display text-display-md text-ivory">{title}</h2>
        {description && <p className="mx-auto mt-4 max-w-lg font-body text-base text-ivory/75">{description}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button to={primaryCta.to} variant="inverse">
            {primaryCta.label}
          </Button>
          {showWhatsapp && (
            <Button href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <FaWhatsapp size={16} aria-hidden="true" />
              Get a Quote on WhatsApp
            </Button>
          )}
          {secondaryCta && (
            <Button to={secondaryCta.to} variant="ghost" className="text-ivory hover:text-gold-soft">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}

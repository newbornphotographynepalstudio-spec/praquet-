import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2'
import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import SocialLinks from '../components/ui/SocialLinks'
import ConsultationForm from '../components/forms/ConsultationForm'
import { contact } from '../data/contact'

export default function Contact() {
  return (
    <Layout>
      <Seo
        title="Contact"
        description="Get a free consultation on flooring and wall panel materials for your space. Call, WhatsApp or email Parquet & Decor Nepal."
        path="/contact"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container narrow>
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div>
              <Eyebrow className="mb-5">Get in Touch</Eyebrow>
              <h1 className="font-display text-display-lg text-navy">Let's Talk About Your Space</h1>
              <p className="mt-5 max-w-md font-body text-base leading-relaxed text-charcoal">
                Tell us a little about your project and the materials you're considering. We'll follow up to plan
                next steps — whether that's a material recommendation or a full consultation.
              </p>

              <ul className="mt-8 space-y-3 border-t border-navy/10 pt-6">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="flex items-center gap-3 font-body text-sm font-semibold text-navy transition-colors hover:text-gold"
                  >
                    <HiOutlinePhone size={20} className="shrink-0 text-gold" aria-hidden="true" />
                    Call {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-sm font-semibold text-navy transition-colors hover:text-gold"
                  >
                    <FaWhatsapp size={20} className="shrink-0 text-gold" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={contact.emailHref}
                    className="flex items-center gap-3 font-body text-sm font-semibold text-navy transition-colors hover:text-gold"
                  >
                    <HiOutlineEnvelope size={20} className="shrink-0 text-gold" aria-hidden="true" />
                    {contact.emailDisplay}
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-navy/10 pt-6">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-navy">
                  Follow Along
                </span>
                <SocialLinks tone="dark" className="mt-3" />
              </div>

              <p className="mt-8 font-body text-xs text-charcoal/60">
                Serving Kathmandu, Lalitpur and Bhaktapur. Let us know your location and we'll confirm feasibility
                for your project.
              </p>
            </div>

            <ConsultationForm />
          </div>
        </Container>
      </section>
    </Layout>
  )
}

import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import BrandMark from '../ui/BrandMark'
import SocialLinks from '../ui/SocialLinks'
import { footerNav } from '../../data/navigation'
import { contact, developer } from '../../data/contact'

export default function Footer() {
  return (
    <footer className="bg-navy text-ivory">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
          <BrandMark tone="light" className="mb-5" />
          <p className="max-w-xs font-body text-sm leading-relaxed text-ivory/70">
            Flooring &amp; Wall Panel Solutions for residential and commercial spaces across Nepal.
          </p>

          <ul className="mt-5 space-y-2 font-body text-sm text-ivory/80">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-ivory">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ivory"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="transition-colors hover:text-ivory">
                {contact.emailDisplay}
              </a>
            </li>
          </ul>

          <SocialLinks tone="light" className="mt-6" />
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-sm text-ivory/80 transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-center font-body text-xs text-ivory/60 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Parquet &amp; Decor Nepal. All rights reserved.</p>
          <p>Kathmandu Valley, Nepal</p>
          <p className="text-ivory/40">
            Designed &amp; Crafted by{' '}
            <a
              href={developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/50 underline decoration-ivory/20 underline-offset-2 transition-colors hover:text-ivory/80"
            >
              {developer.name}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  )
}

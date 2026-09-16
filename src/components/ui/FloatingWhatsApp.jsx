import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsappEnquiryUrl } from '../../data/contact'

const DEFAULT_MESSAGE =
  'Hello Parquet & Decor Nepal, I would like to know more about your flooring and wall panel solutions.'

// Site-wide floating WhatsApp action (Phase 2.3). Desktop/tablet only
// (`xl:flex` + hidden below `xl`) — below that breakpoint the mobile
// sticky CTA (see MobileStickyCTA) already has its own WhatsApp action, and
// showing both at once would be two competing WhatsApp buttons on screen.
// Plain native <a>, no third-party widget/dependency.
export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsappEnquiryUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Parquet & Decor Nepal on WhatsApp"
      className="fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-gold-soft bg-gold-soft text-navy shadow-lifted transition-colors duration-400 ease-premium hover:border-gold hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:flex"
    >
      <FaWhatsapp size={26} aria-hidden="true" />
    </a>
  )
}

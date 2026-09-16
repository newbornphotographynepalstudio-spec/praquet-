import { HiOutlinePhone, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { contact } from '../../data/contact'

// Mobile-only sticky contact bar (hidden at xl, where the header's own
// "Get a Free Consultation" CTA is already visible). Fixed to the bottom
// of the viewport — pages must keep enough bottom padding/margin above
// their own footer content so this never overlaps anything important.
export default function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy/10 bg-ivory-light/95 backdrop-blur-sm xl:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={contact.phoneHref}
        className="flex min-h-[52px] items-center justify-center gap-1.5 border-r border-navy/10 font-body text-xs font-semibold uppercase tracking-wide text-navy"
      >
        <HiOutlinePhone size={16} aria-hidden="true" />
        Call
      </a>
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[52px] items-center justify-center gap-1.5 border-r border-navy/10 font-body text-xs font-semibold uppercase tracking-wide text-navy"
      >
        <HiOutlineChatBubbleLeftRight size={16} aria-hidden="true" />
        WhatsApp
      </a>
      <Link
        to="/contact"
        className="flex min-h-[52px] items-center justify-center bg-navy font-body text-xs font-semibold uppercase tracking-wide text-ivory"
      >
        Get Quote
      </Link>
    </div>
  )
}

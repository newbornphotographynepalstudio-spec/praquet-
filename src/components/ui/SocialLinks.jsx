import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { socialLinks } from '../../data/social'
import { cn } from '../../utils/cn'

const icons = { instagram: FaInstagram, facebook: FaFacebookF }

export default function SocialLinks({ tone = 'light', className = '' }) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {socialLinks.map((social) => {
        const Icon = icons[social.icon]
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-400 ease-premium',
                tone === 'light'
                  ? 'border-ivory/25 text-ivory/80 hover:border-ivory hover:text-ivory'
                  : 'border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
              )}
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

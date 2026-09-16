// Official contact channels, as supplied by the owner. Do not invent or
// alter any of these — see the "brand content rule" in README.md.
export const contact = {
  phoneDisplay: '9851278641',
  phoneHref: 'tel:+9779851278641',
  whatsappDisplay: '+977 9851278641',
  whatsappHref: 'https://wa.me/9779851278641',
  emailDisplay: 'parquetdecornepal@gmail.com',
  emailHref: 'mailto:parquetdecornepal@gmail.com',
}

export const developer = {
  name: 'Aayush Mainali',
  url: 'https://www.aayushmainali.me/',
}

// Builds a WhatsApp link pre-filled with a contextual enquiry message
// rather than opening to a blank chat. Falls back to a generic greeting
// when no message is given. Used by FloatingWhatsApp; available for any
// future CTA that wants a message pre-filled for the visitor.
export function getWhatsappEnquiryUrl(message) {
  const text = message || 'Hello Parquet & Decor Nepal, I would like to know more about your products.'
  return `${contact.whatsappHref}?text=${encodeURIComponent(text)}`
}

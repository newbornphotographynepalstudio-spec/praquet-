// Tagged FAQ bank. The /faq page shows everything, grouped; material and
// service pages show a filtered subset via `tags`. Every answer is a
// general, honest statement — no invented warranties, certifications,
// pricing, or turnaround promises. See "brand content rule" in README.md.
export const faqs = [
  {
    question: 'What’s the difference between flooring and wall panel materials?',
    answer:
      'Flooring materials (parquet, SPC, laminate, wooden flooring) are built to handle foot traffic and are laid across the floor. Wall panel materials (WPC, PVC, fluted, acoustic) are designed for vertical surfaces and focus on texture, architecture and, in some cases, sound.',
    tags: ['general', 'flooring', 'wall-panels'],
  },
  {
    question: 'How do I choose between parquet, SPC, laminate and wooden flooring?',
    answer:
      'It comes down to the room, the traffic level, and how much of the look and feel of genuine timber matters to you. Parquet and wooden flooring bring real wood character; SPC suits moisture-prone or high-traffic areas; laminate offers a practical, design-forward option across larger areas. A consultation is the fastest way to narrow this down for your specific space.',
    tags: ['general', 'flooring', 'consultation'],
  },
  {
    question: 'Is parquet flooring real wood?',
    answer:
      'Yes — parquet is a technique for laying wood into geometric patterns like herringbone or chevron, using genuine wood pieces rather than a printed surface.',
    tags: ['parquet'],
  },
  {
    question: 'Where does parquet work best?',
    answer:
      'Parquet suits spaces where the floor itself can be a design feature — living rooms, bedrooms and hospitality interiors — since the laying pattern is part of the visual result.',
    tags: ['parquet'],
  },
  {
    question: 'What does SPC stand for and how is it different from laminate?',
    answer:
      'SPC stands for Stone Plastic Composite. Unlike laminate, which has a fibreboard core, SPC has a rigid stone-plastic composite core, which generally makes it more dimensionally stable in areas with more moisture or temperature change.',
    tags: ['spc', 'laminate'],
  },
  {
    question: 'Is SPC flooring suitable for kitchens and bathrooms?',
    answer:
      'SPC’s rigid core and moisture resistance generally make it a practical choice for kitchens, bathrooms and other higher-moisture areas compared with solid wood or laminate.',
    tags: ['spc'],
  },
  {
    question: 'How does laminate flooring compare to real wood?',
    answer:
      'Laminate uses a high-resolution printed layer to replicate a wood (or stone) look, rather than a genuine timber surface. It’s a practical way to get a wood-look floor across a larger area at a more accessible price point than solid wood.',
    tags: ['laminate'],
  },
  {
    question: 'Can wooden flooring be refinished later?',
    answer:
      'Solid and engineered wooden flooring can generally be sanded and refinished over their lifetime, which is one reason many people choose genuine timber over printed alternatives.',
    tags: ['wooden-flooring'],
  },
  {
    question: 'What is WPC and why choose it for a wall?',
    answer:
      'WPC (Wood Plastic Composite) wall panels combine wood fibre with a polymer binder, giving the visual warmth of timber with more stability in humid conditions than solid wood panelling.',
    tags: ['wpc'],
  },
  {
    question: 'Are PVC wall panels easy to maintain?',
    answer:
      'PVC panels are generally lightweight, moisture-resistant and easy to wipe clean, which is why they’re a common choice for bathrooms, kitchens and commercial interiors.',
    tags: ['pvc'],
  },
  {
    question: 'Do fluted panels add acoustic benefit?',
    answer:
      'Fluted panels are primarily a visual and textural detail — the vertical ribbed profile adds depth and shadow to a wall. If sound absorption is a priority, our acoustic panel range is built specifically for that.',
    tags: ['fluted', 'acoustic'],
  },
  {
    question: 'How much do acoustic panels actually help with sound?',
    answer:
      'Acoustic panels are designed with a sound-absorbing backing intended to help soften hard-surface echo in a room. We’ll publish specific performance figures for our supplied panels once that data is documented — for now, treat them as a texture-plus-sound-conscious choice rather than a quantified acoustic solution.',
    tags: ['acoustic'],
  },
  {
    question: 'Do you handle both material supply and installation?',
    answer:
      'Yes — our installation service covers preparation, laying and finishing for both flooring and wall panel systems.',
    tags: ['installation'],
  },
  {
    question: 'What happens during an interior surface consultation?',
    answer:
      'We look at the space, how it’s used, and talk through flooring and wall-panel options that work together as one considered interior, rather than choosing each separately.',
    tags: ['consultation'],
  },
  {
    question: 'Do you work on both residential and commercial projects?',
    answer:
      'Yes — the flooring and wall panel systems we work with, and the installation and consultation services around them, apply to both residential and commercial interiors.',
    tags: ['general', 'consultation', 'installation'],
  },
  {
    question: 'Do you serve areas outside Kathmandu Valley?',
    answer:
      'We’re based in the Kathmandu Valley, covering Kathmandu, Lalitpur and Bhaktapur. Get in touch with your location and we can confirm feasibility for your project.',
    tags: ['general', 'kathmandu', 'lalitpur', 'bhaktapur'],
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Start with a free consultation — we’ll discuss your space and material preferences, and follow up with next steps and a quote based on your specific project.',
    tags: ['general', 'consultation'],
  },
]

export function getFaqsByTags(tags = []) {
  if (!tags.length) return faqs
  return faqs.filter((f) => f.tags.some((t) => tags.includes(t)))
}

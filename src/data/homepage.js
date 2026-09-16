import { HiOutlineSparkles, HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi'

export const heroContent = {
  eyebrow: 'Parquet & Decor Nepal',
  title: 'Premium Flooring & Wall Solutions',
  description:
    'Transform your space with premium flooring, architectural wall panels and professional installation — designed to bring warmth, character and lasting quality to residential and commercial interiors.',
  primaryCta: { label: 'Explore Products', to: '/products' },
  secondaryCta: { label: 'Get a Free Consultation', to: '/contact' },
}

// Deliberately free of invented statistics, years-of-experience claims, or
// certifications — see the "brand content rule" in README.md.
export const trustPoints = [
  {
    icon: HiOutlineSparkles,
    title: 'Premium Materials',
    description: 'Carefully selected flooring and wall panel systems built for lasting quality and finish.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Professional Installation',
    description: 'Precise, tidy installation handled by a dedicated team from consultation through completion.',
  },
  {
    icon: HiOutlineHome,
    title: 'Residential & Commercial',
    description: 'Solutions tailored to homes, offices and hospitality spaces across the Kathmandu Valley.',
  },
]

export const craftsmanshipContent = {
  eyebrow: 'Material & Craft',
  title: 'Every Detail Chosen With Intent',
  description:
    'From the grain of a single plank to the finish on a panel edge, material selection is where a premium interior actually begins — long before installation day.',
  cta: { label: 'Explore Products', to: '/products' },
}

export const videoMomentContent = {
  eyebrow: 'See The Material',
  title: 'See how the right materials transform a space.',
  cta: { label: 'Get a Free Consultation', to: '/contact' },
}

export const collectionPreview = [
  {
    key: 'flooring',
    title: 'Flooring Collection',
    description: 'Parquet, SPC, laminate and natural wooden flooring for every space.',
    to: '/flooring',
  },
  {
    key: 'wall-panels',
    title: 'Wall Panel Collection',
    description: 'WPC, PVC, fluted and acoustic wall panels for architectural walls.',
    to: '/wall-panels',
  },
]

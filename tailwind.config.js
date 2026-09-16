/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#081F32',
          light: '#12314C',
        },
        wood: {
          warm: '#916C50',
          deep: '#6B422D',
        },
        gold: {
          DEFAULT: '#B08A5A',
          soft: '#C7A87A',
        },
        ivory: {
          DEFAULT: '#F4F0E8',
          light: '#FAF8F3',
        },
        charcoal: '#605D57',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial display scale (Cormorant Garamond)
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.25rem, 3.5vw + 1rem, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 2vw + 1rem, 2.75rem)', { lineHeight: '1.12' }],
        'display-sm': ['clamp(1.5rem, 1.2vw + 1rem, 2rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        container: '1440px',
        'container-narrow': '1120px',
      },
      spacing: {
        gutter: '20px',
        'gutter-md': '40px',
        'gutter-lg': '64px',
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(8, 31, 50, 0.06), 0 2px 8px rgba(8, 31, 50, 0.05)',
        card: '0 2px 6px rgba(8, 31, 50, 0.07)',
        lifted: '0 8px 24px rgba(8, 31, 50, 0.10)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
    },
  },
  plugins: [],
}

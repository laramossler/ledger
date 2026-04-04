import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0908',
        bgSoft: '#111010',
        card: '#151413',
        cardHover: '#1C1B19',
        cream: '#EDE8DF',
        creamSoft: '#B8B0A2',
        gold: '#B8A07A',
        goldMuted: '#7A6D54',
        stone: '#928679',
        blush: '#C4A89A',
        sage: '#8E9E82',
        dusk: '#9890AE',
        sea: '#7A9BA0',
        border: '#252320',
        borderLight: '#322F2B',
        red: '#B07070',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Garamond', 'serif'],
        sans: ['DM Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xxs': '9px',
        'xs-label': '9.5px',
      },
      letterSpacing: {
        'label': '3.5px',
        'nav': '2px',
        'tag': '1.5px',
      },
      lineHeight: {
        'editorial': '1.85',
      },
      borderWidth: {
        'hair': '0.5px',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-delay-1': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
        'fade-in-delay-2': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards',
        'fade-in-delay-3': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards',
        'fade-in-delay-4': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 2.5s forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

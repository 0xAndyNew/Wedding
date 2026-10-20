/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Champagne & Vietnamese Heritage Wedding Palette
        cream: '#F7F1E8',
        ivory: '#FFFDF8',
        champagne: {
          light: '#F5ECDC',
          DEFAULT: '#D5B77A',
          dark: '#B8954E',
        },
        gold: {
          light: '#CCA968',
          DEFAULT: '#B58A45',
          dark: '#936C2C',
        },
        beige: '#E8DDD0',
        ink: {
          DEFAULT: '#29251F',
          light: '#3D362D',
          dark: '#1C1915',
        },
        muted: '#71685D',
        line: '#E3D8C8',
        moss: {
          light: '#86967E',
          DEFAULT: '#6B7964',
          dark: '#525F4C',
        },
        // Compatibility with existing invitation & 3D components
        paper: {
          light: '#FFFDF8',
          DEFAULT: '#F7F1E8',
          dark: '#E8DDD0',
        },
        charcoal: {
          DEFAULT: '#29251F',
          muted: '#71685D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
      boxShadow: {
        'luxury': '0 16px 45px rgba(61, 45, 25, 0.08)',
        'luxury-sm': '0 8px 24px rgba(61, 45, 25, 0.05)',
        'luxury-lg': '0 24px 60px rgba(61, 45, 25, 0.12)',
        'gold-glow': '0 0 25px rgba(213, 183, 122, 0.35)',
      }
    },
  },
  plugins: [],
}

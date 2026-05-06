import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f2f8',
          100: '#cbe3f5',
          200: '#a8d4f0',
          300: '#7fc0e9',
          400: '#5baee3',
          500: '#3a9cdc',
          600: '#2b7fb8',
          700: '#1f5f8a',
          800: '#184f79',
          900: '#123d5e'
        },
        terra: {
          50: '#FCF1EB',
          100: '#F5D9C6',
          200: '#EBB89D',
          300: '#DE9573',
          400: '#CF7349',
          500: '#BE5C30',
          600: '#994928',
          700: '#75381E',
          800: '#512615',
          900: '#31160C'
        },
        warm: {
          50: '#f8fbfd',
          100: '#e8f2f8',
          200: '#cbe3f5',
          300: '#a8d4f0',
          400: '#7fc0e9',
          500: '#5baee3',
          600: '#3a9cdc',
          700: '#2b7fb8',
          800: '#184f79',
          900: '#123d5e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        hobo: ['HoboBT', 'Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.65s ease-out forwards',
        'fade-in': 'fadeIn 0.45s ease-out forwards',
        shimmer: 'shimmer 2s infinite linear'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' }
        }
      }
    }
  },
  plugins: []
} satisfies Config

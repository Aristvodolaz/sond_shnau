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
          50:  '#e8f4fb',
          100: '#cde6f5',
          200: '#a8d4ee',
          300: '#7abde5',
          400: '#52a8db',
          500: '#3a9cdc',
          600: '#2b7fb8',
          700: '#1f5f8a',
          800: '#184f79',
          900: '#123d5e'
        },
        // Warm neutrals — cream/sand tones for backgrounds and text
        warm: {
          50:  '#fafaf9',
          100: '#f4f4f2',
          200: '#e8e8e4',
          300: '#d4d4ce',
          400: '#a8a8a0',
          500: '#78786e',
          600: '#5a5a52',
          700: '#3d3d38',
          800: '#28281f',
          900: '#18180d'
        },
        // Terracotta accent — emotional warmth, CTAs, highlights
        terra: {
          50:  '#fdf3ee',
          100: '#fae1d2',
          200: '#f4bfa3',
          300: '#ec9870',
          400: '#e07548',
          500: '#c85e30',
          600: '#a34a24',
          700: '#7f381a',
          800: '#5a2711',
          900: '#38170a'
        },
        // Semantic surface colors
        surface: {
          base:     '#fafaf9',
          elevated: '#ffffff',
          sunken:   '#f4f4f2'
        }
      },
      fontFamily: {
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        hobo:    ['HoboBT', 'Manrope', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs:    ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:    ['0.875rem', { lineHeight: '1.375rem' }],
        base:  ['1rem',     { lineHeight: '1.625rem' }],
        lg:    ['1.125rem', { lineHeight: '1.75rem'  }],
        xl:    ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem'     }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.75rem'  }],
        '5xl': ['3rem',     { lineHeight: '3.5rem'   }]
      },
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '18':  '4.5rem',
        '22':  '5.5rem'
      },
      borderRadius: {
        'sm':   '0.375rem',
        DEFAULT:'0.5rem',
        'md':   '0.625rem',
        'lg':   '0.75rem',
        'xl':   '1rem',
        '2xl':  '1.25rem',
        '3xl':  '1.5rem',
        '4xl':  '2rem',
        'full': '9999px'
      },
      boxShadow: {
        'xs':    '0 1px 2px rgba(0,0,0,.06)',
        'sm':    '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)',
        DEFAULT: '0 2px 8px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)',
        'md':    '0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.05)',
        'lg':    '0 8px 24px rgba(0,0,0,.1),  0 2px 6px rgba(0,0,0,.06)',
        'xl':    '0 16px 40px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.06)',
        '2xl':   '0 24px 60px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.08)',
        'card':  '0 1px 3px rgba(0,0,0,.07), 0 4px 16px rgba(0,0,0,.05)',
        'card-hover': '0 4px 16px rgba(0,0,0,.1), 0 12px 32px rgba(0,0,0,.07)',
        'inner': 'inset 0 2px 4px rgba(0,0,0,.06)',
        'none':  'none'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem'
        }
      },
      animation: {
        'fade-up':   'fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'fade-down': 'fadeDown 0.3s ease-out forwards',
        'scale-in':  'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shimmer':   'shimmer 1.8s infinite linear',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite'
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' }
        },
        pulseDot: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(0.85)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config

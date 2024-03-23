/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        'roboto-black': '"Roboto Black", sans-serif',
        'roboto-black-italic': '"Roboto BlackItalic", sans-serif',
        'roboto-bold': '"Roboto Bold", sans-serif',
        'roboto-bold-italic': '"Roboto BoldItalic", sans-serif',
        'roboto-italic': '"Roboto Italic", sans-serif',
        'roboto-light': '"Roboto Light", sans-serif',
        'roboto-light-italic': '"Roboto LightItalic", sans-serif',
        'roboto-medium': '"Roboto Medium", sans-serif',
        'roboto-medium-italic': '"Roboto MediumItalic", sans-serif',
        'roboto-regular': '"Roboto Regular", sans-serif',
        'roboto-thin': '"Roboto Thin", sans-serif',
        'roboto-thin-italic': '"Roboto ThinItalic", sans-serif',
      },
      colors: {
        base: {
          900: '#121214',
          800: '#202024',
          700: '#29292E',
          600: '#323238',
          500: '#7C7C8A',
          400: '#C4C4CC',
          300: '#E1E1E6',
        },
        product: {
          red: {
            DEFAULT: '#F75A68',
            dark: '#AA2834',
          },
          green: {
            DEFAULT: '#00875F',
            light: '#00B37E',
            dark: '#015F43',
          },
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

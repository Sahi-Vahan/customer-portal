/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        donezo: {
          green: '#154D3F',
          greenHover: '#0F382E',
          greenLight: '#E8F5EE',
          greenText: '#154D3F',
          emerald: '#10B981',
          dark: '#0A0E12',
          darkCard: '#12181E',
          darkBorder: '#1E262E',
          lightBg: '#F4F6F8',
          lightCard: '#FFFFFF',
          lightBorder: '#E5E9EB',
          mutedText: '#64748B',
        },
        navy: {
          50: '#F4F6F8',
          100: '#E5E9EB',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#154D3F',
          900: '#0F382E',
          950: '#0A0E12',
        },
        teal: {
          50: '#E8F5EE',
          100: '#CBEAD8',
          200: '#A3D9BD',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#154D3F', // Primary Forest Green
          700: '#0F382E',
          800: '#0A261F',
          900: '#051813',
        },
        status: {
          success: '#15803D',
          warning: '#B45309',
          error: '#B91C1C',
          info: '#0284C7',
        },
        surface: '#FFFFFF',
        slatebg: '#F4F6F8',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'donezo': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'donezo-hover': '0 10px 25px -4px rgba(21, 77, 63, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'card': '0 4px 14px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'hover': '0 12px 24px -3px rgba(21, 77, 63, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

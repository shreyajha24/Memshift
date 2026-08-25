/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        memshift: {
          bg: {
            dark: '#08090d',
            'dark-subtle': '#0d0f17',
            'dark-elevated': '#131624',
            light: '#f8fafc',
            'light-subtle': '#f1f5f9',
            'light-elevated': '#ffffff',
          },
          border: {
            dark: 'rgba(255, 255, 255, 0.08)',
            'dark-bright': 'rgba(255, 255, 255, 0.16)',
            light: 'rgba(0, 0, 0, 0.08)',
            'light-bright': 'rgba(0, 0, 0, 0.16)',
          },
          accent: {
            cyan: '#06b6d4',
            teal: '#14b8a6',
            emerald: '#10b981',
            indigo: '#6366f1',
            purple: '#8b5cf6',
            amber: '#f59e0b',
          }
        }
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 9s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
      }
    },
  },
  plugins: [],
}

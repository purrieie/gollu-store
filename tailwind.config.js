/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: '#FF3D8B', soft: '#FFD3E5' },
        mango: { DEFAULT: '#FFC928', soft: '#FFEFB8' },
        cobalt: { DEFAULT: '#2F4BFF', soft: '#D6DCFF' },
        ink: '#2B0F3D',
        cream: { DEFAULT: '#FFF3DA', deep: '#F9E5BD' },
        jamun: '#5B2A86',
      },
      fontFamily: {
        display: ['"Bagel Fat One"', '"Arial Rounded MT Bold"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        hand: ['"Gochi Hand"', '"Comic Sans MS"', 'cursive'],
        deva: ['"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sticker: '4px 4px 0 0 #2B0F3D',
        'sticker-sm': '2px 2px 0 0 #2B0F3D',
        'sticker-lg': '7px 7px 0 0 #2B0F3D',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        wiggle: { '0%,100%': { transform: 'rotate(0)' }, '25%': { transform: 'rotate(-12deg) scale(1.15)' }, '75%': { transform: 'rotate(10deg) scale(1.1)' } },
        pop: { '0%': { transform: 'scale(.6) rotate(-8deg)', opacity: 0 }, '70%': { transform: 'scale(1.06) rotate(2deg)', opacity: 1 }, '100%': { transform: 'scale(1) rotate(0)' } },
        slideup: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        wiggle: 'wiggle .5s ease-in-out',
        pop: 'pop .35s cubic-bezier(.2,.9,.3,1.3) both',
        slideup: 'slideup .25s ease-out both',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1b1f30',
          light: '#2d3142',
          accent: '#7f5af0',
          highlight: '#00f5d4',
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 30% 20%, #7f5af0 0%, #1b1f30 80%)',
        'animated-gradient': 'linear-gradient(270deg, #7f5af0, #00f5d4, #2d3142, #7f5af0)',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #7f5af0' },
          '50%': { boxShadow: '0 0 20px #00f5d4' },
        },
      },
      animation: {
        gradient: 'gradient-move 10s ease-in-out infinite',
        glow: 'glow 1.5s infinite',
        pulseSlow: 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};

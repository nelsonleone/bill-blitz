/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        base: {
          color1: "white",
          color2: "black"
        },
        primary: {
          "accent-color1": "#00BF63",
          "accent-color2": "#0b854a",
          "dark-blue": "#374151",
          "very-dark-blue": "hsl(208, 55%, 15%)",
          "accent-color3": "#d40f0f"
        },
        custom: {
          "dark-green": "#1A4942"
        }
      },
      fontFamily: {
        'overpass': ['Overpass', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif']
      },
    },

    backgroundImage: {
    "intro-secton": "linear-gradient(to right bottom, #059669, #064e3b), url('/images/bg-pattern-intro-mobile.svg')",
    "callout": "linear-gradient(225deg, #1a8253 27.55%, #1d935e 100%)",
    "callout-circle-before": "linear-gradient(to bottom, #68e1be 0%, rgba(104, 225, 190, 0.1) 50%, rgba(104, 225, 190, 0) 100%)",
    "callout-circle-after": "linear-gradient(to bottom, #68e1be 0%, rgba(104, 225, 190, 0.2) 100%)"
    }
  },
  plugins: [],
}
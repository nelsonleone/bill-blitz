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
          "accent-color3": "#d40f0f"
        },
        custom: {
          "dark-green": "hsl(156, 86%, 17%)"
        }
      },
      fontFamily: {
        'reddit-sans': ['Reddit Sans', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif']
      },
    },
  },
  plugins: [],
}


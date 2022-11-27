/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Fraunces': 'Fraunces, serif',
        'Inter': 'Inter, sans-serif',
      },
      fontSize: {
        'title': '2rem', //32px
        'subtitle': '1.2rem', //20px
        'button': '1rem', //16px

        'description': '1rem', //16px
        'nav-size': '1.285rem', //14px
        'input': '1.285rem', //14px

      },
      textColor: {
        'nav': '#00000080', // 50%
        'nav-active': '#8E3200',
        'subtitle': '#8E3200',
        'total': '#8E3200',
        'title-color': '#000000cc', // 80%
        'item-description': '#000000cc', // 80%
        'item-price': '#A64B2A',
        'button-primary': '#fff',
        'icon': '#8E3200'
      },

      backgroundColor: {
        'primary': '#FFF0CF',
        'disable': '#8e32002d',
        'button-primary': '#8E3200',
        'button-primary-disable': '#8e32008f',
        'date': '#8e32008f',
        'button-primary-onclick': '#81350b',
        'item-card': '#ffffff4d' // 30%
      },

      borderColor: {
        'request-list': '#D7A86E',
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

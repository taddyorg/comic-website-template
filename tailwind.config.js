const config = require('./data.js');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '1': '1 / 1',
        '4/6': '4 / 6',
        '16/9': '16 / 9',
      },
      fontFamily: {
        'sans': [`"${config.font}"`, 'sans-serif'],
      },
      colors: {
        "background": config.colors.backgroundColor,
        "header-background": config.colors.headerBackgroundColour,
        "primary": config.colors.textColor,
        "secondary": config.colors.secondaryTextColor,
        "button": config.colors.buttonTextColor,
        "button-background": config.colors.buttonBackgroundColor,
      },
    },
  },
  plugins: [],
}


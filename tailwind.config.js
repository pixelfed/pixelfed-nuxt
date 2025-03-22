module.exports = {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3C82F6',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#e2e2e2',
            foreground: '#111111',
          },
          accent: {
            DEFAULT: '#f4f4f4',
            foreground: '#111111',
          },
          background: '#ffffff',
          foreground: '#111111',
          input: '#d1d5db',
      },
    }
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ],
  }
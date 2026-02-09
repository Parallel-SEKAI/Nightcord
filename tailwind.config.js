/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nc-bg-sidebar': '#362f4b', // Sidebar
        'nc-bg-main': '#453d5a', // Main chat area
        'nc-bg-header': '#453d5a', // Header (matches main)
        'nc-bg-hover': '#4d4665', // Hover/Active item
        'nc-bg-input': '#3b3550', // Input bar
        'nc-bg-card': '#58506d', // Attachment card
        'nc-text-primary': '#ffffff', // Primary text
        'nc-text-secondary': '#b9bbbe', // Secondary text
        'nc-text-muted': '#6b7280', // Muted text
        'nc-green': '#3ba55c', // Online status
        'nc-separator': '#1c1c24', // Separators
      },
    },
  },
  plugins: [],
};

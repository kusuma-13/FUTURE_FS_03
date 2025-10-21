/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this covers your source directory
  ],
  theme: {
    extend: {
      colors: {
        // 💡 AI-GENERATED BRAND COLORS
        'nokia-primary': '#121212',  // Dark, modern base color (e.g., Deep Charcoal)
        'nokia-secondary': '#4A4A4A', // Lighter shade for secondary elements
        'nokia-accent': '#32CD32',   // Bright accent color (e.g., Modern Lime Green)
        'nokia-light': '#F5F5F5',    // Clean, off-white background color
      },
      backgroundImage: {
        // Placeholder for your AI-generated Hero Image
        'hero-pattern': "url('/images/ai-hero-background.jpg')",
      },
    },
  },
  plugins: [],
}
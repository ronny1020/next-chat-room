import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  // important: '#__next',
}
export default config

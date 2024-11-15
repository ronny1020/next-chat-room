import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
}
export default config

import flowbite from 'flowbite/plugin'
import plugin from 'tailwindcss/plugin'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
]
export const corePlugins = {
  container: false
}
export const theme = {
  extend: {
    colors: {
      primaryColor: '#ee4d2d'
    }
  }
}
export const plugins = [
  forms(),
  plugin(function ({ addComponents, theme }) {
    addComponents({
      '.container': {
        maxWidth: theme('columns.7xl'),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: theme('spacing.4'),
        paddingRight: theme('spacing.4')
      }
    })
  }),
  flowbite()
]

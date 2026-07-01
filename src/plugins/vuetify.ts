import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'uninoxus',
    themes: {
      uninoxus: {
        dark: false,
        colors: {
          // cores principais
          primary:    '#1e4db7',   // --blue
          secondary:  '#e8a020',   // --gold
          surface:    '#ffffff',
          background: '#e8eef8',

          // cores customizadas (acessíveis via theme.current.colors)
          navy:       '#0d1b3e',
          'navy-mid': '#1a2f5e',
          'blue-light':'#2d6ae0',
          'gold-light':'#f5b942',
          'table-header': '#3a6bc4',
          'red-button':'#c0392b',
        },
      },
    },
  },
})
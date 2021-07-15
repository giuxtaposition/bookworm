import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export const globalTheme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.100', 'black')(props),
      },
    }),
  },
})

export default theme

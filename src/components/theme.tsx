import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const theme = extendTheme({ config })

export const globalTheme = extendTheme({
    styles: {
        global: (props: { colorMode: 'dark' | 'light' }) => ({
            body: {
                bg: mode('white', '#1d202b')(props),
            },
        }),
    },
    components: {
        Divider: {
            baseStyle: (props: { colorMode: 'dark' | 'light' }) => ({
                borderColor: mode('gray.300', 'gray.700')(props),
            }),
        },
    },
})

export default theme

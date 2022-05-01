import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react'

interface Props {
    showText?: boolean
}

const ToggleColorModeSwitch: React.FC<Props> = ({ showText = false }) => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex
            onClick={toggleColorMode}
            role='button'
            aria-label={'Toggle Light/Dark Theme'}
            fontWeight='semibold'
            align='center'
            px='4'
            pl='4'
            py='3'
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.900'),
                color: useColorModeValue('gray.900', 'gray.200'),
            }}
            cursor='pointer'
        >
            <Icon mr={2}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Icon>
            {showText &&
                (colorMode === 'light'
                    ? 'Toggle Dark Mode'
                    : 'Toggle Light Mode')}
        </Flex>
    )
}

export default ToggleColorModeSwitch

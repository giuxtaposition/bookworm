import { Flex, FlexProps, Icon, useColorModeValue } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface Props extends FlexProps {
    icon?: IconType
    children: React.ReactNode
}

const NavItem: React.FC<Props> = ({ icon, children, ...rest }) => {
    const iconColor = useColorModeValue('gray.600', 'gray.300')
    return (
        <Flex
            align='center'
            px='4'
            pl='4'
            py='3'
            cursor='pointer'
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.900'),
                color: useColorModeValue('gray.900', 'gray.200'),
            }}
            role='group'
            fontWeight='semibold'
            transition='.15s ease'
            {...rest}
        >
            {icon && (
                <Icon
                    mr='2'
                    boxSize='4'
                    _groupHover={{
                        color: iconColor,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    )
}

export default NavItem

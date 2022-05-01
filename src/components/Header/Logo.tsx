import {
    Heading,
    HeadingProps,
    Icon,
    Link,
    useColorMode,
} from '@chakra-ui/react'
import React from 'react'
import { FaBookReader } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

interface Props extends HeadingProps {
    type?: 'full' | 'icon'
}

const Logo: React.FC<Props> = ({ type = 'full', ...rest }) => {
    const { colorMode } = useColorMode()

    return (
        <Heading
            fontSize='x-large'
            fontWeight='bold'
            bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
            bgClip='text'
            {...rest}
        >
            <Link
                as={ReactRouterLink}
                to='/'
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                }}
                href={'#'}
            >
                {type === 'full' && (
                    <>
                        Bookworm{' '}
                        <Icon
                            as={FaBookReader}
                            color={`${
                                colorMode === 'light' ? 'teal.500' : 'teal.300'
                            }`}
                        />
                    </>
                )}
                {type === 'icon' && (
                    <Icon
                        as={FaBookReader}
                        color={`${
                            colorMode === 'light' ? 'teal.500' : 'teal.300'
                        }`}
                    />
                )}
            </Link>
        </Heading>
    )
}
export default Logo

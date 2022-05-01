import { CloseIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import {
    Button,
    chakra,
    Flex,
    HStack,
    IconButton,
    Link,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import SearchBar from '../Search/SearchBar'
import Logo from './Logo'
import Sidebar from './Sidebar'
import ToggleColorModeSwitch from './ToggleColorModeSwitch'
import UserDropdown from './UserDropdown'

interface Props {
    logout: () => void
    user: any
}

const Header: React.FC<Props> = ({ logout, user }) => {
    const displaySearchBar = useBreakpointValue({ base: 'none', md: 'flex' })
    const {
        isOpen: isMenuOpen,
        onOpen: onMenuOpen,
        onClose: onMenuClose,
    } = useDisclosure()

    const {
        isOpen: isSearchOpen,
        onOpen: onSearchOpen,
        onClose: onSearchClose,
    } = useDisclosure()
    return (
        <chakra.header w='100vw'>
            <Flex
                bg={useColorModeValue('white', 'gray.900')}
                color={useColorModeValue('gray.900', 'gray.100')}
                boxShadow='lg'
                px={2}
                borderTop='3px solid'
                borderTopColor={useColorModeValue('teal.500', 'teal.300')}
                justifyContent='flex-start'
                flexDir='column'
                position='relative'
                zIndex='dropdown'
            >
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent='space-between'
                    w='100%'
                >
                    <HStack>
                        <IconButton
                            size={'md'}
                            icon={
                                isMenuOpen ? <CloseIcon /> : <HamburgerIcon />
                            }
                            aria-label={'Open Menu'}
                            variant='ghost'
                            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                        />
                        <Logo
                            type='full'
                            display={{ base: 'none', md: 'flex' }}
                        />
                    </HStack>

                    {isSearchOpen || displaySearchBar === 'flex' ? (
                        <SearchBar showRadioButtons={false} shadow={false} />
                    ) : (
                        <Logo type='icon' />
                    )}

                    <HStack display={{ base: 'none', md: 'flex' }} spacing={5}>
                        {user ? (
                            <UserDropdown user={user.me} logout={logout} />
                        ) : (
                            <>
                                <Link
                                    as={ReactRouterLink}
                                    to='/signin'
                                    _hover={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Button
                                        colorScheme='teal'
                                        variant='ghost'
                                        size='sm'
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                                <Link
                                    as={ReactRouterLink}
                                    to='/signup'
                                    _hover={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Button
                                        colorScheme='teal'
                                        variant='solid'
                                        size='sm'
                                        onClick={logout}
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </>
                        )}
                        <ToggleColorModeSwitch />
                    </HStack>
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        variant='ghost'
                        icon={isSearchOpen ? <CloseIcon /> : <Search2Icon />}
                        onClick={isSearchOpen ? onSearchClose : onSearchOpen}
                        aria-label='Open Search'
                    />
                </Flex>
                <Sidebar
                    isMenuOpen={isMenuOpen}
                    onMenuClose={onMenuClose}
                    user={user}
                    logout={logout}
                />
            </Flex>
        </chakra.header>
    )
}

export default Header

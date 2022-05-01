import {
    Avatar,
    Divider,
    Flex,
    HStack,
    Link,
    Slide,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { ImBooks } from 'react-icons/im'
import { IoMdStats } from 'react-icons/io'
import { MdHome } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import { User } from '../../types/User'
import Logo from './Logo'
import NavItem from './NavItem'
import NavLink from './NavLink'
import ToggleColorModeSwitch from './ToggleColorModeSwitch'

interface Props {
    isMenuOpen: boolean
    onMenuClose: () => void
    user?: User
    logout: () => void
}

const Sidebar: React.FC<Props> = ({
    isMenuOpen,
    onMenuClose,
    user,
    logout,
}) => {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const { colorMode } = useColorMode()

    useEffect(() => {
        const checkIfClickedOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onMenuClose()
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [isMenuOpen, onMenuClose])

    return (
        <Slide direction='left' in={isMenuOpen} style={{ zIndex: 10 }}>
            <Flex
                direction='column'
                as='nav'
                pos='fixed'
                top='0'
                left='0'
                zIndex='sticky'
                h='full'
                pb='10'
                overflowX='hidden'
                overflowY='auto'
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                borderColor={colorMode === 'light' ? 'inherit' : 'gray.700'}
                borderRightWidth='1px'
                w='60'
                ref={sidebarRef}
            >
                <Flex px='4' py='5' align='center'>
                    <Logo />
                </Flex>
                <Flex
                    direction='column'
                    as='nav'
                    fontSize='sm'
                    color='gray.600'
                    aria-label='Main Navigation'
                >
                    <NavLink
                        icon={MdHome}
                        key='Home'
                        path='/'
                        onClick={onMenuClose}
                    >
                        Home
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink
                                icon={ImBooks}
                                key='Library'
                                path='/library'
                                onClick={onMenuClose}
                            >
                                Library
                            </NavLink>
                            <NavLink
                                icon={IoMdStats}
                                key='Stats'
                                path='/stats'
                                onClick={onMenuClose}
                            >
                                Stats
                            </NavLink>
                            <Divider />
                            <NavLink
                                icon={FaUser}
                                key='Profile'
                                path='/profile'
                                onClick={onMenuClose}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                icon={BsGearFill}
                                key='Settings'
                                path='/settings'
                                onClick={onMenuClose}
                            >
                                Settings
                            </NavLink>
                            <Divider />
                            <NavItem
                                icon={GoSignOut}
                                key='Logout'
                                onClick={() => {
                                    onMenuClose()
                                    logout()
                                }}
                            >
                                Logout
                            </NavItem>
                        </>
                    ) : (
                        <>
                            <Divider />
                            <NavLink
                                icon={GoSignIn}
                                key='Signin'
                                path='/signin'
                                onClick={onMenuClose}
                            >
                                Signin
                            </NavLink>
                            <NavLink
                                icon={FaUserPlus}
                                key='Signup'
                                path='/Signup'
                                onClick={onMenuClose}
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                    <Divider />
                    <ToggleColorModeSwitch showText={true} />
                </Flex>
                {user && (
                    <Flex px={4} marginTop='auto'>
                        <HStack spacing={4}>
                            <Link
                                as={ReactRouterLink}
                                to='/profile'
                                _hover={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Avatar
                                    size='md'
                                    name={user.username}
                                    src={
                                        user.profilePhoto
                                            ? user.profilePhoto.location
                                            : ''
                                    }
                                    _hover={{
                                        filter: 'brightness(80%)',
                                    }}
                                />
                            </Link>

                            <VStack alignItems='flex-start'>
                                <Text fontSize='md'>{user.username}</Text>
                                <Text fontSize='sm'>{user.email}</Text>
                            </VStack>
                        </HStack>
                    </Flex>
                )}
            </Flex>
        </Slide>
    )
}

export default Sidebar

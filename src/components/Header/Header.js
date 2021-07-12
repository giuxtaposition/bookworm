import React from 'react'
import Logo from './Logo'
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  chakra,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { useApolloClient } from '@apollo/client'
import { CURRENT_USER } from '../../graphql/queries'

const NavLink = ({ name, path }) => (
  <Link
    as={ReactRouterLink}
    to={path}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {name}
  </Link>
)

const Header = ({ token, logout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const client = useApolloClient()
  const user = client.readQuery({ query: CURRENT_USER })

  return (
    <chakra.header w='100vw'>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        color={useColorModeValue('gray.900', 'gray.100')}
        boxShadow='lg'
        px={8}
        py={2}
        borderTop='3px solid'
        borderTopColor={useColorModeValue('teal.500', 'teal.300')}
        justifyContent={['flex-start', 'flex-start', 'center']}
        flexDir={['column', 'column', 'row']}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={['space-between', 'space-between', 'space-between']}
          w='100%'
          spacing={8}
        >
          {/* Mobile Hamburger */}
          {token && (
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          )}
          <HStack spacing={8} alignItems={'center'}>
            {/* Logo */}
            <Logo />

            {/* Web Nav Links */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {token && (
                <>
                  <NavLink key='Library' name='Library' path='/library' />
                  <NavLink key='Stats' name='Stats' path='/stats' />
                </>
              )}
            </HStack>
          </HStack>

          <HStack spacing='5'>
            {/*User Account*/}

            {token ? (
              <HStack>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                  >
                    {user && (
                      <Avatar
                        size='md'
                        name={user.me.username}
                        src={user.me.profilePhoto.location}
                      />
                    )}
                  </MenuButton>
                  <MenuList>
                    <Link
                      as={ReactRouterLink}
                      to='/profile'
                      href={'#'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link
                      as={ReactRouterLink}
                      to='/settings'
                      href={'#'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <MenuItem>Settings</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logout()
                      }}
                    >
                      Logout
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={toggleColorMode}
                      display={{ md: 'none' }}
                    >
                      {/*Dark/Light Theme Button*/}
                      <Icon mr={2}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                      </Icon>
                      {colorMode === 'light'
                        ? 'Toggle Dark Mode'
                        : 'Toggle Light Mode'}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <>
                <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
                  {/*Sign In Button*/}
                  <Button colorScheme='teal' variant='ghost' size='sm'>
                    <Link
                      as={ReactRouterLink}
                      to='/signin'
                      href={'#'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      Sign In
                    </Link>
                  </Button>

                  {/*Sign Up Button*/}
                  <Button colorScheme='teal' variant='solid' size='sm'>
                    <Link
                      as={ReactRouterLink}
                      to='/signup'
                      href={'#'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      Sign up
                    </Link>
                  </Button>
                </HStack>

                {/* Mobile Account Button*/}
                <HStack display={{ md: 'none' }}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaUserAlt w='xl' />}
                      aria-label={'Open User Menu'}
                      rounded={'full'}
                      colorScheme='teal'
                      cursor={'pointer'}
                    ></MenuButton>
                    <MenuList>
                      <Link
                        as={ReactRouterLink}
                        to='/signin'
                        href={'#'}
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        <MenuItem>Sign In</MenuItem>
                      </Link>
                      <Link
                        as={ReactRouterLink}
                        to='/signup'
                        href={'#'}
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        <MenuItem>Sign Up</MenuItem>
                      </Link>
                      <MenuDivider />

                      <MenuItem onClick={toggleColorMode}>
                        {/*Dark/Light Theme Button*/}
                        <Icon mr={2}>
                          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Icon>
                        {colorMode === 'light'
                          ? 'Toggle Dark Mode'
                          : 'Toggle Light Mode'}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </>
            )}

            {/*Dark/Light Theme Button*/}
            <IconButton
              onClick={toggleColorMode}
              isRound='true'
              display={{ base: 'none', md: 'flex' }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Nav Links */}
        {isOpen && token ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink key='Library' name='Library' path='/library' />
              <NavLink key='Stats' name='Stats' path='/stats' />
            </Stack>
          </Box>
        ) : null}
      </Flex>
    </chakra.header>
  )
}

export default Header

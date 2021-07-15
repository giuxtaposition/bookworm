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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  Divider,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'

const NavLink = ({ name, path, ...rest }) => (
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
    fontSize='xl'
    {...rest}
  >
    {name}
  </Link>
)

const Header = ({ logout, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

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
        position='relative'
        zIndex='dropdown'
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={['space-between', 'space-between', 'space-between']}
          w='100%'
          spacing={8}
        >
          {/* Mobile Hamburger */}
          {user && (
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
              {user && (
                <>
                  <NavLink key='Library' name='Library' path='/library' />
                  <NavLink key='Stats' name='Stats' path='/stats' />
                </>
              )}
            </HStack>
          </HStack>

          <HStack spacing='5'>
            {/*User Account*/}

            {user ? (
              <Popover placement='bottom-start'>
                <PopoverTrigger>
                  <Avatar
                    cursor='pointer'
                    size='lg'
                    name={user.me.username}
                    src={
                      user.me.profilePhoto ? user.me.profilePhoto.location : ''
                    }
                  />
                </PopoverTrigger>
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  p={4}
                  rounded={'xl'}
                  w={'xs'}
                  bgColor={colorMode === 'light' ? 'white' : 'gray.900'}
                >
                  <NavLink name='Profile' path='/profile' />
                  <NavLink name='Setting' path='/settings' />
                  <Divider />
                  <Text
                    onClick={() => {
                      logout()
                    }}
                    aria-label={'Logout Button'}
                    fontSize='xl'
                    px={2}
                    py={2}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: colorMode === 'light' ? 'gray.200' : 'gray.700',
                    }}
                    cursor='pointer'
                  >
                    Logout
                  </Text>
                  <Divider display={{ md: 'none' }} />
                  <Text
                    onClick={toggleColorMode}
                    display={{ md: 'none' }}
                    aria-label={'Toggle Light/Dark Theme'}
                    fontSize='xl'
                    px={2}
                    py={2}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: colorMode === 'light' ? 'gray.200' : 'gray.700',
                    }}
                    cursor='pointer'
                  >
                    {/*Dark/Light Theme Button*/}
                    <Icon mr={2}>
                      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Icon>
                    {colorMode === 'light'
                      ? 'Toggle Dark Mode'
                      : 'Toggle Light Mode'}
                  </Text>
                </PopoverContent>
              </Popover>
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
        {isOpen && user ? (
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

import React from 'react'
import {
  chakra,
  Flex,
  IconButton,
  useDisclosure,
  useColorModeValue,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Search2Icon } from '@chakra-ui/icons'
import Logo from './Logo'
import SearchBar from '../Search/SearchBar'
import ToggleColorModeSwitch from './ToggleColorModeSwitch'

import Sidebar from './Sidebar'
import UserDropdown from './UserDropdown'

const Header = ({ logout, user }) => {
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
              icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              variant='ghost'
              onClick={isMenuOpen ? onMenuClose : onMenuOpen}
            />
            <Logo type='full' display={{ base: 'none', md: 'flex' }} />
          </HStack>

          {isSearchOpen | (displaySearchBar === 'flex') ? (
            <SearchBar showRadioButtons={false} />
          ) : (
            <Logo type='icon' />
          )}

          <HStack display={{ base: 'none', md: 'flex' }}>
            {user && <UserDropdown user={user.me} logout={logout} />}
            <ToggleColorModeSwitch />
          </HStack>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            variant='ghost'
            icon={isSearchOpen ? <CloseIcon /> : <Search2Icon />}
            onClick={isSearchOpen ? onSearchClose : onSearchOpen}
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

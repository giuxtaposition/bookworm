import React from 'react'
import {
  Icon,
  Heading,
  Link,
  useMediaQuery,
  useColorMode,
} from '@chakra-ui/react'
import { FaBookReader } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

const Logo = () => {
  const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Heading
      fontSize='x-large'
      fontWeight='bold'
      bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
      bgClip='text'
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
        Bookworm{' '}
        {isLargerThan400 && (
          <Icon
            as={FaBookReader}
            color={`${colorMode === 'light' ? 'teal.500' : 'teal.300'}`}
          />
        )}
      </Link>
    </Heading>
  )
}
export default Logo

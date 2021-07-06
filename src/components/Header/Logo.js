import React from 'react'
import { Icon, useColorModeValue, Heading, Link } from '@chakra-ui/react'
import { FaBookReader } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

const Logo = () => {
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
        <Icon
          as={FaBookReader}
          color={useColorModeValue('teal.500', 'teal.300')}
        />
      </Link>
    </Heading>
  )
}
export default Logo

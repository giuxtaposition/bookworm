import React from 'react'
import {
  Box,
  Text,
  Icon,
  useColorModeValue,
  Heading,
  useColorMode,
} from '@chakra-ui/react'
import { FaBookReader } from 'react-icons/fa'

const Logo = () => {
  return (
    <Heading
      fontSize='x-large'
      fontWeight='bold'
      bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
      bgClip='text'
    >
      Bookworm{' '}
      <Icon
        as={FaBookReader}
        color={useColorModeValue('teal.500', 'teal.300')}
      />
    </Heading>
  )
}
export default Logo

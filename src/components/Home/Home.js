import {
  Heading,
  VStack,
  Text,
  useColorModeValue,
  Stack,
  useMediaQuery,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import Features from './Features'
import PopularBooks from './PopularBooks'
import SearchBar from '../Search/SearchBar'

const Home = props => {
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

  return (
    <VStack spacing={4} w='100vw'>
      <VStack
        my={12}
        p={['4', '8', '12']}
        w={['90vw', '80vw', '80vw']}
        boxShadow='xl'
        bgColor={useColorModeValue('white', 'gray.700')}
        spacing={4}
        justifyContent='center'
        textAlign='center'
      >
        <Stack alignItems='center' justifyContent='center'>
          <Heading fontWeight='bold' size={`${isLargerThan600 ? 'xl' : 'md'}`}>
            Welcome to{' '}
            <chakra.span
              bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
              bgClip='text'
            >
              Bookworm
            </chakra.span>
          </Heading>
        </Stack>
        <Text>Search for your favourite book</Text>

        <SearchBar showRadioButtons={false} />
      </VStack>

      <PopularBooks />

      <Features />
    </VStack>
  )
}

export default Home

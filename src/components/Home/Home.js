import { Heading, VStack, Text, Stack, chakra } from '@chakra-ui/react'
import React from 'react'
import Features from './Features'
import PopularBooks from './PopularBooks'
import SearchBar from '../Search/SearchBar'
import DemoUserBanner from './DemoUserBanner'

const Home = props => {
  return (
    <VStack spacing={4} w='100vw'>
      {!props.user && <DemoUserBanner setToken={props.setToken} />}

      <VStack
        w='full'
        spacing={4}
        justifyContent='center'
        textAlign='center'
        alignItems='center'
        my={10}
        p={['4', '8', '12']}
      >
        <Stack alignItems='center' justifyContent='center'>
          <Heading fontWeight='bold'>
            Welcome to{' '}
            <chakra.span
              bgGradient='linear(to-r, teal.500, teal.300, blue.500)'
              bgClip='text'
            >
              Bookworm
            </chakra.span>
          </Heading>
        </Stack>
        <Text>
          Search for your favourite book <br /> and keep track of your reading
          list!
        </Text>

        <SearchBar showRadioButtons={false} />
      </VStack>

      <PopularBooks />

      <Features />
    </VStack>
  )
}

export default Home

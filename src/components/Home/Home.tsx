import { chakra, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SearchBar from '../Search/SearchBar'
import DemoUserBanner from './DemoUserBanner'
import Features from './Features'
import PopularBooks from './PopularBooks'

interface Props {
    user: any
    setToken: any
}

const Home: React.FC<Props> = ({ user, setToken }) => {
    return (
        <VStack spacing={4} w='100vw'>
            {!user && <DemoUserBanner setToken={setToken} />}

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
                    Search for your favourite book <br /> and keep track of your
                    reading list!
                </Text>

                <SearchBar showRadioButtons={false} />
            </VStack>

            <PopularBooks />

            <Features />
        </VStack>
    )
}

export default Home

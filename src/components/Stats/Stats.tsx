import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import useBookCount from '../../hooks/graphql/useBookCount'
import LoadingSpinner from '../LoadingSpinner'
import StatBox from './StatBox'

const Stats: React.FC = () => {
    const { totalBooks, totalRead, totalUnread } = useBookCount()

    return (
        <>
            {totalBooks.loading || totalRead.loading || totalUnread.loading ? (
                <LoadingSpinner />
            ) : (
                <Box pb={20} m={0} h='100%' w='100%'>
                    {/*Heading*/}
                    <Box pt={20} pb={20} bg='blue.600'>
                        <Box
                            maxW='7xl'
                            paddingInlineStart={8}
                            paddingInlineEnd={8}
                        >
                            <Box maxW='xl' mb={16}>
                                <Heading>Because we love statistics!</Heading>
                                <Text>
                                    And it helps us understand ourselves better
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    {/*Stats*/}

                    <Flex
                        mt='calc(var(--chakra-space-20) * -1)'
                        justifyContent='center'
                    >
                        <Box
                            maxW='7xl'
                            paddingInlineStart={8}
                            paddingInlineEnd={8}
                        >
                            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={6}>
                                {/*Total Number of Books*/}
                                <StatBox
                                    label='Total Books'
                                    number={totalBooks.bookCount}
                                    text='Total number of books in the library'
                                />
                                {/*Total Read*/}
                                <StatBox
                                    label='Read'
                                    number={totalRead.bookCount}
                                    text='Total number of books read'
                                />
                                {/*Total Not Read*/}
                                <StatBox
                                    label='Not Read'
                                    number={totalUnread.bookCount}
                                    text='Total number of books not read'
                                />
                            </SimpleGrid>
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    )
}

export default Stats

import { useQuery } from '@apollo/client'
import { Heading, Spinner, Stack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../../graphql/queries'
import LibraryActionBar from './LibraryActionBar'
import LibraryTable from './LibraryTable'

interface Props {}

const Library: React.FC<Props> = () => {
    const [searchFilter, setSearchFilter] = useState('')
    const [searchFilterType, setSearchFilterType] = useState('')
    const { data, loading } = useQuery(ALL_BOOKS)

    return (
        <Stack px={4} mt={4} flexGrow={1} flexDir='column'>
            <Heading px={['0', '4', '8']}>Library</Heading>
            <LibraryActionBar
                searchFilter={searchFilter}
                searchFilterType={searchFilterType}
                setSearchFilter={setSearchFilter}
                setSearchFilterType={setSearchFilterType}
            />
            {loading ? (
                <VStack
                    bg='transparent'
                    justifyContent='center'
                    alignItems='center'
                    flexGrow={1}
                >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.300'
                        color='teal.500'
                        size='xl'
                    />
                </VStack>
            ) : (
                <LibraryTable
                    searchFilter={searchFilter}
                    searchFilterType={searchFilterType}
                    books={data.allBooks}
                />
            )}
        </Stack>
    )
}

export default Library

import React, { useState } from 'react'
import { Heading, Spinner, VStack, Stack } from '@chakra-ui/react'
import LibraryTable from './LibraryTable'
import LibraryActionBar from './LibraryActionBar'
import { ALL_BOOKS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const Library = props => {
  const [searchFilter, setSearchFilter] = useState('')
  const [searchFilterType, setSearchFilterType] = useState('')
  const { data, loading } = useQuery(ALL_BOOKS)

  return (
    <Stack px={4} mt={4} flexGrow={1} flexDir='column'>
      <Heading px={8}>Library</Heading>
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

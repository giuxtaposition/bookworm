import React, { useState } from 'react'
import { Heading, Box } from '@chakra-ui/layout'
import LibraryTable from './LibraryTable'
import LibraryActionBar from './LibraryActionBar'

const Library = props => {
  const [searchFilter, setSearchFilter] = useState('')
  const [searchFilterType, setSearchFilterType] = useState('')
  return (
    <Box px={4} mt={4}>
      <Heading>Library</Heading>
      <LibraryActionBar
        updateCacheWith={props.updateCacheWith}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
        setSearchFilter={setSearchFilter}
        setSearchFilterType={setSearchFilterType}
      />
      <LibraryTable
        updateCacheWith={props.updateCacheWith}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
      />
    </Box>
  )
}

export default Library

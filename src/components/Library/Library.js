import React from 'react'
import { Heading, Box } from '@chakra-ui/layout'
import LibraryTable from './LibraryTable'
import LibraryActionBar from './LibraryActionBar'

const Library = props => {
  return (
    <Box px={4} mt={4}>
      <Heading>Library</Heading>
      <LibraryActionBar updateCacheWith={props.updateCacheWith} />
      <LibraryTable updateCacheWith={props.updateCacheWith} />
    </Box>
  )
}

export default Library

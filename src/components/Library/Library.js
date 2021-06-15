import React from 'react'
import { Box } from '@material-ui/core'
import { Heading } from '@chakra-ui/layout'
import LibraryTable from './LibraryTable'
import LibraryActionBar from './LibraryActionBar'

const Library = () => {
  return (
    <Box px={4} mt={4}>
      <Heading>Library</Heading>
      <LibraryActionBar />
      <LibraryTable />
    </Box>
  )
}

export default Library

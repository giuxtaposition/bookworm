import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { LibraryContext } from '../../context'
import StatBox from './StatBox'

const Stats = () => {
  //CONTEXT
  const { books } = useContext(LibraryContext)

  //STATES
  const [totalBooks, setTotalBooks] = useState(0)
  const [totalRead, setTotalRead] = useState(0)
  const [totalUnread, setTotalUnread] = useState(0)

  useEffect(() => {
    // Total Count
    setTotalBooks(books.length)

    // Total Read
    let readCount = 0
    books.forEach(book => {
      if (book.read === true) {
        readCount++
      }
    })
    setTotalRead(readCount)

    // Total Unread
    setTotalUnread(books.length - readCount)
  }, [books])

  return (
    <Box spacing={6} pb={20} m={0} h='100%' w='100%'>
      {/*Heading*/}
      <Box pt={20} pb={20} bg='blue.600'>
        <Box maxW='7xl' paddingInlineStart={8} paddingInlineEnd={8}>
          <Box maxW='xl' mb={16} color={useColorModeValue('white', 'black')}>
            <Heading>Because we love statistics!</Heading>
            <Text>And it helps us understand ourselves better</Text>
          </Box>
        </Box>
      </Box>

      {/*Stats*/}
      <Flex mt='calc(var(--chakra-space-20) * -1)' justifyContent='center'>
        <Box maxW='7xl' paddingInlineStart={8} paddingInlineEnd={8}>
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={6}>
            {/*Total Number of Books*/}
            <StatBox
              label='Total Books'
              number={totalBooks}
              text='Total number of books in the library'
            />
            {/*Total Read*/}
            <StatBox
              label='Read'
              number={totalRead}
              text='Total number of books read'
            />
            {/*Total Not Read*/}
            <StatBox
              label='Not Read'
              number={totalUnread}
              text='Total number of books not read'
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  )
}

export default Stats

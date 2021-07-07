import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'
import React from 'react'
import StatBox from './StatBox'
import { useQuery } from '@apollo/client'
import { BOOK_COUNT, BOOK_COUNT_BY_READSTATE } from '../../graphql/queries'

const Stats = () => {
  const totalBooks = useQuery(BOOK_COUNT)
  const totalRead = useQuery(BOOK_COUNT_BY_READSTATE, {
    variables: { readState: 'read' },
  })
  const totalUnread = useQuery(BOOK_COUNT_BY_READSTATE, {
    variables: { readState: 'unread' },
  })

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
      {totalBooks.loading | totalRead.loading | totalUnread.loading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.300'
          color='green.500'
          size='xl'
        />
      ) : (
        <Flex mt='calc(var(--chakra-space-20) * -1)' justifyContent='center'>
          <Box maxW='7xl' paddingInlineStart={8} paddingInlineEnd={8}>
            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={6}>
              {/*Total Number of Books*/}
              <StatBox
                label='Total Books'
                number={totalBooks.data.bookCount}
                text='Total number of books in the library'
              />
              {/*Total Read*/}
              <StatBox
                label='Read'
                number={totalRead.data.bookCountByReadState}
                text='Total number of books read'
              />
              {/*Total Not Read*/}
              <StatBox
                label='Not Read'
                number={totalUnread.data.bookCountByReadState}
                text='Total number of books not read'
              />
            </SimpleGrid>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Stats

import { VStack, useColorModeValue } from '@chakra-ui/react'
import { useRouteMatch } from 'react-router-dom'
import { SEARCH_BOOK } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import BookUpperBox from './BookUpperBox'
import BookLowerBox from './BookLowerBox'
import LoadingSpinner from '../LoadingSpinner'

const Book = () => {
  const upperBoxBackground = useColorModeValue('#44aca0', 'gray.800')
  const lowerBoxBackground = useColorModeValue('white', 'gray.800')

  const match = useRouteMatch('/book/:id')

  const { data, loading } = useQuery(SEARCH_BOOK, {
    variables: {
      id: match.params.id,
    },
  })

  return (
    <VStack py={10} w='full' flexGrow={1} alignItems='center' spacing={4}>
      {loading && <LoadingSpinner />}
      {data && (
        <VStack mx='auto' shadow='lg' maxW='2xl'>
          <BookUpperBox
            upperBoxBackground={upperBoxBackground}
            book={data.searchBook}
          />
          <BookLowerBox
            lowerBoxBackground={lowerBoxBackground}
            book={data.searchBook}
          />
        </VStack>
      )}
    </VStack>
  )
}

export default Book

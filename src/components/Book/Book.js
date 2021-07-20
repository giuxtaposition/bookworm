import { VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import { useRouteMatch } from 'react-router-dom'
import { SEARCH_BOOK } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import BookUpperBox from './BookUpperBox'
import BookLowerBox from './BookLowerBox'
import LoadingSpinner from '../LoadingSpinner'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../../graphql/mutations'
import { ALL_BOOKS } from '../../graphql/queries'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Book = user => {
  const upperBoxBackground = useColorModeValue('#44aca0', '#065151')
  const lowerBoxBackground = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const location = useLocation()

  const [addBook] = useMutation(ADD_BOOK, {
    onError: error => {
      console.log(error)
      toast({
        title: 'Error',
        description: error.graphQLErrors[0].message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            const newBookRef = cache.writeQuery({
              data: addBook,
              query: ALL_BOOKS,
            })
            return [...existingBooks, newBookRef]
          },
        },
      })
    },
    onCompleted: () => {
      toast({
        title: 'Book Added.',
        description: 'Book added with success!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const match = useRouteMatch('/book/:id')

  const { data, loading } = useQuery(SEARCH_BOOK, {
    variables: {
      id: match.params.id,
    },
  })

  useEffect(() => {
    const handleAdd = async () => {
      if (location.state) {
        console.log(location.state)
        const bookToAdd = location.state.bookToAdd
        await addBook({
          variables: {
            readState: 'unread',
            title: bookToAdd.title,
            id: bookToAdd.id,
            published: bookToAdd.published,
            author: bookToAdd.author,
            genres: bookToAdd.genres,
            cover: bookToAdd.cover,
            pages: bookToAdd.pages,
          },
        })
      }
    }

    handleAdd()
  }, [addBook, location.state])

  return (
    <VStack
      py={{ base: 0, md: 10 }}
      w='full'
      flexGrow={1}
      alignItems='center'
      spacing={4}
    >
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
            user={user}
            addBook={addBook}
          />
        </VStack>
      )}
    </VStack>
  )
}

export default Book

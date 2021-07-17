import {
  useMediaQuery,
  SimpleGrid,
  Text,
  Box,
  Image,
  Flex,
  ButtonGroup,
  IconButton,
  useToast,
  useColorMode,
  Link,
} from '@chakra-ui/react'
import defaultCover from '../../images/default-cover.jpg'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { BsFillTrashFill } from 'react-icons/bs'
import { DELETE_BOOK, EDIT_BOOK } from '../../graphql/mutations'
import { useMutation } from '@apollo/client'
import { Link as ReactRouterLink } from 'react-router-dom'

const LibraryTableBody = ({ book }) => {
  const toast = useToast()
  const { colorMode } = useColorMode()
  const [isLargerThan730] = useMediaQuery('(min-width: 730px)')

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onError: error => {
      toast({
        title: 'Error',
        description: error.graphQLErrors[0].message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    update: (cache, { data }) => {
      const deletedBook = data.deleteBook
      const normalizedId = cache.identify(deletedBook)
      cache.evict({ id: normalizedId })
      cache.gc()
    },
    onCompleted: () =>
      toast({
        title: 'Book Deleted.',
        description: 'Book deleted with success!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      }),
  })

  const handleDelete = id => {
    deleteBook({
      variables: {
        id: id,
      },
    })
  }

  const [changeReadState] = useMutation(EDIT_BOOK, {
    onError: error => {
      toast({
        title: 'Error',
        description: error.graphQLErrors[0].message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    update: (cache, { data }) => {
      const editedBook = data.editBook
      const normalizedId = cache.identify(editedBook)
      cache.modify({
        id: normalizedId,
        fields: {
          readState() {
            return editedBook.readState
          },
        },
      })
    },
  })

  const handleRead = (id, read) => {
    changeReadState({
      variables: {
        id: id,
        readState: read === 'read' ? 'unread' : 'read',
      },
    })
  }

  return (
    <>
      <SimpleGrid
        spacingY={3}
        spacingX={3}
        columns={{ base: 1, md: 6 }}
        w={{ base: '55vw', md: 'full' }}
        py={2}
        paddingLeft={10}
        paddingRight={2}
        fontWeight='hairline'
        color='#777'
        _hover={{
          color: colorMode === 'light' ? 'black' : 'white',
        }}
        alignItems='center'
      >
        <Box display={{ base: 'none', md: 'flex' }}>
          <Link as={ReactRouterLink} to={`/book/${book.googleId}`}>
            <Image
              fit='contain'
              src={book.cover}
              alt='book-cover'
              fallbackSrc={defaultCover}
            />
          </Link>
        </Box>
        <Text>{book.title}</Text>
        <Text>{book.author.name}</Text>
        <Text>
          {!isLargerThan730 && 'Published: '}
          {book.published}
        </Text>
        <Text>
          {!isLargerThan730 && 'Added: '}
          {book.insertion.slice(0, 10)}
        </Text>
        <Flex justify={{ md: 'end' }}>
          <ButtonGroup variant='solid' size='sm' spacing={3}>
            <IconButton
              colorScheme={book.readState === 'read' ? 'green' : 'red'}
              icon={book.readState === 'read' ? <CheckIcon /> : <CloseIcon />}
              onClick={() => handleRead(book.id, book.readState)}
            />
            <IconButton
              colorScheme='grey'
              variant='outline'
              icon={<BsFillTrashFill />}
              onClick={() => handleDelete(book.id)}
            />
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
      <Box
        display={{ base: 'flex', md: 'none' }}
        mr={8}
        ml={`${isLargerThan730 ? 0 : 15}`}
      >
        <Image
          fit='contain'
          src={book.cover}
          alt='book-cover'
          fallbackSrc={defaultCover}
        />
      </Box>
    </>
  )
}

export default LibraryTableBody

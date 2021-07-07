import React from 'react'
import defaultCover from '../../images/default-cover.jpg'
import { Tr, Td, Image, Center, IconButton, useToast } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import { MdLibraryAdd } from 'react-icons/md'
import { DELETE_BOOK, EDIT_BOOK, ADD_BOOK } from '../../graphql/mutations'
import { useMutation } from '@apollo/client'

const Book = ({
  title,
  author,
  cover,
  pages,
  published,
  insertion,
  genres,
  read,
  id,
  inLibrary = true,
  searchResultsBooks = false,
  setSearchResultsBooks = false,
  updateCacheWith,
}) => {
  const toast = useToast()

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
    update: (store, response) => {
      updateCacheWith(response.data.deleteBook, 'DELETED')
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

  const handleDelete = () => {
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
    update: (store, response) => {
      updateCacheWith(response.data.editBook, 'EDITED')
    },
  })

  const handleRead = () => {
    changeReadState({
      variables: {
        id: id,
        readState: read === 'read' ? 'unread' : 'read',
      },
    })
  }

  const [addBook] = useMutation(ADD_BOOK, {
    onError: error => {
      console.log(error)
      if (error.graphQLErrors) {
        toast({
          title: 'Error',
          description: error.graphQLErrors[0].message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        console.error(error)
      }
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook, 'ADDED')
    },
    onCompleted: () => {
      console.log('here')
      const newBooks = searchResultsBooks.filter(book => book.id !== id)
      setSearchResultsBooks(newBooks)
      toast({
        title: 'Book Added.',
        description: 'Book added with success!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const handleAdd = async () => {
    await addBook({
      variables: {
        readState: 'unread',
        title: title,
        id: id,
        published: published,
        author: author[0],
        genres: genres,
        cover: cover,
        pages: pages,
      },
    })
  }

  return (
    <Tr>
      <Td>
        <Center>
          <Image
            boxSize='100px'
            objectFit='cover'
            src={cover}
            alt='book-cover'
            fallbackSrc={defaultCover}
          />
        </Center>
      </Td>
      <Td>
        <Center>{title}</Center>
      </Td>
      <Td>
        <Center>{author}</Center>
      </Td>
      <Td>
        <Center>{published}</Center>
      </Td>
      {inLibrary && (
        <Td>
          <Center>{insertion.slice(0, 10)}</Center>
        </Td>
      )}

      <Td>
        <Center>{pages}</Center>
      </Td>
      <Td>
        <IconButton
          onClick={() => handleRead()}
          isRound='true'
          bg='transparent'
        >
          <Center>
            {read === 'read' ? (
              <CheckIcon color='green.500' mr={1} />
            ) : (
              <CloseIcon color='red.500' mr={1} />
            )}
          </Center>
        </IconButton>
      </Td>
      <Td>
        {/*Delete Button*/}
        {inLibrary && (
          <IconButton
            onClick={() => handleDelete()}
            isRound='true'
            bg='transparent'
          >
            <Center>
              <DeleteIcon boxSize='0.8em' />
            </Center>
          </IconButton>
        )}

        {/*Add Button*/}
        {!inLibrary && (
          <Center>
            <IconButton
              onClick={() => handleAdd()}
              as={MdLibraryAdd}
              bg='transparent'
              color='teal.500'
              boxSize='2em'
            ></IconButton>
          </Center>
        )}
      </Td>
    </Tr>
  )
}

export default Book

import React from 'react'
import defaultCover from '../../images/default-cover.jpg'
import { Tr, Td, Image, Center, IconButton } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import { MdLibraryAdd } from 'react-icons/md'

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
}) => {
  const handleDelete = () => {}

  const handleAdd = () => {}

  const handleRead = () => {}

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

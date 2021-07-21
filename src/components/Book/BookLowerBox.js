import {
  VStack,
  Box,
  Text,
  HStack,
  Icon,
  ButtonGroup,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { useHistory, useLocation } from 'react-router-dom'

const BookLowerBox = props => {
  const { colorMode } = useColorMode()
  const history = useHistory()
  const location = useLocation()

  const handleAdd = async () => {
    if (!props.user) {
      history.push({
        pathname: '/signin',
        state: {
          from: {
            bookToAdd: {
              readState: 'unread',
              title: props.book.title,
              id: props.book.id,
              published: props.book.published,
              author: props.book.author[0],
              genres: props.book.genres,
              cover: props.book.cover,
              pages: props.book.pages,
            },
            pathname: location.pathname,
            search: location.search,
          },
        },
      })
    } else {
      await props.addBook({
        variables: {
          readState: 'unread',
          title: props.book.title,
          id: props.book.id,
          published: props.book.published,
          author: props.book.author[0],
          genres: props.book.genres,
          cover: props.book.cover,
          pages: props.book.pages,
        },
      })
    }
  }

  return (
    <VStack
      bg={props.lowerBoxBackground}
      w='full'
      pb={8}
      px={{ base: 6, md: 12 }}
    >
      <Text
        alignSelf='flex-start'
        fontSize={{ base: 'md', md: 'lg' }}
        fontWeight='bold'
      >
        Description
      </Text>
      <Box
        px={4}
        textAlign='left'
        overflowY='scroll'
        h={120}
        w='full'
        className='book-description'
        fontSize={{ base: 'sm', md: 'md' }}
        dangerouslySetInnerHTML={{ __html: props.book.description }}
      />
      <HStack pt={4}>
        <ButtonGroup variant='ghost' colorScheme='teal'>
          {!props.book.inLibrary ? (
            <IconButton
              fontSize='xl'
              icon={<Icon as={BsBookmark} />}
              onClick={handleAdd}
              _hover={{
                bg: colorMode === 'light' ? 'teal.100' : 'teal.900',
              }}
            />
          ) : (
            <IconButton
              fontSize='xl'
              icon={<Icon as={BsBookmarkFill} />}
              onClick={handleAdd}
              _hover={{
                bg: colorMode === 'light' ? 'teal.100' : 'teal.900',
              }}
            />
          )}
        </ButtonGroup>
      </HStack>
    </VStack>
  )
}

export default BookLowerBox

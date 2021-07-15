import {
  HStack,
  useColorModeValue,
  Image,
  Box,
  Link,
  Text,
  VStack,
  Icon,
  Tag,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoDocumentsOutline, IoCalendarOutline } from 'react-icons/io5'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../../graphql/mutations'

const BookCardList = props => {
  const [bookMarkIconHovered, setBookmarkIconHovered] = useState(false)
  const [bookAdded, setBookAdded] = useState(false)
  const toast = useToast()

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
    update: (cache, { data: addBook }) => {
      cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            const newBookRef = cache.writeQuery({
              data: addBook,
              query: ADD_BOOK,
            })
            return [...existingBooks, newBookRef]
          },
        },
      })
    },
    onCompleted: () => {
      setBookAdded(true)
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
        title: props.title,
        id: props.id,
        published: props.published,
        author: props.author[0],
        genres: props.genres,
        cover: props.cover,
        pages: props.pages,
      },
    })
  }

  return (
    <HStack
      w='xl'
      spacing={8}
      py={4}
      px={8}
      bg={useColorModeValue('white', '#2a2d37')}
      shadow='lg'
      rounded='lg'
    >
      <Box w='2xs'>
        <Image
          w='full'
          h={52}
          fit='cover'
          src={props.cover}
          alt='bookCover'
          borderRadius='10px'
          dropShadow='xl'
        />
      </Box>

      <VStack py={5} alignItems='flex-start' w='full'>
        <Link
          display='block'
          color={useColorModeValue('gray.800', 'white')}
          fontWeight='bold'
          whiteSpace='normal'
          _hover={{
            color: useColorModeValue('teal.600', 'teal.400'),
            textDecoration: 'underline',
          }}
        >
          {props.title}
        </Link>
        <Text fontSize='md' color={useColorModeValue('gray.700', 'gray.200')}>
          {props.author}
        </Text>
        <Text fontSize='md' color={useColorModeValue('gray.700', 'gray.200')}>
          <Icon boxSize={4} color='gray.500' as={IoDocumentsOutline} />{' '}
          {props.pages}
        </Text>
        <Text fontSize='md' color={useColorModeValue('gray.700', 'gray.200')}>
          <Icon boxSize={4} color='gray.500' as={IoCalendarOutline} />{' '}
          {props.published}
        </Text>
        {props.genres &&
          props.genres.map(genre => (
            <Tag size={'md'} key={genre} variant='subtle' colorScheme='teal'>
              {genre}
            </Tag>
          ))}
      </VStack>
      <Icon
        boxSize={8}
        color='teal.500'
        border
        as={bookMarkIconHovered || bookAdded ? BsBookmarkFill : BsBookmark}
        alignSelf='flex-start'
        justifySelf='flex-end'
        cursor='pointer'
        onMouseEnter={() => setBookmarkIconHovered(true)}
        onMouseLeave={() => setBookmarkIconHovered(false)}
        onClick={handleAdd}
      />
    </HStack>
  )
}

export default BookCardList

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
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { IoDocumentsOutline, IoCalendarOutline } from 'react-icons/io5'
import { BsBookmarkFill } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../../graphql/mutations'
import defaultCover from '../../images/default-cover.jpg'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ALL_BOOKS } from '../../graphql/queries'

const BookCardList = props => {
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
      spacing={{ base: 4, md: 8 }}
      maxW='xl'
      py={4}
      pl={{ base: 4, md: 8 }}
      pr={{ base: 0, md: 4 }}
      bg={useColorModeValue('white', '#2a2d37')}
      shadow='lg'
      rounded='lg'
    >
      <Link as={ReactRouterLink} to={`/book/${props.id}`}>
        <Box w={{ base: '5em', md: '8em' }}>
          <Image
            fit='cover'
            src={props.cover}
            fallbackSrc={defaultCover}
            alt='bookCover'
            borderRadius='10px'
            dropShadow='xl'
          />
        </Box>
      </Link>

      <VStack py={5} alignItems='flex-start' w='full'>
        <Link
          as={ReactRouterLink}
          to={`/book/${props.id}`}
          display='block'
          color={useColorModeValue('gray.800', 'white')}
          fontWeight='bold'
          fontSize={{ base: 'sm', md: 'md' }}
          _hover={{
            color: useColorModeValue('teal.600', 'teal.400'),
            textDecoration: 'underline',
          }}
          noOfLines={1}
        >
          <Tooltip hasArrow label={props.title}>
            {props.title}
          </Tooltip>
        </Link>
        <Text
          fontSize={{ base: 'xs', md: 'md' }}
          color={useColorModeValue('gray.700', 'gray.200')}
          noOfLines={1}
        >
          {props.author}
        </Text>
        <Text
          fontSize={{ base: 'xs', md: 'md' }}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <Icon boxSize={4} color='gray.500' as={IoDocumentsOutline} />{' '}
          {props.pages}
        </Text>
        <Text
          fontSize={{ base: 'xs', md: 'md' }}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <Icon boxSize={4} color='gray.500' as={IoCalendarOutline} />{' '}
          {props.published}
        </Text>
        {props.genres &&
          props.genres.map(genre => (
            <Tag size='sm' key={genre} variant='subtle' colorScheme='teal'>
              {genre}
            </Tag>
          ))}
      </VStack>
      <IconButton
        fontSize='xl'
        color='#44aca0'
        icon={<Icon as={BsBookmarkFill} />}
        alignSelf='flex-start'
        justifySelf='flex-end'
        onClick={handleAdd}
        variant='ghost'
        _hover={{
          bg: useColorModeValue('teal.100', 'teal.900'),
          color: useColorModeValue('black', 'white'),
        }}
      />
    </HStack>
  )
}

export default BookCardList

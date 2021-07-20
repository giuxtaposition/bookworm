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
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { IoDocumentsOutline, IoCalendarOutline } from 'react-icons/io5'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import defaultCover from '../../images/default-cover.jpg'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'

const BookCardList = props => {
  const { colorMode } = useColorMode
  const history = useHistory()
  const location = useLocation()

  const handleAdd = async () => {
    if (props.user) {
      await props.addBook({
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
    } else {
      history.push({
        pathname: '/signin',
        state: {
          from: {
            bookToAdd: {
              readState: 'unread',
              title: props.title,
              id: props.id,
              published: props.published,
              author: props.author[0],
              genres: props.genres,
              cover: props.cover,
              pages: props.pages,
            },
            pathname: location.pathname,
            search: location.search,
          },
        },
      })
    }
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
      {!props.inLibrary ? (
        <IconButton
          fontSize='xl'
          color='#44aca0'
          alignSelf='flex-start'
          justifySelf='flex-end'
          icon={<Icon as={BsBookmark} />}
          onClick={handleAdd}
          variant='ghost'
          _hover={{
            bg: colorMode === 'light' ? 'teal.100' : 'teal.900',
            color: colorMode === 'light' ? 'black' : 'white',
          }}
        />
      ) : (
        <IconButton
          fontSize='xl'
          color='#44aca0'
          icon={<Icon as={BsBookmarkFill} />}
          alignSelf='flex-start'
          justifySelf='flex-end'
          onClick={handleAdd}
          variant='ghost'
          _hover={{
            bg: colorMode === 'light' ? 'teal.100' : 'teal.900',
            color: colorMode === 'light' ? 'black' : 'white',
          }}
        />
      )}
    </HStack>
  )
}

export default BookCardList

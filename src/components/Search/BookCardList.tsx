import {
    Box,
    HStack,
    Icon,
    IconButton,
    Image,
    Link,
    Tag,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { IoCalendarOutline, IoDocumentsOutline } from 'react-icons/io5'
import {
    Link as ReactRouterLink,
    useHistory,
    useLocation,
} from 'react-router-dom'
import useAddBookMutation from '../../graphql/useAddBookMutation'
import defaultCover from '../../images/default-cover.jpg'
import { User } from '../../types/User'

interface Props {
    user?: User
    cover: string
    id: string
    title: string
    published: string
    author: string
    pages: number
    genres: string[]
    inLibrary: boolean
}

const BookCardList: React.FC<Props> = ({
    user,
    cover,
    id,
    title,
    published,
    author,
    genres,
    pages,
    inLibrary,
}) => {
    const { colorMode } = useColorMode()
    const history = useHistory()
    const location = useLocation()
    const addBook = useAddBookMutation()

    console.log('author', author)

    const handleAdd = async () => {
        if (user) {
            await addBook({
                title,
                id,
                published,
                author,
                genres,
                cover,
                pages,
            })
        } else {
            history.push({
                pathname: '/signin',
                state: {
                    from: {
                        bookToAdd: {
                            readState: 'unread',
                            title: title,
                            id: id,
                            published: published,
                            author: author,
                            genres: genres,
                            cover: cover,
                            pages: pages,
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
            <Link as={ReactRouterLink} to={`/book/${id}`}>
                <Box w={{ base: '5em', md: '8em' }}>
                    <Image
                        fit='cover'
                        src={cover}
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
                    to={`/book/${id}`}
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
                    <Tooltip hasArrow label={title}>
                        {title}
                    </Tooltip>
                </Link>
                <Text
                    fontSize={{ base: 'xs', md: 'md' }}
                    color={useColorModeValue('gray.700', 'gray.200')}
                    noOfLines={1}
                >
                    {author}
                </Text>
                <Text
                    fontSize={{ base: 'xs', md: 'md' }}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    <Icon
                        boxSize={4}
                        color='gray.500'
                        as={IoDocumentsOutline}
                    />
                    {pages}
                </Text>
                <Text
                    fontSize={{ base: 'xs', md: 'md' }}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    <Icon boxSize={4} color='gray.500' as={IoCalendarOutline} />{' '}
                    {published}
                </Text>
                {genres &&
                    genres.map(genre => (
                        <Tag
                            size='sm'
                            key={genre}
                            variant='subtle'
                            colorScheme='teal'
                        >
                            {genre}
                        </Tag>
                    ))}
            </VStack>
            {!inLibrary ? (
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
                    aria-label={'Add book'}
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
                    aria-label={'Book already in library'}
                />
            )}
        </HStack>
    )
}

export default BookCardList

import {
    Box,
    ButtonGroup,
    HStack,
    Icon,
    IconButton,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useHistory, useLocation } from 'react-router-dom'

interface Props {
    user: any
    book: any
    addBook: (book: any) => void
    lowerBoxBackground: string
}

const BookLowerBox: React.FC<Props> = ({
    user,
    book,
    addBook,
    lowerBoxBackground,
}) => {
    const { colorMode } = useColorMode()
    const history = useHistory()
    const location = useLocation()

    const handleAdd = async () => {
        if (!user || !user.length) {
            history.push({
                pathname: '/signin',
                state: {
                    from: {
                        bookToAdd: {
                            readState: 'unread',
                            title: book.title,
                            id: book.id,
                            published: book.published,
                            author: book.author[0],
                            genres: book.genres,
                            cover: book.cover,
                            pages: book.pages,
                        },
                        pathname: location.pathname,
                        search: location.search,
                    },
                },
            })
        } else {
            await addBook({
                variables: {
                    readState: 'unread',
                    title: book.title,
                    id: book.id,
                    published: book.published,
                    author: book.author[0],
                    genres: book.genres,
                    cover: book.cover,
                    pages: book.pages,
                },
            })
        }
    }

    return (
        <VStack
            bg={lowerBoxBackground}
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
                dangerouslySetInnerHTML={{ __html: book.description }}
            />
            <HStack pt={4}>
                <ButtonGroup variant='ghost' colorScheme='teal'>
                    {!book.inLibrary ? (
                        <IconButton
                            fontSize='xl'
                            icon={<Icon as={BsBookmark} />}
                            onClick={handleAdd}
                            _hover={{
                                bg:
                                    colorMode === 'light'
                                        ? 'teal.100'
                                        : 'teal.900',
                            }}
                            aria-label={'add to library'}
                        />
                    ) : (
                        <IconButton
                            fontSize='xl'
                            icon={<Icon as={BsBookmarkFill} />}
                            onClick={handleAdd}
                            _hover={{
                                bg:
                                    colorMode === 'light'
                                        ? 'teal.100'
                                        : 'teal.900',
                            }}
                            aria-label={'book already in library'}
                        />
                    )}
                </ButtonGroup>
            </HStack>
        </VStack>
    )
}

export default BookLowerBox

import {
    Box,
    ButtonGroup,
    HStack,
    Icon,
    IconButton,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useHistory, useLocation } from 'react-router-dom'
import useAddBook from '../../hooks/graphql/useAddBook'
import { SearchedBookResult } from '../../types/Book'
import { User } from '../../types/User'

interface Props {
    user?: User
    book: SearchedBookResult
}

const BookLowerBox: React.FC<Props> = ({ user, book }) => {
    const { colorMode } = useColorMode()
    const lowerBoxBackground = useColorModeValue('white', 'gray.800')
    const history = useHistory()
    const location = useLocation()
    const addBook = useAddBook()

    const handleAdd = async () => {
        if (user) {
            addBook({
                ...book,
            })
        } else {
            history.push({
                pathname: '/signin',
                state: {
                    from: {
                        bookToAdd: {
                            ...book,
                        },
                        pathname: location.pathname,
                        search: location.search,
                    },
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
                    <IconButton
                        fontSize='xl'
                        icon={
                            <Icon
                                as={
                                    book.inLibrary ? BsBookmarkFill : BsBookmark
                                }
                            />
                        }
                        onClick={!book.inLibrary ? handleAdd : undefined}
                        _hover={{
                            bg: colorMode === 'light' ? 'teal.100' : 'teal.900',
                        }}
                        aria-label={
                            book.inLibrary
                                ? 'book already in library'
                                : 'add book to library'
                        }
                    />
                </ButtonGroup>
            </HStack>
        </VStack>
    )
}

export default BookLowerBox

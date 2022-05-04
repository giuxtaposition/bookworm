import {
    Box,
    chakra,
    Flex,
    Image,
    Link,
    useColorModeValue,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import defaultCover from '../images/default-cover.jpg'
import { Author } from '../types/Book'

interface Props {
    cover: string
    id: string
    title: string
    author?: Author
}

const BookCard: React.FC<Props> = ({ cover, id, title, author }) => {
    return (
        <Flex
            flexDir='column'
            p={4}
            w='3xs'
            alignItems='center'
            justifyContent='center'
            className='book-card'
        >
            <Box>
                <Link as={ReactRouterLink} to={`/book/${id}`}>
                    <Image
                        w='full'
                        h={52}
                        fit='cover'
                        src={cover}
                        fallbackSrc={defaultCover}
                        alt='bookCover'
                        borderRadius='10px'
                        dropShadow='xl'
                    />
                </Link>
            </Box>

            <Box py={5} textAlign='center'>
                <Link
                    as={ReactRouterLink}
                    display='block'
                    color={useColorModeValue('gray.800', 'white')}
                    fontWeight='bold'
                    whiteSpace='normal'
                    _hover={{
                        color: useColorModeValue('teal.600', 'teal.400'),
                        textDecoration: 'underline',
                    }}
                    to={`/book/${id}`}
                >
                    {title}
                </Link>
                <chakra.span
                    fontSize='sm'
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    {author?.name}
                </chakra.span>
            </Box>
        </Flex>
    )
}

export default BookCard

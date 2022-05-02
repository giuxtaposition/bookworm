import {
    Divider,
    HStack,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import defaultCover from '../../images/default-cover.jpg'
import { SearchedBookResult } from '../../types/Book'

interface Props {
    book: SearchedBookResult
}

const BookUpperBox: React.FC<Props> = ({ book }) => {
    const upperBoxBackground = useColorModeValue('#44aca0', '#065151')
    return (
        <VStack
            bg={upperBoxBackground}
            spacing={4}
            w='full'
            py={8}
            px={{ base: 6, md: 12 }}
        >
            <Image
                w='auto'
                h={{ base: 40, md: 80 }}
                fit='contain'
                src={book.cover ?? defaultCover}
                alt='bookCover'
                borderRadius='10px'
                dropShadow='xl'
            />
            <VStack justifyContent='flex-start' textAlign='left'>
                <Text fontWeight='bold' fontSize={{ base: 'sm', md: '2xl' }}>
                    {book.title}
                </Text>
                <Text fontWeight='bold' fontSize={{ base: 'xs', md: 'lg' }}>
                    By {book.author}
                </Text>
            </VStack>
            <HStack borderRadius='10px' bgColor='rgba(0, 0, 0, 0.3)' p={4}>
                <VStack>
                    <Text fontSize={{ base: 'xs', md: 'md' }}>
                        {book.published}
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'lg' }}>
                        Publishing Date
                    </Text>
                </VStack>
                <Divider orientation='vertical' color='white' />
                <VStack>
                    <Text fontSize={{ base: 'xs', md: 'lg' }}>
                        {book.pages}
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'lg' }}>
                        Number of Pages
                    </Text>
                </VStack>

                <Divider orientation='vertical' color='white' />
                <VStack>
                    <Text
                        fontSize={{ base: 'xs', md: 'lg' }}
                        textTransform='uppercase'
                    >
                        {book.language}
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'lg' }}>Language</Text>
                </VStack>
            </HStack>
        </VStack>
    )
}

export default BookUpperBox

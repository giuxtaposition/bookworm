import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Book } from '../../../types/Book'
import BookCard from '../../BookCard'
import BooksCarousel from '../../BooksCarousel'

interface Props {
    sectionTitle: string
    sectionDescription: string
    books: Book[]
}

const BooksSection: React.FC<Props> = ({
    sectionTitle,
    sectionDescription,
    books,
}) => {
    const handleViewAll = () => {
        console.log('TODO: View all books')
    }

    return (
        <VStack py={10} px={5} w='100%'>
            <HStack w='100%' justifyContent='space-between'>
                <VStack>
                    <Heading
                        textTransform='uppercase'
                        alignSelf='flex-start'
                        fontSize='xl'
                    >
                        {sectionTitle}
                    </Heading>
                    <Text>{sectionDescription}</Text>
                </VStack>
                <Button
                    variant='ghost'
                    colorScheme='teal'
                    onClick={handleViewAll}
                >
                    View All
                </Button>
            </HStack>

            <BooksCarousel>
                {books.map(book => (
                    <div key={book.id}>
                        <BookCard
                            id={book.googleId}
                            cover={book.cover}
                            title={book.title}
                            author={book.author}
                        />
                    </div>
                ))}
            </BooksCarousel>
        </VStack>
    )
}

export default BooksSection

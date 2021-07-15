import { VStack, Heading, Text, HStack, Button } from '@chakra-ui/react'
import BookCard from '../../BookCard'
import BooksCarousel from '../../BooksCarousel'

const BooksSection = ({ sectionTitle, sectionDescription, books }) => {
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
        <Button variant='ghost' colorScheme='teal'>
          View All
        </Button>
      </HStack>

      <BooksCarousel>
        {books.map(book => (
          <div key={book.id}>
            <BookCard
              cover={book.cover}
              title={book.title}
              author={book.author.name}
            />
          </div>
        ))}
      </BooksCarousel>
    </VStack>
  )
}

export default BooksSection

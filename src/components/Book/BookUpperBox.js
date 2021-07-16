import { VStack, Image, Text, HStack, Divider } from '@chakra-ui/react'
import defaultCover from '../../images/default-cover.jpg'

const BookUpperBox = ({ upperBoxBackground, book }) => {
  return (
    <VStack bg={upperBoxBackground} spacing={4} w='full' py={8} px={12}>
      <Image
        w='auto'
        h={80}
        fit='contain'
        src={book.cover}
        fallbackSrc={defaultCover}
        alt='bookCover'
        borderRadius='10px'
        dropShadow='xl'
      />
      <VStack justifyContent='flex-start' textAlign='left'>
        <Text fontWeight='bold' fontSize='2xl'>
          {book.title}
        </Text>
        <Text fontWeight='bold' fontSize='lg'>
          By {book.author}
        </Text>
      </VStack>
      <HStack borderRadius='10px' bgColor='rgba(0, 0, 0, 0.3)' p={4}>
        <VStack>
          <Text>{book.published}</Text>
          <Text fontSize='sm'>Publishing Date</Text>
        </VStack>
        <Divider orientation='vertical' color='white' />
        <VStack>
          <Text>{book.pages}</Text>
          <Text fontSize='sm'>Number of Pages</Text>
        </VStack>

        <Divider orientation='vertical' color='white' />
        <VStack>
          <Text textTransform='uppercase'>{book.language}</Text>
          <Text fontSize='sm'>Language</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default BookUpperBox

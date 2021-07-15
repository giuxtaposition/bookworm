import {
  Flex,
  useColorModeValue,
  Image,
  Box,
  Link,
  chakra,
} from '@chakra-ui/react'
const BookCard = props => {
  return (
    <Flex
      flexDir='column'
      p={4}
      w='3xs'
      alignItems='center'
      justifyContent='center'
    >
      <Box>
        <Image
          w='full'
          h={52}
          fit='cover'
          src={props.cover}
          alt='bookCover'
          borderRadius='10px'
          dropShadow='xl'
        />
      </Box>

      <Box py={5} textAlign='center'>
        <Link
          display='block'
          color={useColorModeValue('gray.800', 'white')}
          fontWeight='bold'
          whiteSpace='normal'
          _hover={{
            color: useColorModeValue('teal.600', 'teal.400'),
            textDecoration: 'underline',
          }}
        >
          {props.title}
        </Link>
        <chakra.span
          fontSize='sm'
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          {props.author}
        </chakra.span>
      </Box>
    </Flex>
  )
}

export default BookCard

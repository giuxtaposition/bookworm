import {
  Flex,
  useColorModeValue,
  Image,
  Box,
  Link,
  chakra,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import defaultCover from '../images/default-cover.jpg'

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
        <Link as={ReactRouterLink} to={`/book/${props.id}`}>
          <Image
            w='full'
            h={52}
            fit='cover'
            src={props.cover}
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
          to={`/book/${props.id}`}
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

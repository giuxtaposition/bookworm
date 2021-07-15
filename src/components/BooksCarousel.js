import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { React, useState } from 'react'

function BooksCarousel({ children }) {
  const elementsPerPage = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  })
  const arrowStyles = {
    cursor: 'pointer',
    pos: 'absolute',
    top: '50%',
    w: 'auto',
    mt: '-22px',
    p: '16px',
    color: 'teal.500',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.6s ease',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    _hover: {
      opacity: 0.8,
      bg: 'black',
    },
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const pagesCount = Math.ceil(children.length / elementsPerPage)

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? pagesCount - 1 : s - 1))
  }
  const nextSlide = () => {
    setCurrentSlide(s => (s === pagesCount - 1 ? 0 : s + 1))
  }
  const setSlide = slide => {
    setCurrentSlide(slide)
  }

  const BooksCarouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 200}%`,
  }

  return (
    <Flex
      w='full'
      bg={useColorModeValue('gray.200', '#16181c')}
      overflow='hidden'
      pos='relative'
      alignItems='center'
      justifyContent='center'
      p={10}
    >
      <Flex h='xs' w='full' {...BooksCarouselStyle}>
        {Array.from({ length: pagesCount }).map((_, sid) => (
          <HStack
            key={`slide-${sid}`}
            boxSize='full'
            flex='none'
            justifyContent='center'
          >
            {children.slice(
              sid * elementsPerPage,
              sid * elementsPerPage + elementsPerPage
            )}
          </HStack>
        ))}
      </Flex>
      <Text {...arrowStyles} left='2' onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right='2' onClick={nextSlide}>
        &#10095;
      </Text>
      {elementsPerPage > 1 && (
        <HStack justify='center' pos='absolute' bottom='8px' w='full'>
          {Array.from({ length: pagesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor='pointer'
              boxSize={['7px', '15px']}
              my={4}
              bg={currentSlide === slide ? 'blackAlpha.800' : 'blackAlpha.500'}
              rounded='50%'
              display='inline-block'
              transition='background-color 0.6s ease'
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      )}
    </Flex>
  )
}

export default BooksCarousel

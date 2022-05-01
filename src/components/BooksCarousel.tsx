import {
    Box,
    Flex,
    HStack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
    children: React.ReactNode[]
}

const BooksCarousel: React.FC<Props> = ({ children }) => {
    const elementsPerPage: number = useBreakpointValue({
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
    })!

    const [currentSlide, setCurrentSlide] = useState(0)
    const pagesCount = Math.ceil(children?.length / elementsPerPage)

    const prevSlide = () => {
        setCurrentSlide(s => (s === 0 ? pagesCount - 1 : s - 1))
    }
    const nextSlide = () => {
        setCurrentSlide(s => (s === pagesCount - 1 ? 0 : s + 1))
    }
    const setSlide = (slide: number) => {
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
            <Text
                cursor='pointer'
                pos='absolute'
                top='50%'
                w='auto'
                mt='-22px'
                p='16px'
                color='teal.500'
                fontWeight='bold'
                fontSize='18px'
                transition='0.6s ease'
                borderRadius='0 3px 3px 0'
                userSelect='none'
                _hover={{
                    opacity: 0.8,
                    bg: 'black',
                }}
                left='2'
                onClick={prevSlide}
            >
                &#10094;
            </Text>
            <Text
                cursor='pointer'
                pos='absolute'
                top='50%'
                w='auto'
                mt='-22px'
                p='16px'
                color='teal.500'
                fontWeight='bold'
                fontSize='18px'
                transition='0.6s ease'
                borderRadius='0 3px 3px 0'
                userSelect='none'
                _hover={{
                    opacity: 0.8,
                    bg: 'black',
                }}
                right='2'
                onClick={nextSlide}
            >
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
                            bg={
                                currentSlide === slide
                                    ? 'blackAlpha.800'
                                    : 'blackAlpha.500'
                            }
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

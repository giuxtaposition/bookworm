import React, { useState, useEffect } from 'react'
import {
  VStack,
  Heading,
  HStack,
  Text,
  Flex,
  Box,
  Image,
  Link,
  chakra,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { POPULAR_BOOKS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Book = props => {
  return (
    <Flex p={30} w='full' alignItems='center' justifyContent='center'>
      <VStack
        h='sm'
        w='full'
        bg={useColorModeValue('white', 'gray.800')}
        shadow='lg'
        rounded='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Image
          w='full'
          h={52}
          fit='contain'
          src={props.cover}
          alt='bookCover'
        />

        <Box py={5} textAlign='center'>
          <Link
            display='block'
            fontSize='2xl'
            color={useColorModeValue('gray.800', 'white')}
            fontWeight='bold'
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
      </VStack>
    </Flex>
  )
}

const PopularBooks = () => {
  const [books, setBooks] = useState([])
  const [slidesPerView, setSlidesPerView] = useState(4)
  const [isLargerThan1600] = useMediaQuery('(min-width: 1600px)')
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  useQuery(POPULAR_BOOKS, {
    onCompleted: data => {
      setBooks(data.popularBooks)
    },
  })

  useEffect(() => {
    if (isLargerThan1600) {
      setSlidesPerView(4)
    } else if (isLargerThan1200) {
      setSlidesPerView(3)
    } else if (isLargerThan800) {
      setSlidesPerView(2)
    } else {
      setSlidesPerView(1)
    }
  }, [isLargerThan1600, isLargerThan1200, isLargerThan800])

  return (
    <VStack>
      <Heading>Popular Books</Heading>
      <Text>Check out some of our popular books below</Text>
      <HStack>
        <Flex
          bg={useColorModeValue('green.100', 'gray.600')}
          py={50}
          px={50}
          alignItems='center'
          justifyContent='center'
          w='100vw'
        >
          <Swiper
            // spaceBetween={0}
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={swiper => console.log(swiper)}
            // onSlideChange={() => console.log('on slide change')}
          >
            {books &&
              books.map(book => (
                <SwiperSlide key={book.googleId}>
                  <Book
                    title={book.title}
                    author={book.author.name}
                    cover={book.cover}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Flex>
      </HStack>
    </VStack>
  )
}

export default PopularBooks

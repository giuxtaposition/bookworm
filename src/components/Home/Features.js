import React from 'react'

import {
  Box,
  Icon,
  useColorModeValue,
  chakra,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import { BiBookHeart } from 'react-icons/bi'
import { IoMdStats, IoMdSearch } from 'react-icons/io'

const Feature = props => {
  return (
    <Box>
      <Icon
        boxSize={12}
        mb={4}
        fill={useColorModeValue('brand.700')}
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
        as={props.icon}
      />
      <chakra.h3
        mb={3}
        fontSize='lg'
        lineHeight='shorter'
        fontWeight='bold'
        color={useColorModeValue('gray.900')}
      >
        {props.title}
      </chakra.h3>
      <chakra.p
        lineHeight='tall'
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        {props.children}
      </chakra.p>
    </Box>
  )
}

const Features = () => {
  return (
    <Flex p={20} justifyContent='center' alignItems='center'>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={20}
        px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        bg={useColorModeValue('white', 'gray.700')}
        shadow='xl'
      >
        <Feature title='Search for your favourite books.' icon={IoMdSearch}>
          We're using Google's huge book database for search.
        </Feature>

        <Feature
          title='Easily catalog all your books in shelves'
          icon={BiBookHeart}
        >
          Never forget any book you've read or want to read.
        </Feature>

        <Feature title="Get insights on the books you've read" icon={IoMdStats}>
          All your book related numbers in a personal page
        </Feature>
      </SimpleGrid>
    </Flex>
  )
}
export default Features

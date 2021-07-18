import {
  SimpleGrid,
  HStack,
  useColorModeValue,
  Skeleton,
  useMediaQuery,
  VStack,
  SkeletonText,
} from '@chakra-ui/react'

const SearchLoadingSkeleton = () => {
  const skeletonContainerColor = useColorModeValue('white', '#2a2d37')
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  return (
    <SimpleGrid columns={`${isLargerThan1280 ? 2 : 1}`} spacing={8} py={8}>
      {Array.from({ length: 6 }).map((_, index) => (
        <HStack
          key={index}
          spacing={{ base: 4, md: 8 }}
          maxW='xl'
          py={4}
          pl={{ base: 4, md: 8 }}
          pr={{ base: 0, md: 4 }}
          bg={skeletonContainerColor}
          shadow='lg'
          rounded='lg'
        >
          <Skeleton
            w={{ base: '6em', md: '10em' }}
            h={{ base: '4em', md: '8em' }}
            startColor='teal.600'
            endColor='teal.300'
          />

          <VStack py={5} alignItems='flex-start' w='full'>
            <SkeletonText
              noOfLines={4}
              spacing='2'
              w={{ base: '10em', md: '15em' }}
              startColor='teal.600'
              endColor='teal.300'
            />
          </VStack>
        </HStack>
      ))}
    </SimpleGrid>
  )
}

export default SearchLoadingSkeleton

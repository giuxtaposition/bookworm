import {
  useMediaQuery,
  useColorMode,
  SimpleGrid,
  useBreakpointValue,
  Text,
  chakra,
} from '@chakra-ui/react'

const LibraryTableHeader = ({
  elementIndex,
  showSortingButtons = false,
  handlePublicationSorting = false,
  publicationSorting = false,
  handleInsertionSorting = false,
  insertionSorting = false,
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLargerThan730] = useMediaQuery('(min-width: 730px)')
  const breakpoint = useBreakpointValue({ base: true, md: false })

  return (
    <>
      {isLargerThan730 && (elementIndex === 0 || breakpoint) ? (
        <SimpleGrid
          spacingY={3}
          spacingX={3}
          columns={{ base: 1, md: 6 }}
          w={{ base: '15vw', md: 'full' }}
          textTransform='uppercase'
          bg={`${colorMode === 'light' ? 'teal.400' : '#19191d'}`}
          color='white'
          py={{ base: 1, md: 4 }}
          px={{ base: 2, md: 10 }}
          fontSize='md'
          fontWeight='bold'
          alignItems='center'
        >
          <Text display={{ base: 'none', md: 'block' }}>Cover</Text>
          <Text>Title</Text>
          <Text>Author</Text>
          <Text whiteSpace='nowrap'>
            Published{' '}
            {showSortingButtons && (
              <chakra.span
                display={{ base: 'none', md: 'inline' }}
                onClick={() => handlePublicationSorting()}
                cursor='pointer'
                _hover={{
                  bg: colorMode === 'light' ? 'gray.200' : 'gray.700',
                  borderRadius: '10%',
                }}
                w='-moz-fit-content'
              >
                {publicationSorting === 'asc' ? '▴' : '▾'}
              </chakra.span>
            )}
          </Text>
          <Text>
            Added{' '}
            {showSortingButtons && (
              <chakra.span
                display={{ base: 'none', md: 'inline' }}
                onClick={() => handleInsertionSorting()}
                cursor='pointer'
                _hover={{
                  bg: colorMode === 'light' ? 'gray.200' : 'gray.700',
                  borderRadius: '10%',
                }}
                w='-moz-fit-content'
              >
                {insertionSorting === 'asc' ? '▴' : '▾'}
              </chakra.span>
            )}
          </Text>
          <Text textAlign={{ md: 'right' }}></Text>
        </SimpleGrid>
      ) : null}
    </>
  )
}

export default LibraryTableHeader

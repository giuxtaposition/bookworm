import React from 'react'
import { Search2Icon, AddIcon } from '@chakra-ui/icons'
import {
  useColorModeValue,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import AddNewBook from './AddNewBook'

const LibraryActionBar = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack
        direction={['column', 'row']}
        spacing={4}
        justify='space-between'
        mt={4}
      >
        {/* Search Bar */}
        <HStack>
          <InputGroup minW={150}>
            <Input
              type='search'
              placeholder='Search..'
              // value={searchFilter}
              // onChange={e => setSearchFilter(e.target.value)}
            />
            <InputRightElement
              children={
                <Search2Icon
                  color={useColorModeValue('gray.700', 'gray.500')}
                />
              }
            />
          </InputGroup>
          <Select
            variant='outline'
            w='fit-content'
            minW={150}
            // value={searchFilterType}
            // onChange={e => setSearchFilterType(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='title'>Title</option>
            <option value='author'>Author</option>
          </Select>
        </HStack>

        {/* Add New Book Button */}
        <Stack>
          <Button
            variant={'solid'}
            colorScheme={'teal'}
            mr={4}
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            New Book
          </Button>
        </Stack>
      </Stack>

      {/*Add New Book Modal*/}
      <AddNewBook
        onClose={onClose}
        isOpen={isOpen}
        updateCacheWith={props.updateCacheWith}
      />
    </>
  )
}

export default LibraryActionBar

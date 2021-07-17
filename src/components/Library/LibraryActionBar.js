import React from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  useColorModeValue,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  HStack,
} from '@chakra-ui/react'

const LibraryActionBar = props => {
  return (
    <>
      <Stack
        direction={['column', 'row']}
        spacing={4}
        mt={4}
        px={['2', '4', '8']}
      >
        {/* Search Bar */}
        <HStack>
          <InputGroup minW={150}>
            <Input
              type='search'
              placeholder='Search..'
              value={props.searchFilter}
              onChange={e => props.setSearchFilter(e.target.value)}
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
            value={props.searchFilterType}
            onChange={e => props.setSearchFilterType(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='title'>Title</option>
            <option value='author'>Author</option>
          </Select>
        </HStack>
      </Stack>
    </>
  )
}

export default LibraryActionBar

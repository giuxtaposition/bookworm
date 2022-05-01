import { Search2Icon } from '@chakra-ui/icons'
import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

interface Props {
    searchFilter: string
    setSearchFilter: (searchFilter: string) => void
    searchFilterType: string
    setSearchFilterType: (searchFilterType: string) => void
}

const LibraryActionBar: React.FC<Props> = ({
    searchFilter,
    setSearchFilter,
    searchFilterType,
    setSearchFilterType,
}) => {
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
                            value={searchFilter}
                            onChange={e => setSearchFilter(e.target.value)}
                        />
                        <InputRightElement
                            children={
                                <Search2Icon
                                    color={useColorModeValue(
                                        'gray.700',
                                        'gray.500'
                                    )}
                                />
                            }
                        />
                    </InputGroup>
                    <Select
                        variant='outline'
                        w='fit-content'
                        minW={150}
                        value={searchFilterType}
                        onChange={e => setSearchFilterType(e.target.value)}
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

import { Search2Icon } from '@chakra-ui/icons'
import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useHistory } from 'react-router'

interface Props {
    showRadioButtons?: boolean
    shadow?: boolean
}

const SearchBar: React.FC<Props> = ({
    showRadioButtons = true,
    shadow = true,
}) => {
    const [search, SetSearch] = useState('')
    const [checkedFilter, setCheckedFilter] = useState('all')
    const history = useHistory()

    const submitSearch = () => {
        if (checkedFilter !== 'all') {
            history.push(`/search?q=${search}&filter=${checkedFilter}`)
        } else {
            history.push(`/search?q=${search}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitSearch()
        }
    }

    return (
        <VStack spacing={4} p={4}>
            <InputGroup minW={150}>
                <Input
                    type='search'
                    placeholder='Search..'
                    value={search}
                    onChange={e => SetSearch(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                    boxShadow={shadow ? 'xl' : 'unset'}
                    focusBorderColor='teal.500'
                />
                <InputRightElement
                    children={
                        <Button bg='transparent'>
                            <Search2Icon
                                color='teal.500'
                                onClick={() => submitSearch()}
                            />
                        </Button>
                    }
                />
            </InputGroup>

            {/*Radio Buttons*/}
            {showRadioButtons && (
                <RadioGroup
                    onChange={e => setCheckedFilter(e)}
                    value={checkedFilter}
                    alignSelf='flex-start'
                >
                    <Stack direction='row'>
                        <Radio value='all'>All</Radio>
                        <Radio value='title'>Title</Radio>
                        <Radio value='author'>Author</Radio>
                        <Radio value='isbn'>ISBN</Radio>
                    </Stack>
                </RadioGroup>
            )}
        </VStack>
    )
}

export default SearchBar

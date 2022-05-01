import {
    Box,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { AiOutlineFileSearch } from 'react-icons/ai'

const EmptySearchResults = () => {
    return (
        <Stack flexGrow={1} justifyContent='center'>
            <Box
                w='xs'
                bg={useColorModeValue('white', '#2a2d37')}
                shadow='lg'
                rounded='lg'
                overflow='hidden'
                mx='auto'
            >
                <Box w='full' p={5} textAlign='center' bgColor='green.500'>
                    <Icon as={AiOutlineFileSearch} boxSize={24}></Icon>
                </Box>
                <Box p={5} textAlign='center'>
                    <Heading fontSize='2xl'>Oops!</Heading>
                    <Text fontSize='xl'>
                        No books were found. Please try again with some other
                        search parameter!
                    </Text>
                </Box>
            </Box>
        </Stack>
    )
}

export default EmptySearchResults

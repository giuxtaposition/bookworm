import { Box, Stack } from '@chakra-ui/react'

const LoadingSpinner: React.FC = () => {
    return (
        <Stack
            flexGrow={1}
            flexBasis='auto'
            w='full'
            h='full'
            justifyContent='center'
            alignItems='center'
        >
            <Box className='loading-spinner'>
                <div></div>
                <div></div>
            </Box>
        </Stack>
    )
}
export default LoadingSpinner
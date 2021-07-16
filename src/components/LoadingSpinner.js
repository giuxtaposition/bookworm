import { Box, Stack } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <Stack
      flexGrow={1}
      flexBasis
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

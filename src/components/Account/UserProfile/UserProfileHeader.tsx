import { Box, Image } from '@chakra-ui/react'
import { User } from '../../../types/User'

interface Props {
    user: User
}

const UserProfileHeader: React.FC<Props> = ({ user }) => {
    return (
        <>
            {user.coverPhoto ? (
                <Box>
                    <Image
                        w='100vw'
                        h='30vh'
                        objectFit='cover'
                        src={user.coverPhoto ? user.coverPhoto.location : ''}
                        alt='user-cover'
                    />
                </Box>
            ) : (
                <Box h='30vh' w='100vw'>
                    <Box
                        position='absolute'
                        w='100%'
                        h='30vh'
                        bgGradient='linear(to-r, teal.500, teal.600)'
                    />
                    <Box
                        position='absolute'
                        w='100%'
                        h='30vh'
                        bg='teal.300'
                        clipPath='polygon(0% 0%, 0% 100%, 100% 0%)'
                    />
                </Box>
            )}
        </>
    )
}

export default UserProfileHeader

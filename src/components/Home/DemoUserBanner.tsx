import { useMutation } from '@apollo/client'
import { BellIcon } from '@chakra-ui/icons'
import {
    Box,
    chakra,
    HStack,
    Icon,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { LOGIN } from '../../graphql/mutations'

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
}

const DemoUserBanner: React.FC<Props> = ({ setToken }) => {
    const toast = useToast()

    const [login] = useMutation(LOGIN, {
        onError: error => {
            if (error.graphQLErrors) {
                toast({
                    title: 'Error',
                    description: error.graphQLErrors[0].message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        },
        onCompleted: data => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('bookworm-user', 'Giuxtaposition')
            localStorage.setItem('bookworm-user-token', token)
            toast({
                title: 'Success',
                description: 'Logged in',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
    })

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        await login({
            variables: { username: 'Giuxtaposition', password: '26031997' },
        })
    }

    return (
        <Box as='section' pt='8' pb='12' w='full'>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                justifyContent='center'
                alignItems='center'
                py='3'
                px={{ base: '3', md: '6', lg: '8' }}
                color='white'
                bg='linear-gradient(163deg, rgba(15,171,128,1) 30%, rgba(53,182,165,1) 66%, rgba(34,195,154,1) 100%); '
            >
                <HStack spacing='3'>
                    <Icon as={BellIcon} fontSize='2xl' h='10' />
                    <Text fontWeight='medium' marginEnd='2' textAlign='center'>
                        Hey there! This site is still a work in progress. If you
                        want to quickly try some of the features{' '}
                        <chakra.span
                            role='button'
                            textDecoration='underline'
                            onClick={handleLogin}
                        >
                            click here
                        </chakra.span>{' '}
                        for the Demo User! <br />
                        <chakra.span fontSize='sm'>
                            (or you can create your own)
                        </chakra.span>
                    </Text>
                </HStack>
            </Stack>
        </Box>
    )
}

export default DemoUserBanner

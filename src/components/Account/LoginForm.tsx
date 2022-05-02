import { useMutation } from '@apollo/client'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { LOGIN } from '../../graphql/mutations'
import { AddBookRequest } from '../../hooks/graphql/useAddBook'
import { User } from '../../types/User'

interface Props {
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
    user?: User
}

export interface LocationState {
    from: {
        pathname: string
        search: string
        bookToAdd: string
    }
    bookToAdd: AddBookRequest
}

const LoginForm: React.FC<Props> = ({ setToken, user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const location = useLocation<LocationState>()

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
            localStorage.setItem('bookworm-user', username)
            localStorage.setItem('bookworm-user-token', token)
            toast({
                title: 'Success',
                description: 'Logged in',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            if (location.state) {
                history.push({
                    pathname: location.state.from.pathname,
                    search: location.state.from.search
                        ? location.state.from.search
                        : '',
                    state: {
                        bookToAdd: location.state.from.bookToAdd
                            ? location.state.from.bookToAdd
                            : '',
                    },
                })
            } else {
                history.push('/')
            }
        },
    })

    const handleLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        await login({ variables: { username, password } })
    }

    return (
        <VStack alignItems='center' justifyContent='center' my='24'>
            <Flex width='full' align='center' justifyContent='center'>
                {!user ? (
                    <Box
                        p={8}
                        maxWidth='400'
                        borderWidth={{ base: '0', md: '1' }}
                        borderRadius={8}
                        boxShadow={{ base: 'none', md: 'lg' }}
                    >
                        <Box textAlign='center'>
                            <Heading>Login</Heading>
                        </Box>
                        <Box my={4} textAlign='left'>
                            <form onSubmit={handleLogin}>
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type='username'
                                        placeholder='username'
                                        value={username}
                                        onChange={({ target }) =>
                                            setUsername(target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl mt={6}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type='password'
                                        placeholder='password'
                                        value={password}
                                        onChange={({ target }) =>
                                            setPassword(target.value)
                                        }
                                    />
                                </FormControl>
                                <Button
                                    width='full'
                                    mt={4}
                                    type='submit'
                                    colorScheme='green'
                                >
                                    Sign In
                                </Button>
                            </form>
                        </Box>
                    </Box>
                ) : (
                    <Heading>Already signed in!</Heading>
                )}
            </Flex>
        </VStack>
    )
}
export default LoginForm

import { useMutation } from '@apollo/client'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    useToast,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link as ReactRouterLink, useHistory } from 'react-router-dom'
import { SIGNUP } from '../../graphql/mutations'
import { User } from '../../types/User'

interface Props {
    user?: User
}

const SignUpForm: React.FC<Props> = ({ user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const toast = useToast()
    const [signup] = useMutation(SIGNUP, {
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
            toast({
                title: 'Success',
                description: `Created new user ${data.createUser.username}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
    })

    const handleSignup = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        signup({ variables: { username, password } })
        history.push('/')
    }

    return (
        <VStack alignItems='center' justifyContent='center' my='24'>
            <VStack
                width='full'
                align='center'
                justifyContent='center'
                spacing='8'
            >
                {!user ? (
                    <>
                        <Box
                            p={8}
                            maxWidth='400'
                            borderWidth={{ base: '0', md: '1' }}
                            borderRadius={8}
                            boxShadow={{ base: 'none', md: 'lg' }}
                        >
                            <Box textAlign='center'>
                                <Heading>Sign Up</Heading>
                            </Box>
                            <Box my={4} textAlign='left'>
                                <form onSubmit={handleSignup}>
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
                                        colorScheme='teal'
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                        <Link as={ReactRouterLink} to='/signin' href={'#'}>
                            Already have an account? Sign in here
                        </Link>
                    </>
                ) : (
                    <Heading>Already signed in!</Heading>
                )}
            </VStack>
        </VStack>
    )
}
export default SignUpForm

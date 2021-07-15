import React, { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../graphql/mutations'
import { useHistory, useLocation } from 'react-router-dom'

const LoginForm = ({ setToken, user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const location = useLocation()

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
        history.push(location.state.from.pathname)
      } else {
        history.push('/')
      }
    },
  })

  const handleLogin = async event => {
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
            borderWidth={1}
            borderRadius={8}
            boxShadow='lg'
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
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </FormControl>
                <FormControl mt={6}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </FormControl>
                <Button width='full' mt={4} type='submit' colorScheme='green'>
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

import { useMutation } from '@apollo/client'
import {
    Button,
    Divider,
    Heading,
    Stack,
    useToast,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { EDIT_USER } from '../../../graphql/mutations'
import { CURRENT_USER } from '../../../graphql/queries'
import CoverPhoto from './CoverPhoto'
import PersonalInfo from './PersonalInfo'
import ProfilePhoto from './ProfilePhoto'

interface Props {
    user: any
}

const AccountSettings: React.FC<Props> = ({ user }) => {
    // STATES
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')

    const toast = useToast()

    const [editUser] = useMutation(EDIT_USER, {
        onError: error => {
            console.log(error)
        },
        update: (store, { data }) => {
            store.writeQuery({
                query: CURRENT_USER,
                data: {
                    me: data.editUser,
                },
            })
        },
        onCompleted: () => {
            setName('')
            setBio('')
            setEmail('')
            setFavoriteGenre('')
            toast({
                title: 'Success',
                description: 'Your changes have been saved',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
            })
        },
    })

    const handleEdit = () => {
        editUser({
            variables: {
                name,
                email,
                bio,
                favoriteGenre,
            },
        })
    }

    return (
        <VStack py={50}>
            <VStack spacing={4} w={['90%', '90%', '80%', '50%', '50%']}>
                <Heading>Account Settings</Heading>

                <Divider />

                <PersonalInfo
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    bio={bio}
                    setBio={setBio}
                    favoriteGenre={favoriteGenre}
                    setFavoriteGenre={setFavoriteGenre}
                />

                <Divider />

                <ProfilePhoto user={user} />
                <CoverPhoto />

                <Stack direction={['column', 'row']}>
                    <Button
                        type='submit'
                        colorScheme='teal'
                        fontWeight='bold'
                        onClick={handleEdit}
                    >
                        Save Changes
                    </Button>
                    <Button type='button' variant='outline' fontWeight='bold'>
                        Cancel
                    </Button>
                </Stack>
            </VStack>
        </VStack>
    )
}

export default AccountSettings

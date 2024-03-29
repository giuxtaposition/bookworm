import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    Textarea,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import React from 'react'
import FormSection from './FormSection'

interface Props {
    name: string
    setName: (name: string) => void
    email: string
    setEmail: (email: string) => void
    bio: string
    setBio: (bio: string) => void
    favoriteGenre: string
    setFavoriteGenre: (favoriteGenre: string) => void
}

const PersonalInfo: React.FC<Props> = ({
    name,
    setName,
    email,
    setEmail,
    bio,
    setBio,
    favoriteGenre,
    setFavoriteGenre,
}) => {
    return (
        <FormSection sectionTitle='Personal Info'>
            <VStack spacing={4}>
                {/* Name */}
                <FormControl>
                    <FormLabel
                        fontSize='sm'
                        fontWeight='md'
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        Name
                    </FormLabel>
                    <InputGroup size='sm'>
                        <Input
                            type='text'
                            placeholder='Katniss  Evergreen'
                            focusBorderColor='teal.400'
                            rounded='md'
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                    </InputGroup>
                </FormControl>

                {/* Email */}
                <FormControl>
                    <FormLabel
                        fontSize='sm'
                        fontWeight='md'
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        Email
                    </FormLabel>
                    <InputGroup size='sm'>
                        <Input
                            type='email'
                            placeholder='kat.evergreen@district12.com'
                            focusBorderColor='teal.400'
                            rounded='md'
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </InputGroup>
                </FormControl>

                {/* About */}
                <FormControl>
                    <FormLabel
                        fontSize='sm'
                        fontWeight='md'
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        About
                    </FormLabel>
                    <Textarea
                        placeholder='I like to overthrow dictatorships for breakfast'
                        mt={1}
                        rows={3}
                        shadow='sm'
                        focusBorderColor='teal.400'
                        fontSize={{ sm: 'sm' }}
                        value={bio}
                        onChange={({ target }) => setBio(target.value)}
                    />
                    <FormHelperText>
                        Brief description for your profile. URLs are
                        hyperlinked.
                    </FormHelperText>
                </FormControl>

                {/* Favorite Genre */}
                <FormControl>
                    <FormLabel
                        fontSize='sm'
                        fontWeight='md'
                        color={useColorModeValue('gray.700', 'gray.50')}
                    >
                        Favorite Genre
                    </FormLabel>
                    <InputGroup size='sm'>
                        <Input
                            type='text'
                            placeholder='Fantasy'
                            focusBorderColor='teal.400'
                            rounded='md'
                            value={favoriteGenre}
                            onChange={({ target }) =>
                                setFavoriteGenre(target.value)
                            }
                        />
                    </InputGroup>
                </FormControl>
            </VStack>
        </FormSection>
    )
}

export default PersonalInfo

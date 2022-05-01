import { Stack, Text } from '@chakra-ui/react'

interface Props {
    sectionTitle: string
    children: React.ReactNode
}

const FormSection: React.FC<Props> = ({ sectionTitle, children }) => {
    return (
        <Stack
            direction={['column', 'row']}
            w='100%'
            justifyContent='space-between'
            px={50}
            py={10}
        >
            <Text alignSelf='flex-start' fontWeight='bold'>
                {sectionTitle}
            </Text>
            {children}
        </Stack>
    )
}

export default FormSection

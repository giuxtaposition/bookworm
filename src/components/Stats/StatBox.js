import React from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react'

const StatBox = ({ label, number, text }) => {
  return (
    <Stat
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius='lg'
      boxShadow='md'
    >
      <StatLabel color='blue.300' fontSize='sm' fontWeight='bold'>
        {label}
      </StatLabel>
      <StatNumber
        fontSize='5xl'
        fontWeight='extrabold'
        lineHeight='1'
        marginY={4}
      >
        {number}
      </StatNumber>
      <StatHelpText>{text}</StatHelpText>
    </Stat>
  )
}

export default StatBox

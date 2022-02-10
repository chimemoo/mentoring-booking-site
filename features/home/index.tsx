import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Select,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [value, onChange] = useState(new Date());
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="8xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Book Mentoring Session
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Book now to get first seat ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <FormControl id="sessionType" isRequired pb="4">
            <FormLabel>Select Session Type</FormLabel>

            <Select size="md">
              <option value="1on1">1 On 1</option>
              <option value="1on3">1 On 3</option>
            </Select>
          </FormControl>
          <FormControl id="date" isRequired pb="4">
            <FormLabel>Select Date</FormLabel>
            <Calendar onChange={onChange} value={value} />
          </FormControl>
          <FormControl id="availability" isRequired pb="4">
            <FormLabel>Select Available Time</FormLabel>
            <Box maxH={300}>
              <Button colorScheme="blue" display="block" w="full" mb="2" variant="solid">8:00 - 9:00</Button>
              <Button colorScheme="blue" display="block" w="full" mb="2" variant="outline">16:00 - 17:00</Button>
              <Button colorScheme="blue" display="block" w="full" mb="2" variant="outline">17:00 - 18:00</Button>
              <Button colorScheme="blue" display="block" w="full" mb="2" variant="outline">19:00 - 20:00</Button>

            </Box>
            <FormHelperText>
              Time is in WIB (+07:00).
            </FormHelperText>
          </FormControl>
          <FormControl id="name" isRequired pb="4">
            <FormLabel>Your Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="email" isRequired pb="4">
            <FormLabel>Type Other Member Email</FormLabel>
            <Textarea placeholder="example: a@gmail.com,b@gmail.com" />
            <FormHelperText>
              You can write up to 2 email, (give separated comma).
            </FormHelperText>
          </FormControl>
          <Button colorScheme="blue" display="block" w="full" mt="2" variant="solid">BOOKING</Button>

        </Box>
      </Stack>
    </Flex>
  );
}

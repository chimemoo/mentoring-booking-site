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
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { mutate } from 'swr';
import SessionAvailability from './SessionAvailability';
import { OtherEmail } from './OtherMail';

export default function Home() {
  const toast = useToast();
  const { data: session } = useSession();
  const router = useRouter();
  const [type, setType] = useState <any>('1on1');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState <any>(null);
  const [emails, setEmails] = useState< any >([]);

  const onSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionType: type,
        email: session?.user?.email,
        name: session?.user?.name,
        date: dayjs(date).format('YYYY-MM-DD'),
        hourStart: time.hourStart,
        hourEnd: time.hourEnd,
        otherMail: type === '1on3' ? emails : [],
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          mutate(`${process.env.NEXT_PUBLIC_API_URL}/session?date=${dayjs(date).format('YYYY-MM-DD')}`);
          return router.push('/success');
        }
        throw res;
      }).catch((err) => {
        toast({
          title: 'Booking Failed',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const onChangeDate = (val: any) => {
    setDate(val);
    setTime(null);
  };

  const isCanSubmited = type
      && time
      && (type === '1on3' ? emails.length > 0 : true);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="8xl" py={12}>
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
          className="hola"
          p={[2, 4, 8]}
        >
          <FormControl id="sessionType" isRequired pb="4">
            <FormLabel>Select Session Type</FormLabel>

            <Select size="md" onChange={(e) => setType(e.target.value)}>
              <option value="1on1">1 On 1</option>
              <option value="1on3">1 On 3</option>
            </Select>
          </FormControl>
          <FormControl id="date" isRequired pb="4">
            <FormLabel>Select Date</FormLabel>
            <Calendar
              onChange={onChangeDate}
              value={date}
              minDate={new Date()}
            />
          </FormControl>
          <FormControl id="availability" isRequired pb="4">
            <FormLabel>Select Available Time</FormLabel>
            <SessionAvailability
              date={date}
              selected={time}
              onSelect={setTime}
            />
          </FormControl>
          {type === '1on3' && (
          <FormControl id="email" isRequired pb="4">
            <FormLabel>Type Other Member Email</FormLabel>
            <OtherEmail emails={emails} setEmails={setEmails} />
            <FormHelperText>
              You can write up to 2 email
            </FormHelperText>
          </FormControl>
          )}
          <Button
            colorScheme="blue"
            display="block"
            w="full"
            mt="2"
            variant="solid"
            disabled={!isCanSubmited}
            onClick={onSubmit}
          >BOOKING
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}

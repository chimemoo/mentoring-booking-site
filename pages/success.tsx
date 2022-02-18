import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  useColorModeValue,
  Link as LinkComponent,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Head from 'next/head';

export default function Success() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Head>
        <title>Booking Success | Bookmytime</title>
      </Head>
      <Stack spacing={8} mx="auto" maxW="8xl" py={12}>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          className="hola"
          p={[2, 4, 8]}
          w="sm"
        >
          <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize="50px" color="green.500" />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Success
            </Heading>
            <Text color="gray.500" w="">
              Session successfully booked, please check your email
            </Text>
            <br />
            <Link href="/" passHref>
              <LinkComponent>Back To Home</LinkComponent>
            </Link>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

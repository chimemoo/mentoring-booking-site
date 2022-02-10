import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSession, signIn } from 'next-auth/react';
import Router from 'next/router';

export default function SignupCard() {
  const { data: session } = useSession();

  if (session) {
    return Router.push('/');
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Authenticate
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Authenticate yourself before starting book my time.
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => signIn()}
              >
                Authenticate
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

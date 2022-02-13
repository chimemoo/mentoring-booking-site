/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormHelperText,
  Text,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import useSessionSchedule from '../../hooks/useSessionSchedule';

interface SessionAvailabilityProps {
  date: Date;
  selected: any;
  onSelect: (val: any) => void,
}

function SessionAvailability({ date, selected, onSelect }: SessionAvailabilityProps) {
  const { session, isError, isLoading } = useSessionSchedule(date);

  if (isLoading) {
    return (
      <Flex align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mx="auto"
        />
      </Flex>
    );
  }
  if (isError) return <p>Error</p>;

  if (session.length === 0) {
    return <Text>No Session available in {date.toDateString()}</Text>;
  }

  return (
    <Box maxH={300}>
      {session.map((data: any) => (
        <Button
          key={data.key}
          colorScheme="blue"
          display="block"
          w="full"
          mb="2"
          variant={selected === data ? 'solid' : 'outline'}
          onClick={() => onSelect(data)}
        >
          {data.hourStart} - {data.hourEnd}
        </Button>
      ))}
      <FormHelperText>
        Time is in WIB (+07:00).
      </FormHelperText>
    </Box>
  );
}

export default SessionAvailability;

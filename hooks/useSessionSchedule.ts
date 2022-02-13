import useSWR from 'swr';
import dayjs from 'dayjs';

const fetcher = (url: string) => fetch(url, { mode: 'cors' }).then((res) => res.json());

const useSessionSchedule = (date: Date) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/session?date=${dayjs(date).format('YYYY-MM-DD')}`, fetcher);

  return {
    session: data?.data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSessionSchedule;

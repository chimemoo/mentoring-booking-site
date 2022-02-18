import { getSession } from 'next-auth/react';
import Head from 'next/head';
import HomeComponent from '../features/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Book Mentoring Session | Bookmytime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomeComponent />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const data = await getSession(context);

  if (data?.user) {
    return {
      props: {
        session: data,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
  };
}

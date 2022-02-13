import type { NextPage } from 'next';
import Head from 'next/head';
import HomeComponent from '../features/home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Book Mentoring Session</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomeComponent />
    </>
  );
};

export default Home;

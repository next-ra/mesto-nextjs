import Head from 'next/head';
import { useState, useEffect } from 'react';
import PlacesList from '../components/places/places-list';
import Profile from '../components/user/profile';
import { getSession } from 'next-auth/client';
import { getAllCards } from '../helpers/api-util';
const HomePage = ({ cards }) => {
  const [session, setSession] = useState();
  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      {session && <Profile />}
      <PlacesList cards={cards} />
    </div>
  );
};

export const getStaticProps = async () => {
  const cards = await getAllCards();

  return {
    props: { cards },
    revalidate: 1800,
  };
};

export default HomePage;

import Head from 'next/head';
import PlacesList from '../components/places/places-list';
import Profile from '../components/user/profile';

import { getAllCards } from '../helpers/api-util';
const HomePage = ({ cards }) => {
  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      <Profile />
      <PlacesList cards={cards} />
    </div>
  );
};

export const getStaticProps = async () => {
  const cards = await getAllCards();
  console.log(cards);
  return {
    props: { cards },
    revalidate: 1800,
  };
};

export default HomePage;

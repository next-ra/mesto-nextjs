import Head from 'next/head';
import { useState, useEffect } from 'react';
import PlacesList from '../components/places/places-list';
import Profile from '../components/user/profile';
import { useSession } from 'next-auth/client';
import { getAllCards } from '../helpers/api-util';
import Popup from '../components/popup/popup';
const HomePage = (props) => {
  const { cards, showPopup, showPopupHandler, clickOutside } = props;

  const [session, loading] = useSession();
  console.log(session);

  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      {session && (
        <Profile userData={session.user} showPopupHandler={showPopupHandler} />
      )}
      <PlacesList cards={cards} />
      {showPopup && (
        <Popup
          clickOutside={clickOutside}
          showPopupHandler={showPopupHandler}
        />
      )}
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

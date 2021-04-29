import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import PlacesList from '../components/places/places-list';
import Popup from '../components/popup/popup';
import Profile from '../components/user/profile';
import { getAllCards } from '../controllers/cards';
import { SET_CARDS } from '../redux/actions/types';
import { initializeStore } from '../redux/store';

const HomePage = (props) => {
  const cards = useSelector((state) => state.cardsReducer.cards);

  const { showPopup, showPopupHandler, clickOutside } = props;

  const [session, loading] = useSession();

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

// export const getStaticProps = async () => {
//   const cards = await getAllCards();
//   return {
//     props: { cards },
//     revalidate: 1800,
//   };
// };

export const getServerSideProps = async () => {
  const cards = await getAllCards();

  const reduxStore = await initializeStore();
  const { dispatch } = reduxStore;

  dispatch({
    type: SET_CARDS,
    cards,
  });
  return { props: { initialReduxState: reduxStore.getState() } };
};

export default HomePage;

import { getSession, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import PlacesList from '../components/places/places-list';
import Popup from '../components/popup/popup';
import Profile from '../components/user/profile';
import { getAllCards } from '../controllers/cards';
import { SET_CARDS, SET_USER } from '../redux/actions/types';
import { initializeStore } from '../redux/store';

const HomePage = (props) => {
  const cards = useSelector((state) => state.cardsReducer.cards);
  const user = useSelector((state) => state.userReducer.user);
  const { showPopup, showPopupHandler, clickOutside } = props;

  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      {session && (
        <Profile userData={user} showPopupHandler={showPopupHandler} />
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

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const cards = await getAllCards();
  const reduxStore = await initializeStore();
  const { dispatch } = reduxStore;
  if (session) {
    dispatch({
      type: SET_USER,
      user: session.user,
    });
  }

  dispatch({
    type: SET_CARDS,
    cards,
  });
  return { props: { initialReduxState: reduxStore.getState() } };
};

export default HomePage;

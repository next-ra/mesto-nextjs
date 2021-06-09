import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import PlacesList from '../components/places/places-list';
import Popup from '../components/popup/popup';
import NoCardsYet from '../components/user/no-cards-yet';
import { getAllCards } from '../controllers/cards';
import { SET_CARDS, SET_USER } from '../redux/actions/types';
import { initializeStore } from '../redux/store';

const HomePage = (props) => {
  const cards = useSelector((state) => state.cardsReducer.cards);

  const { showPopup, showPopupHandler, clickOutside } = props;

  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>

      <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2rem' }}>
        Карточки пользователей:
      </h1>
      {cards.length == 0 && <NoCardsYet />}
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
    cards: cards.data || [],
  });
  return { props: { initialReduxState: reduxStore.getState() } };
};

export default HomePage;

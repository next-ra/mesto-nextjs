import { getSession } from 'next-auth/client';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PlacesList from '../../components/places/places-list';
import Popup from '../../components/popup/popup';
import Profile from '../../components/user/profile';
import { getAllCards } from '../../controllers/cards';
import { SET_CARDS, SET_USER } from '../../redux/actions/types';
import { initializeStore } from '../../redux/store';

const ProfilePage = ({
  showPopupHandler,
  showPopup,
  clickOutside,
  session,
}) => {
  const user = useSelector((state) => state.userReducer.user);
  const cards = useSelector((state) => state.cardsReducer.cards);

  return (
    <Fragment>
      <Profile userData={user} showPopupHandler={showPopupHandler} />;
      <PlacesList cards={cards} />
      {showPopup && (
        <Popup
          clickOutside={clickOutside}
          showPopupHandler={showPopupHandler}
        />
      )}
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  const reduxStore = await initializeStore();
  const state = reduxStore.getState();
  console.log(state.userReducer.user);
  const { dispatch } = reduxStore;
  const cards = await getAllCards();

  const userCards = cards.data.filter((card) => {
    return card.owner === session.user.userId;
  });

  console.log(session.user, 'USER');

  dispatch({ type: SET_CARDS, cards: userCards });
  if (state.userReducer.user === 'noUser') {
    dispatch({
      type: SET_USER,
      user: session.user,
    });
  }

  return { props: { initialReduxState: reduxStore.getState() } };
};

export default ProfilePage;

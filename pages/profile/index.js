import { getSession } from 'next-auth/client';
import { Fragment, useEffect, useState } from 'react';
import Profile from '../../components/user/profile';
import Popup from '../../components/popup/popup';
import { initializeStore } from '../../redux/store';
import { SET_USER, SET_USER_CARDS } from '../../redux/actions/types';
import { useDispatch, useSelector } from 'react-redux';
import PlacesList from '../../components/places/places-list';

const ProfilePage = ({
  showPopupHandler,
  showPopup,
  clickOutside,
  session,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = useSelector((state) => state.userReducer.user.userId);
  const userCards = useSelector((state) => state.userReducer.cards);
  // console.log(userCards);
  useEffect(() => {
    fetch('/api/cards/')
      .then((res) => res.json())
      .then((data) => {
        const userCards = data.data.filter((card) => {
          return card.owner === userId;
        });
        dispatch({ type: SET_USER_CARDS, cards: userCards });
      });
  }, []);
  return (
    <Fragment>
      <Profile userData={user} showPopupHandler={showPopupHandler} />;
      <PlacesList cards={userCards} />
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
  const reduxStore = await initializeStore();
  const { dispatch } = reduxStore;
  const res = await fetch('http://localhost:3000/api/cards/');
  const data = await res.json();

  const userCards = data.data.filter((card) => {
    return card.owner === session.user.userId;
  });
  dispatch({ type: SET_USER_CARDS, cards: userCards });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  dispatch({
    type: SET_USER,
    user: session.user,
  });

  return { props: { initialReduxState: reduxStore.getState() } };
};

export default ProfilePage;

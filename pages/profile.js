import { getSession } from 'next-auth/client';

import { Fragment } from 'react';
import Profile from '../components/user/profile';
import Popup from '../components/popup/popup';
import { initializeStore } from '../redux/store';
import { SET_USER } from '../redux/actions/types';
import { useSelector } from 'react-redux';

const ProfilePage = ({
  showPopupHandler,
  showPopup,
  clickOutside,
  session,
}) => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <Fragment>
      <Profile userData={user} showPopupHandler={showPopupHandler} />;
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

import { getSession } from 'next-auth/client';
import { Fragment } from 'react';
import Profile from '../components/user/profile';
import Popup from '../components/popup/popup';

const ProfilePage = ({ showPopupHandler, showPopup, clickOutside }) => {
  return (
    <Fragment>
      <Profile showPopupHandler={showPopupHandler} />;
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
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default ProfilePage;

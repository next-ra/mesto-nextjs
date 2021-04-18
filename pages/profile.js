import { getSession } from 'next-auth/client';
import Profile from '../components/user/profile';
import Popup from '../components/popup/popup';
import { Fragment } from 'react';
const ProfilePage = ({ showPopupHandler, showPopup }) => {
  return (
    <Fragment>
      <Profile showPopupHandler={showPopupHandler} showPopup={showPopup} />;
      {showPopup && <Popup />}
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

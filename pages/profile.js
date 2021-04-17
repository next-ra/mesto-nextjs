import { getSession } from 'next-auth/client';
import Profile from '../components/user/profile';
const ProfilePage = () => {
  return <Profile />;
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

import { getSession } from 'next-auth/client';

const Profile = () => {
  return (
    <div
      style={{
        color: 'white',
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '40px',
      }}
    >
      Страница профиля пользователя
    </div>
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

export default Profile;

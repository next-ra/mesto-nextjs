import Head from 'next/head';
import Profile from '../components/user/profile';
const HomePage = () => {
  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      <Profile />
    </div>
  );
};

export default HomePage;

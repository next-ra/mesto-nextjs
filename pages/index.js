import Head from 'next/head';
import PlacesList from '../components/places/places-list';
import Profile from '../components/user/profile';
const HomePage = () => {
  const DUMMY_CARDS = [
    {
      id: 1,
      name: 'test',
      image:
        '"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"',
    },
    {
      id: 2,
      name: 'test',
      image:
        '"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"',
    },
    {
      id: 3,
      name: 'test',
      image:
        '"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"',
    },
    {
      id: 4,
      name: 'test',
      image:
        '"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"',
    },
  ];

  return (
    <div>
      <Head>
        <title>NextJS Mesto</title>
        <link rel="icon" href="/favicon-mesto.ico" />
      </Head>
      <Profile />
      <PlacesList cards={DUMMY_CARDS} />
    </div>
  );
};

export default HomePage;

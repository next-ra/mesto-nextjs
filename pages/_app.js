import { useState } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [showPopup, setShowPopup] = useState(false);
  const showPopupHandler = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <Layout>
      <Component
        showPopupHandler={showPopupHandler}
        showPopup={showPopup}
        {...pageProps}
      />
    </Layout>
  );
}

export default MyApp;

import Layout from '../components/layout/layout';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import usePopupVisible from '../hooks/use-popup-visble';

function MyApp({ Component, pageProps }) {
  const { ref, showPopup, toggleHandler } = usePopupVisible(false);

  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component
          clickOutside={ref}
          showPopupHandler={toggleHandler}
          showPopup={showPopup}
          {...pageProps}
        />
      </Layout>
    </Provider>
  );
}

export default MyApp;

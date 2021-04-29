import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import Layout from '../components/layout/layout';
import usePopupVisible from '../hooks/use-popup-visble';
import { useStore } from '../redux/store';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const { ref, showPopup, toggleHandler } = usePopupVisible(false);

  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}

export default MyApp;

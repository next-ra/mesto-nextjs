import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MainHeader from './main-header';
import Notification from './notification';

const Layout = (props) => {
  const notification = useSelector((state) => state.uiReducer.notification);
  return (
    <Fragment>
      <MainHeader />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;

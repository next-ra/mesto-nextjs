import { useDispatch } from 'react-redux';
import { HIDE_NOTIFICATION } from '../../redux/actions/types';
import styles from './notification.module.css';

const Notification = (props) => {
  const dispatch = useDispatch();
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = styles.error;
  }
  if (props.status === 'success') {
    specialClasses = styles.success;
  }
  if (props.status === 'tooltip') {
    specialClasses = styles.tooltip;
  }
  const cssClasses = `${styles.notification} ${specialClasses}`;

  const hideNotificationHandler = () => {
    dispatch({
      type: HIDE_NOTIFICATION,
    });
  };

  return (
    <section onClick={hideNotificationHandler} className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <div className={styles.close} />
    </section>
  );
};

export default Notification;

import { useDispatch, useSelector } from 'react-redux';
import { SHOW_EDIT_POPUP, SHOW_PLACE_POPUP } from '../../redux/actions/types';
import styles from './user-info.module.css';

const UserInfo = ({ showPopupHandler, userData }) => {
  const dispatch = useDispatch();

  const showPlacePopup = () => {
    dispatch({
      type: SHOW_PLACE_POPUP,
    });
    showPopupHandler();
  };

  const showEditPopup = () => {
    dispatch({
      type: SHOW_EDIT_POPUP,
    });
    showPopupHandler();
  };

  return (
    <div className={styles.info}>
      <div
        className={styles.photo}
        style={{
          backgroundImage: `url(${userData.image})`,
        }}
      />
      <div className={styles.data}>
        <h1 className={styles.name}>{userData.name}</h1>
        <p className={styles.job}>{userData.about}</p>
        <button onClick={showEditPopup} className={styles.button_edit}>
          Edit
        </button>
      </div>
      <button onClick={showPlacePopup} className={styles.button_place}>
        +
      </button>
    </div>
  );
};

export default UserInfo;

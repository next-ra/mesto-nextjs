import styles from './user-info.module.css';
import useComponentVisible from '../../hooks/use-popup-visble';
const UserInfo = ({ showPopupHandler }) => {
  const DUMMY_DATA = {
    photo:
      'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSDDd3RRQogCePRa-ZQsBm51ym_22boFxeRv0FGsi-SPYsehRDDojgB4gYFqSns',
    name: 'Zacharias Manuel de la Rocha',
    job: 'American musician and activist',
  };

  return (
    <div className={styles.info}>
      <div
        className={styles.photo}
        style={{
          backgroundImage: `url(${DUMMY_DATA.photo})`,
        }}
      />
      <div className={styles.data}>
        <h1 className={styles.name}>{DUMMY_DATA.name}</h1>
        <p className={styles.job}>{DUMMY_DATA.job}</p>
        <button className={styles.button_edit}>Edit</button>
      </div>
      <button onClick={showPopupHandler} className={styles.button_place}>
        +
      </button>
    </div>
  );
};

export default UserInfo;

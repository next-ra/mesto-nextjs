import styles from './user-info.module.css';

const UserInfo = ({ showPopupHandler, userData }) => {
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
        <button className={styles.button_edit}>Edit</button>
      </div>
      <button onClick={showPopupHandler} className={styles.button_place}>
        +
      </button>
    </div>
  );
};

export default UserInfo;

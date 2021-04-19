import UserInfo from './user-info';

import styles from './profile.module.css';

const Profile = ({ showPopupHandler, userData }) => {
  return (
    <div className={styles.profile}>
      <UserInfo userData={userData} showPopupHandler={showPopupHandler} />
    </div>
  );
};

export default Profile;

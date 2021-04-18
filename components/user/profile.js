import UserInfo from './user-info';

import styles from './profile.module.css';

const Profile = ({ showPopupHandler }) => {
  return (
    <div className={styles.profile}>
      <UserInfo showPopupHandler={showPopupHandler} />
    </div>
  );
};

export default Profile;

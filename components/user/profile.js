import UserInfo from './user-info';

import styles from './profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <UserInfo />
    </div>
  );
};

export default Profile;

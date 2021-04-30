import UserInfo from './user-info';

import styles from './profile.module.css';
import PlacesList from '../places/places-list';
import { getUserCards } from '../../controllers/cards';
import { useSelector } from 'react-redux';

const Profile = ({ showPopupHandler, userData }) => {
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);
  // const cards = getUserCards();
  // console.log(cards);
  return (
    <div className={styles.profile}>
      <UserInfo userData={userData} showPopupHandler={showPopupHandler} />
      {/* <PlacesList cards={cards} /> */}
    </div>
  );
};

export default Profile;

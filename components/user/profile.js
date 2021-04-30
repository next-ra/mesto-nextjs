import UserInfo from './user-info';

import styles from './profile.module.css';
import PlacesList from '../places/places-list';
import { getAllCards, getUserCards } from '../../controllers/cards';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Profile = ({ showPopupHandler, userData }) => {
  return (
    <div className={styles.profile}>
      <UserInfo userData={userData} showPopupHandler={showPopupHandler} />
    </div>
  );
};

export default Profile;

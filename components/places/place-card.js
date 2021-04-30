import { useEffect, useRef } from 'react';
import styles from './place-card.module.css';

import { deleteCard } from '../../controllers/cards';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CARD } from '../../redux/actions/types';

const PlaceCard = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user.userId);

  const cardIdRef = useRef();

  const { image, name, id, likes, owner } = props;
  console.log('owner: ', owner, 'user: ', userId);
  const isOwner = (owner, userId) => {
    if (owner === userId) return true;
    else return false;
  };

  const deleteHandler = async () => {
    await deleteCard(cardId);
    const cardId = await cardIdRef.current.id;
    dispatch({
      type: DELETE_CARD,
      cardId,
    });
  };
  return (
    <div className={styles['place-card']} id={id} ref={cardIdRef}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {isOwner(owner, userId) && (
          <button onClick={deleteHandler} className={styles['delete-icon']} />
        )}
      </div>
      <div className={styles.description}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles['like-box']}>
          <button className={styles['like-icon']} />
          <p className={styles['like-counter']}>{likes.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;

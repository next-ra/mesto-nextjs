import { useRef } from 'react';
import styles from './place-card.module.css';

import { deleteCard } from '../../controllers/cards';
import { useDispatch } from 'react-redux';
import { DELETE_CARD } from '../../redux/actions/types';

const PlaceCard = (props) => {
  const dispatch = useDispatch();
  const { image, name, id, likes } = props;

  const cardIdRef = useRef();
  const deleteHandler = async () => {
    const cardId = await cardIdRef.current.id;
    await deleteCard(cardId);
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
        <button onClick={deleteHandler} className={styles['delete-icon']} />
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

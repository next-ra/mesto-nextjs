import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from '../../controllers/cards';
import { DELETE_CARD, DELETE_USER_CARD } from '../../redux/actions/types';
import ImagePopup from '../image-popup/image-popup';
import styles from './place-card.module.css';

const PlaceCard = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user.userId);

  const [showImage, setShowImage] = useState(false);
  const cardIdRef = useRef();

  const { image, name, id, likes, owner } = props;

  const isOwner = (owner, userId) => {
    if (owner === userId) return true;
    else return false;
  };

  const deleteHandler = async () => {
    const cardId = await cardIdRef.current.id;
    await deleteCard(cardId);
    dispatch({
      type: DELETE_CARD,
      cardId,
    });
    dispatch({
      type: DELETE_USER_CARD,
      cardId,
    });
  };

  const showImageHandler = () => {
    setShowImage((state) => !state);
  };
  return (
    <>
      <div className={styles['place-card']} id={id} ref={cardIdRef}>
        <div
          onClick={showImageHandler}
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
      {showImage && (
        <ImagePopup
          src={image}
          alt={name}
          showImageHandler={showImageHandler}
        />
      )}
    </>
  );
};

export default PlaceCard;

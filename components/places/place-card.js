import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, likeCard, removeLike } from '../../controllers/cards';
import { useSession } from 'next-auth/client';
import {
  ADD_LIKE,
  DELETE_CARD,
  DELETE_USER_CARD,
  REMOVE_LIKE,
  SHOW_NOTIFICATION,
} from '../../redux/actions/types';

import ImagePopup from '../image-popup/image-popup';
import styles from './place-card.module.css';
import DeletePopup from '../confirm-popup/delete-popup';

const PlaceCard = (props) => {
  const [session] = useSession();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user.userId);
  const [showImage, setShowImage] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const cardIdRef = useRef();
  const likeRef = useRef();

  const trashRef = useRef();
  const { image, name, id, likes, owner } = props;

  const isOwner = (owner, userId) => {
    if (owner === userId) return true;
    else return false;
  };

  const likeStyle = [styles['like-icon']];

  if (likes.includes(userId)) {
    likeStyle.push(styles['like-icon_liked']);
  }

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

  const showImageHandler = (e) => {
    if (
      trashRef.current === undefined || //не на всех карточках есть корзина, если ее нет можно открывать попап
      e.target.className !== trashRef.current.className // а если мы кликнули по корзине то не надо показывать попап
    )
      setShowImage((state) => !state);
  };

  const likesHandler = async () => {
    if (!session) {
      dispatch({
        type: SHOW_NOTIFICATION,
        status: 'tooltip',
        title: 'Вы не авторизованы...',
        message: 'Войдите или зарегистрируйтесь!',
      });
      return;
    }

    const isLiked = await likeRef.current.className.includes('liked');
    const cardId = await cardIdRef.current.id;
    console.log(cardId);
    if (isLiked) {
      removeLike(cardId, userId);
      dispatch({
        type: REMOVE_LIKE,
        cardId,
        userId,
      });
    } else {
      likeCard(cardId, userId);
      dispatch({
        type: ADD_LIKE,
        cardId,
        userId,
      });
    }
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
            <button
              onClick={() => {
                setShowDeletePopup(true);
              }}
              className={styles['delete-icon']}
              ref={trashRef}
            />
          )}
        </div>
        <div className={styles.description}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles['like-box']}>
            <button
              className={likeStyle.join(' ')}
              onClick={likesHandler}
              ref={likeRef}
            />
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
      {showDeletePopup && (
        <DeletePopup
          onDelete={deleteHandler}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}
    </>
  );
};

export default PlaceCard;

import styles from './delete-popup.module.css';

const DeletePopup = ({ onDelete, setShowDeletePopup }) => {
  const deleteCardHandler = () => {
    onDelete();
  };
  const closePopupHandler = () => {
    setShowDeletePopup(false);
  };
  return (
    <div className={styles.popup}>
      <div className={styles['popup-delete']}>
        <p>Вы действительно хотите удалить эту карточку?</p>
        <div className={styles.box}>
          <button onClick={deleteCardHandler} className={styles.btn}>
            да
          </button>
          <button onClick={closePopupHandler} className={styles.btn}>
            нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;

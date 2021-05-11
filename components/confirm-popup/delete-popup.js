import styles from './delete-popup.module.css';

const DeletePopup = () => {
  const deleteCardHandler = () => {
    console.log('yes');
  };

  return (
    <div className={styles.popup}>
      <div className={styles['popup-delete']}>
        <p>Вы действительно хотите удалить эту карточку?</p>
        <div className={styles.box}>
          <button onClick={deleteCardHandler} className={styles.btn}>
            да
          </button>
          <button className={styles.btn}>нет</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;

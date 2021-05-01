import { useDispatch } from 'react-redux';
import styles from './image-popup.module.css';

const ImagePopup = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.popup}>
      <div className={styles.box}>
        <img
          src="/close.svg"
          alt="close button"
          className={styles.close}
          onClick={props.showImageHandler}
        />
        <img src={props.src} alt={props.alt} className={styles.image} />
      </div>
    </div>
  );
};

export default ImagePopup;

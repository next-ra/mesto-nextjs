import styles from './popup.module.css';

const Popup = () => {
  return (
    <div className={styles.popup} id="popup-place">
      <div className={styles.content}>
        <img src="/close.svg" alt="" className={styles.close} />
        <h3 className={styles.title}>Новое место</h3>
        <form className={styles.form} name="new" noValidate>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <p className={styles.error} id="name"></p>
          <input
            type="url"
            name="link"
            className={styles.input}
            placeholder="Ссылка на картинку"
            required
          />
          <p className={styles.error} id="link"></p>
          <button
            type="submit"
            className={`${styles.button} ${styles[`button-edit`]}`}
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;

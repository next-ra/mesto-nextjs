import styles from './popup.module.css';
import { createCard } from '../../controllers/cards';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/client';
import TextField from './popup-inputs';
const Popup = ({ clickOutside, showPopupHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (ev) => {
    const session = await getSession();
    console.log('submitted', session);
    showPopupHandler();
    createCard();
  };

  return (
    <div className={styles.popup} id="popup-place">
      <div className={styles.content} ref={clickOutside}>
        <img
          src="/close.svg"
          alt=""
          className={styles.close}
          onClick={showPopupHandler}
        />
        <h3 className={styles.title}>Новое место</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={styles.form}
          name="new"
          noValidate
        >
          <TextField
            type="text"
            name="name"
            label="name"
            placeholder="Название"
            register={register}
            errors={errors}
            rules={{ maxLength: 20, required: true, minLength: 3 }}
          />
          <TextField
            type="url"
            name="link"
            label="link"
            placeholder="Ссылка на картинку"
            register={register}
            errors={errors}
            rules={{
              required: false,
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            }}
          />

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

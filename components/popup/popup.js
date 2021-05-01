import { getSession } from 'next-auth/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCard } from '../../controllers/cards';
import { ADD_USER_CARD, SET_CARD } from '../../redux/actions/types';
import TextField from './popup-inputs';
import styles from './popup.module.css';

const Popup = ({ clickOutside, showPopupHandler }) => {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const session = await getSession();
    const owner = session.user.userId;
    const { name, link } = data;

    const result = await createCard(name, link, owner);
    console.log(result);
    showPopupHandler();
    dispatch({
      type: SET_CARD,
      card: result.data,
    });
    dispatch({
      type: ADD_USER_CARD,
      card: result.data,
    });
  };

  return (
    <div className={styles.popup} id="popup-place">
      <div className={styles.content} ref={clickOutside}>
        <img
          src="/close.svg"
          alt="close button"
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
            rules={{ maxLength: 30, required: true, minLength: 3 }}
          />
          <TextField
            type="url"
            name="link"
            label="link"
            placeholder="Ссылка на картинку"
            register={register}
            errors={errors}
            rules={{
              required: true,
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

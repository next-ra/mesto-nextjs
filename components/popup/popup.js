import { getSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../../controllers/cards';
import { updateUserInfo } from '../../controllers/users';
import {
  ADD_USER_CARD,
  SET_CARD,
  SET_USER,
  UPDATE_USER,
} from '../../redux/actions/types';
import TextField from './popup-inputs';
import styles from './popup.module.css';

let renderCount = 0;

const Popup = ({ clickOutside, showPopupHandler }) => {
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  const popupState = useSelector((state) => state.userReducer.popupToShow);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange' });

  const submitHandler = async (data) => {
    const session = await getSession();
    const owner = session.user.userId;
    if (popupState === 'addNewPlace') {
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
    } else {
      const { name, about } = data;
      const result = await updateUserInfo(name, about, owner);
      console.log(result, 'user');
      const newsession = await getSession(result.user);
      console.log(newsession, 'new-session');
      dispatch({
        type: UPDATE_USER,
        user: result.user,
      });
      console.log(result);
      showPopupHandler();
    }
  };
  renderCount++;
  console.log(renderCount);
  return (
    <div className={styles.popup}>
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
          {popupState === 'editInfo' && (
            <>
              <TextField
                type="text"
                name="name"
                label="name"
                placeholder="Введите новое имя"
                register={register}
                errors={errors}
                rules={{ maxLength: 20, required: true, minLength: 3 }}
              />
              <TextField
                type="text"
                name="about"
                label="about"
                placeholder="Расскажите о себе"
                register={register}
                errors={errors}
                rules={{ maxLength: 40, required: true, minLength: 3 }}
              />
            </>
          )}
          {popupState === 'addNewPlace' && (
            <>
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
            </>
          )}

          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className={`${styles.button} ${styles[`button-edit`]}`}
          >
            {popupState === 'addNewPlace' ? '+' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;

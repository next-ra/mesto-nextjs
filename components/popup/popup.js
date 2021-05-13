import { getSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../../controllers/cards';
import { updateUserInfo } from '../../controllers/users';
import {
  ADD_USER_CARD,
  SET_CARD,
  SET_USER,
  SHOW_NOTIFICATION,
} from '../../redux/actions/types';
import TextField from './popup-inputs';
import styles from './popup.module.css';

const Popup = ({ clickOutside, showPopupHandler }) => {
  const popupTitle = useSelector((state) => state.userReducer.popupTitle);

  const dispatch = useDispatch();

  const popupState = useSelector((state) => state.userReducer.popupToShow);
  const userId = useSelector((state) => state.userReducer.user.userId);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange' });

  const submitHandler = async (data) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      status: 'pending',
      title: 'Отправка...',
      message: 'Отправляем данные на сервер.',
    });
    if (popupState === 'addNewPlace') {
      const { name, link } = data;
      const result = await createCard(name, link, userId);
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
      dispatch({
        type: SHOW_NOTIFICATION,
        status: 'success',
        title: 'Успех!',
        message: result.message,
      });
    } else {
      const userData = { ...data, userId };
      const result = await updateUserInfo(userData);
      const session = await getSession();
      dispatch({
        type: SET_USER,
        user: session.user,
      });
      dispatch({
        type: SHOW_NOTIFICATION,
        status: 'success',
        title: 'Успех!',
        message: result.message,
      });

      showPopupHandler();
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.content} ref={clickOutside}>
        <img
          src="/close.svg"
          alt="close button"
          className={styles.close}
          onClick={showPopupHandler}
        />
        <h3 className={styles.title}>{popupTitle}</h3>
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
                  pattern:
                    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                }}
              />
            </>
          )}
          {popupState === 'updateAvatar' && (
            <TextField
              type="url"
              name="avatar"
              label="avatar"
              placeholder="Ссылка на Аватар"
              register={register}
              errors={errors}
              rules={{
                required: true,
                pattern:
                  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              }}
            />
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

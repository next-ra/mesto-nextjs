import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser } from '../../controllers/users';
import { SET_USER, SHOW_NOTIFICATION } from '../../redux/actions/types';
import styles from './auth-form.module.css';
import TextField from './text-field';

function AuthForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const switchAuthModeHandler = () => {
    reset();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (data) => {
    const { name, email, password } = data;
    dispatch({
      type: SHOW_NOTIFICATION,
      status: 'pending',
      title: 'Pending',
      message: 'Отправляем данные на сервер',
    });

    if (isLogin) {
      // логинимся
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password,
        });
        if (!result.error) {
          const session = await getSession();
          dispatch({
            type: SET_USER,
            user: session.user,
          });
          await router.replace('/profile');
          dispatch({
            type: SHOW_NOTIFICATION,
            status: 'success',
            title: 'Поздравляем',
            message: 'Вы успешно авторизованы!',
          });
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        dispatch({
          type: SHOW_NOTIFICATION,
          status: 'error',
          title: 'Error!',
          message: err.message || `Something went wrong`,
        });
      }
    } else {
      //  создание пользователя
      try {
        const result = await createUser(name, email, password);

        dispatch({
          type: SHOW_NOTIFICATION,
          status: 'success',
          title: 'Поздравляем',
          message: result.message,
        });
        switchAuthModeHandler();
        reset();
      } catch (err) {
        dispatch({
          type: SHOW_NOTIFICATION,
          status: 'error',
          title: 'Error!',
          message: err.message || `Something went wrong`,
        });
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        {isLogin ? null : (
          <TextField
            type="text"
            label="name"
            name="name"
            placeholder="Имя"
            register={register}
            errors={errors}
            rules={{ maxLength: 30, required: true, minLength: 3 }}
          />
        )}

        <TextField
          type="email"
          label="email"
          name="email"
          placeholder="Почта"
          register={register}
          errors={errors}
          rules={{
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }}
        />

        <TextField
          type="password"
          label="password"
          name="password"
          placeholder="Пароль"
          register={register}
          errors={errors}
          rules={{
            required: true,
            minLength: 7,
          }}
        />
        <div className={styles.actions}>
          <button>{isLogin ? 'Войти' : 'Создать аккаунт'}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getSession, signIn } from 'next-auth/client';
import { createUser } from '../../controllers/users';
import TextField from './text-field';

import styles from './auth-form.module.css';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../redux/actions/types';

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

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      console.log(result);
      if (!result.error) {
        console.log(result);
        const session = await getSession();
        dispatch({
          type: SET_USER,
          user: session.user,
        });
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(name, email, password);
        console.log(result);
        switchAuthModeHandler();
        reset();
      } catch (err) {
        console.log(err.message);
        // throw new Error(err.message || 'something went wrong');
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
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

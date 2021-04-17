import { useState } from 'react';
import { createUser } from '../../controllers/users';
import { useForm } from 'react-hook-form';

import styles from './auth-form.module.css';
import TextField from './text-field';

function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (data) => {
    const { name, email, password } = JSON.parse(JSON.stringify(data));

    if (isLogin) {
      //log user in
    } else {
      try {
        const result = await createUser(name, email, password);
        console.log(result);
      } catch (err) {
        console.log(err);
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
            label="Имя"
            name="name"
            placeholder="Имя"
            register={register}
            errors={errors}
            rules={{ maxLength: 20, required: true, minLength: 3 }}
          />
        )}

        <TextField
          type="email"
          label="Почта"
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
          label="Пароль"
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

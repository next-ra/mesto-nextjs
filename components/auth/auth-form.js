import { useState, useRef } from 'react';
import { createUser } from '../../controllers/users';

import styles from './auth-form.module.css';

function AuthForm() {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    // TODO: add validation here
    if (isLogin) {
      //log user in
    } else {
      try {
        const result = await createUser(
          enteredName,
          enteredEmail,
          enteredPassword,
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={submitHandler}>
        {isLogin ? null : (
          <div className={styles.control}>
            <label htmlFor="name">Имя</label>
            <input type="text" id="name" required ref={inputNameRef} />
          </div>
        )}
        <div className={styles.control}>
          <label htmlFor="email">Почта</label>
          <input type="email" id="email" required ref={inputEmailRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPasswordRef}
          />
        </div>
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

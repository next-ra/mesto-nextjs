import styles from './auth-form.module.css';

function AuthForm() {
  return (
    <section className={styles.auth}>
      <h1>Войти</h1>
      <form>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div className={styles.actions}>
          <button>Регистрация</button>
          <button type="button" className={styles.toggle}>
            Войти
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

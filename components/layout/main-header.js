import Link from 'next/link';
import styles from './main-header.module.css';
const MainHeader = (props) => {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="mesto logo" className={styles.logo} />
          </a>
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/auth">Войти</Link>
          </li>

          <li>
            <Link href="/profile">Профиль</Link>
          </li>

          <li>
            <button>Выйти</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

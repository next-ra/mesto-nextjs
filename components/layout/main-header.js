import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import styles from './main-header.module.css';
const MainHeader = (props) => {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

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
          {!session && !loading && (
            <li>
              <Link href="/auth">Войти</Link>
            </li>
          )}

          {session && (
            <li>
              <Link href="/profile">Профиль</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Выйти</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

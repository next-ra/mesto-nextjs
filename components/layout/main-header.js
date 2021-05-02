import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './main-header.module.css';

const MainHeader = () => {
  const [session, loading] = useSession();

  const router = useRouter();
  const isProfile = router.pathname === '/profile';

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
              <Link href={isProfile ? '/' : '/profile'}>
                {isProfile ? 'На главную' : 'Мой профиль'}
              </Link>
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
